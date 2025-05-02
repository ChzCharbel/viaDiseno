CREATE OR REPLACE FUNCTION public.consulta_info_admin(IN matricula_usr text)
 RETURNS TABLE (id_carrera integer,id_ivd TEXT, 
 nombre_usuario TEXT, 
 password TEXT, 
 correo_institucional TEXT, 
 rol TEXT, 
 estatus_administrador TEXT,
 carrera TEXT)
 LANGUAGE plpgsql
AS $function$
BEGIN
	RETURN QUERY
	SELECT * FROM usuarios u JOIN administradores using (id_ivd) 
	JOIN carreras using (id_carrera)
	WHERE u.id_ivd = matricula_usr;
		
END;
$function$;

DROP FUNCTION public.consulta_info_alumnos(text);
CREATE OR REPLACE FUNCTION public.consulta_info_alumnos(IN matricula_usr text)
 RETURNS TABLE (id_carrera integer,
 id_ivd TEXT, 
 nombre_usuario TEXT, 
 password TEXT, 
 correo_institucional TEXT, 
 rol TEXT,
 semestre TEXT, 
 regular boolean, 
 estatus_alumno TEXT,
 inscrito boolean, 
 carrera TEXT)
 LANGUAGE plpgsql
AS $function$
BEGIN
	RETURN QUERY
	SELECT * FROM usuarios u 
	JOIN alumnos using (id_ivd)
	JOIN carreras using (id_carrera)
	WHERE u.id_ivd = matricula_usr;
END;
$function$;

CREATE OR REPLACE PROCEDURE sincronizar_alumnos(
    id_usr TEXT,
    nombre_usr TEXT,
    correo_usr TEXT,
    carrera_usr TEXT,
    regular_usr BOOLEAN,
    semestre_usr TEXT, 
    estatus_usr TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    carrera_id INT;
BEGIN
    -- Buscar id de la carrera
    SELECT id_carrera INTO carrera_id
    FROM carreras
    WHERE carrera = carrera_usr
    LIMIT 1;

    IF carrera_id IS NULL THEN
        RAISE EXCEPTION 'Carrera "%" no encontrada en la tabla carreras.', carrera_usr;
    END IF;

    -- Insertar usuario si no existe
    INSERT INTO usuarios (id_ivd, nombre_usuario, correo_institucional, rol)
    VALUES (id_usr, nombre_usr, correo_usr, 'student')
    ON CONFLICT (id_ivd) DO NOTHING;

    -- Insertar alumno si no existe
    INSERT INTO alumnos (id_ivd, semestre, regular, id_carrera)
    VALUES (id_usr, semestre_usr, regular_usr, carrera_id)
    ON CONFLICT (id_ivd) DO NOTHING;

    UPDATE alumnos
    SET estatus_alumno = estatus_usr,
        semestre = semestre_usr,
        regular = regular_usr,
        id_carrera = carrera_id
    WHERE id_ivd = id_usr;
END;
$$;

CREATE OR REPLACE PROCEDURE registrar_admin(
    id_usr TEXT,
    nombre_usr TEXT,
    pwd_usr TEXT,
    correo_usr TEXT,
    carrera_usr TEXT,
    estatus_usr TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    carrera_id INT;
    pwd_actual TEXT;
BEGIN
    -- Obtener ID de la carrera
    SELECT id_carrera INTO carrera_id
    FROM carreras
    WHERE carrera = carrera_usr
    LIMIT 1;

    IF carrera_id IS NULL THEN
        RAISE EXCEPTION 'Carrera "%" no encontrada en la tabla carreras.', carrera_usr;
    END IF;

    -- Insertar usuario si no existe
    INSERT INTO usuarios (id_ivd, nombre_usuario, password, correo_institucional, rol)
    VALUES (id_usr, nombre_usr, pwd_usr, correo_usr, 'admin')
    ON CONFLICT (id_ivd) DO NOTHING;

    -- Obtener contraseña actual (si existe)
    SELECT password INTO pwd_actual
    FROM usuarios
    WHERE id_ivd = id_usr;

    -- Actualizar contraseña solo si es diferente
    IF pwd_actual IS DISTINCT FROM pwd_usr THEN
        UPDATE usuarios
        SET password = pwd_usr
        WHERE id_ivd = id_usr;
    END IF;

    -- Insertar administrador si no existe
    INSERT INTO administradores (id_ivd, id_carrera)
    VALUES (id_usr, carrera_id)
    ON CONFLICT (id_ivd) DO NOTHING;

    -- Actualizar estatus e id_carrera
    UPDATE administradores
    SET estatus_administrador = estatus_usr,
        id_carrera = carrera_id
    WHERE id_ivd = id_usr;
END;
$$;

UPDATE public.carreras SET id_carrera = 7 WHERE carrera= 'Diseño de la Moda e Industria del Vestido';
UPDATE public.carreras SET id_carrera = 8 WHERE carrera= 'Diseño y Arquitectura de Interiores';

UPDATE public.planes_estudios SET id_plan_estudio = 7 WHERE plan_estudio = 'Diseño de la Moda e Industria del Vestido 1';
UPDATE public.planes_estudios SET id_plan_estudio = 8 WHERE plan_estudio = 'Diseño de la Moda e Industria del Vestido 2';

CREATE OR REPLACE PROCEDURE sincronizar_materias(
    id_usr_materia integer,
    materia_usr text,
    creditos_usr integer,
    horas_usr integer
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO materias (id_materia, materia, creditos, horas_profesor)
    VALUES (id_usr_materia, materia_usr, creditos_usr, horas_usr)
    ON CONFLICT (id_materia) DO NOTHING;
    
    UPDATE materias 
    SET materia = materia_usr,
    creditos = creditos_usr,
    horas_profesor = horas_usr
    WHERE id_materia = id_usr_materia;
END;
$$;

CREATE OR REPLACE FUNCTION obtener_id_materias_impartidas(int, int) RETURNS TABLE(id_profesor_materia int, id_ciclo_escolar_materia int)
AS $$
SELECT pm.id_profesor_materia, pm.id_ciclo_escolar_materia
FROM profesores_materias pm
JOIN ciclos_escolares_materias using (id_ciclo_escolar_materia)
WHERE id_profesor = $1::int AND id_ciclo_escolar = $2::int;$$
LANGUAGE SQL;

CREATE OR REPLACE FUNCTION obtener_info_materias_impartidas(int, int) RETURNS TABLE(id_plan_estudio int, 
creditos int, horas_profesor int, materia text, id_materia int)
AS $$    
SELECT pm.id_plan_estudio, m.creditos, m.horas_profesor, m.materia, m.id_materia 
FROM obtener_id_materias_impartidas($1::int, $2::int)
JOIN ciclos_escolares_materias cem using (id_ciclo_escolar_materia)
JOIN planes_materias pm using (id_plan_materia)
JOIN materias m using (id_materia); $$
LANGUAGE SQL;

CREATE OR REPLACE PROCEDURE sincronizar_carreras(
    id_usr_carrera integer,
    carrera_usr TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
	INSERT INTO carreras(id_carrera, carrera)
    VALUES (id_usr_carrera, carrera_usr)
    ON CONFLICT (id_carrera) DO NOTHING;


    UPDATE carreras 
    SET carrera = carrera_usr
    WHERE id_carrera = id_usr_carrera;
    
END;
$$;

CREATE OR REPLACE PROCEDURE sincronizar_planes(
    id_usr_plan integer,
    plan_usr TEXT,
    carrera_usr TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    carrera_id INT;
BEGIN
	SELECT id_carrera INTO carrera_id
	    FROM carreras
	    WHERE carrera = carrera_usr
	    LIMIT 1;

    IF carrera_id IS NULL THEN
        RAISE EXCEPTION 'Carrera "%" no encontrada en la tabla carreras.', carrera_usr;
    END IF;
    
	INSERT INTO planes_estudios
    VALUES (id_usr_plan, plan_usr, carrera_id)
    ON CONFLICT (id_plan_estudio) DO NOTHING;


    UPDATE planes_estudios 
    SET plan_estudio = plan_usr,
    id_carrera = carrera_id
    WHERE id_plan_estudio = id_usr_plan;
    
END;
$$;

CREATE OR REPLACE PROCEDURE sincronizar_ciclos_escolares(
    id_ciclo_api integer,
    nombre_ciclo TEXT,
    start_date DATE,
    end_date DATE,
)
LANGUAGE plpgsql
AS $$
BEGIN    
	INSERT INTO ciclos_escolares
    VALUES (id_ciclo_api, nombre_ciclo, start_date, end_date)
    ON CONFLICT (id_ciclo_api) DO NOTHING;


    UPDATE ciclos_escolares 
    SET id_ciclo_escolar = id_ciclo_api,
    ciclo_escolar = nombre_ciclo
    fecha_inicio = start_date,
    fecha_fin = end_date,    
    WHERE id_ciclo_escolar = id_ciclo_api;
    
END;
$$;



CREATE OR REPLACE PROCEDURE registrar_alumno(
    id_usr TEXT,
    nombre_usr TEXT,
    correo_usr TEXT,
    pwd_usr TEXT,
    carrera_usr TEXT,
    regular_usr BOOLEAN,
    semestre_usr TEXT,
    estatus_usr TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    carrera_id INT;
    pwd_actual TEXT;
BEGIN
    -- Obtener ID de la carrera
    SELECT id_carrera INTO carrera_id
    FROM carreras
    WHERE carrera = carrera_usr
    LIMIT 1;

    IF carrera_id IS NULL THEN
        RAISE EXCEPTION 'Carrera "%" no encontrada en la tabla carreras.', carrera_usr;
    END IF;

    -- Insertar usuario si no existe
    INSERT INTO usuarios (id_ivd, nombre_usuario, password, correo_institucional, rol)
    VALUES (id_usr, nombre_usr, pwd_usr, correo_usr, 'student')
    ON CONFLICT (id_ivd) DO NOTHING;

    -- Obtener contraseña actual (si existe)
    SELECT password INTO pwd_actual
    FROM usuarios
    WHERE id_ivd = id_usr;

    -- Actualizar contraseña solo si es diferente
    IF pwd_actual IS DISTINCT FROM pwd_usr THEN
        UPDATE usuarios
        SET password = pwd_usr
        WHERE id_ivd = id_usr;
    END IF;

    -- Insertar alumno si no existe
    INSERT INTO alumnos (id_ivd, semestre, regular, id_carrera)
    VALUES (id_usr, semestre_usr, regular_usr, carrera_id)
    ON CONFLICT DO NOTHING;

    -- Actualizar estatus e id_carrera
    UPDATE alumnos
    SET estatus_alumno = estatus_usr,
        id_carrera = carrera_id,
        regular = regular_usr,
        semestre = semestre_usr
    WHERE id_ivd = id_usr;
END;
$$;