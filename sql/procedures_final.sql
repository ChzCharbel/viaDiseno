CREATE OR REPLACE PROCEDURE public.registrar_admin(
	IN id_usr text,
	IN nombre_usr text,
	IN pwd_usr text,
	IN correo_usr text,
	IN carrera_usr text,
	IN estatus_usr text)
LANGUAGE 'plpgsql'
AS $BODY$
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
$BODY$;

CREATE OR REPLACE PROCEDURE public.registrar_alumno(
	IN id_usr text,
	IN nombre_usr text,
	IN correo_usr text,
	IN pwd_usr text,
	IN carrera_usr text,
	IN regular_usr boolean,
	IN semestre_usr text,
	IN estatus_usr text)
LANGUAGE 'plpgsql'
AS $BODY$
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
$BODY$;

CREATE OR REPLACE PROCEDURE public.sincronizar_alumnos(
	IN id_usr text,
	IN nombre_usr text,
	IN correo_usr text,
	IN carrera_usr text,
	IN regular_usr boolean,
	IN semestre_usr text,
	IN estatus_usr text)
LANGUAGE 'plpgsql'
AS $BODY$
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
$BODY$;

CREATE OR REPLACE PROCEDURE public.sincronizar_carreras(
	IN id_usr_carrera integer,
	IN carrera_usr text)
LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
	INSERT INTO carreras(id_carrera, carrera)
    VALUES (id_usr_carrera, carrera_usr)
    ON CONFLICT (id_carrera) DO NOTHING;

    UPDATE carreras 
    SET carrera = carrera_usr
    WHERE id_carrera = id_usr_carrera;
    
END;
$BODY$;

CREATE OR REPLACE PROCEDURE public.sincronizar_ciclos_escolares(
	IN id_ciclo_api integer,
	IN nombre_ciclo text,
	IN start_date date,
	IN end_date date)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
    existe_ciclo INTEGER;
BEGIN
    -- Verificar si el ciclo escolar ya existe
    SELECT COUNT(*) INTO existe_ciclo
    FROM ciclos_escolares
    WHERE id_ciclo_escolar = id_ciclo_api;

    -- Si no existe, insertarlo
    IF existe_ciclo = 0 THEN
        INSERT INTO ciclos_escolares (id_ciclo_escolar, ciclo_escolar, fecha_inicio, fecha_fin)
        VALUES (id_ciclo_api, nombre_ciclo, start_date, end_date);
    -- Si ya existe, actualizarlo
    ELSE
        UPDATE ciclos_escolares 
        SET ciclo_escolar = nombre_ciclo,
            fecha_inicio = start_date,
            fecha_fin = end_date    
        WHERE id_ciclo_escolar = id_ciclo_api;
    END IF;
END;
$BODY$;

CREATE OR REPLACE PROCEDURE public.sincronizar_materias(
	IN id_usr_materia integer,
	IN materia_usr text,
	IN creditos_usr integer,
	IN horas_usr integer)
LANGUAGE 'plpgsql'
AS $BODY$
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
$BODY$;

CREATE OR REPLACE PROCEDURE public.sincronizar_planes(
	IN id_usr_plan integer,
	IN plan_usr text,
	IN carrera_usr text)
LANGUAGE 'plpgsql'
AS $BODY$
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
$BODY$;

CREATE OR REPLACE PROCEDURE public.sincronizar_planes_materias(
	IN id_usr_materia integer,
	IN id_plan_usr integer,
	IN semestre_usr integer,
	IN estatus_usr text)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
    tabla_ultimo_id INT;
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM planes_materias
        WHERE id_materia = id_usr_materia
          AND id_plan_estudio = id_plan_usr
    ) THEN
    
	    SELECT MAX(id_plan_materia) + 1 INTO tabla_ultimo_id
	    FROM planes_materias
	    LIMIT 1;
	    
	    INSERT INTO planes_materias (id_plan_materia, id_plan_estudio, id_materia, semestre, estatus_plan_materia)
	    VALUES (tabla_ultimo_id, id_plan_usr, id_usr_materia, semestre_usr, estatus_usr);
    
    ELSE
    
	    UPDATE planes_materias 
	    SET semestre = semestre_usr,
	    estatus_plan_materia = estatus_usr
	    WHERE id_materia = id_usr_materia AND id_plan_estudio = id_plan_usr;
    END IF;
END;
$BODY$;