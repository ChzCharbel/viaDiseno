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