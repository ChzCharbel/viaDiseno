CREATE OR REPLACE FUNCTION public.asignar_horario_a_grupo(
	id_grupo_param integer,
	id_salon_param integer,
	dia_param character varying,
	hora_inicio_param time without time zone,
	hora_fin_param time without time zone)
    RETURNS text
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    traslapes INT;
    traslapes_profe INT;
    traslapes_salon INT;
    id_ciclo_escolar_var INT; -- Renombrado para evitar ambigüedad
    id_profesor_grupo INT;
BEGIN
    -- Validar empalmes de horario del grupo
    SELECT COUNT(*) INTO traslapes
    FROM grupos_horarios
    WHERE id_grupo = id_grupo_param
      AND dia_semana = dia_param
      AND hora_inicio < hora_fin_param
      AND hora_fin > hora_inicio_param;

    IF traslapes > 0 THEN
        RETURN 'Error: El grupo ya tiene un horario que se traslapa con este.';
    END IF;

    -- Obtener id_profesor del grupo
    SELECT id_profesor INTO id_profesor_grupo
    FROM grupos
    WHERE id_grupo = id_grupo_param;

    IF id_profesor_grupo IS NULL THEN
        RETURN 'Error: El grupo no tiene profesor asignado.';
    END IF;

    -- Validar si el profesor ya tiene clase en ese horario
    SELECT COUNT(*) INTO traslapes_profe
    FROM grupos g
    JOIN grupos_horarios gh ON g.id_grupo = gh.id_grupo
    WHERE g.id_profesor = id_profesor_grupo
      AND gh.dia_semana = dia_param
      AND gh.hora_inicio < hora_fin_param
      AND gh.hora_fin > hora_inicio_param;

    IF traslapes_profe > 0 THEN
        RETURN 'Error: El profesor ya tiene una clase que se traslapa con este horario.';
    END IF;

    -- Obtener id_ciclo_escolar relacionado con el grupo
    SELECT cem.id_ciclo_escolar INTO id_ciclo_escolar_var
    FROM grupos g
    JOIN grupos_ciclos_materias gcm ON g.id_grupo = gcm.id_grupo
    JOIN ciclos_escolares_materias cem ON gcm.id_ciclo_escolar_materia = cem.id_ciclo_escolar_materia
    WHERE g.id_grupo = id_grupo_param
    LIMIT 1;

    IF id_ciclo_escolar_var IS NULL THEN
        RETURN 'Error: No se pudo determinar el ciclo escolar del grupo.';
    END IF;

    -- Validar si el salón ya está ocupado
    -- Aquí corregimos la ambigüedad usando el nombre de la variable local
    SELECT COUNT(*) INTO traslapes_salon
    FROM salones_disponibilidad
    WHERE id_salon = id_salon_param
      AND id_ciclo_escolar = id_ciclo_escolar_var
      AND dia_semana = dia_param
      AND hora_inicio < hora_fin_param
      AND hora_fin > hora_inicio_param
      AND disponible = FALSE;

    IF traslapes_salon > 0 THEN
        RETURN 'Error: El salón ya está ocupado en este horario.';
    END IF;

    -- Insertar horario
    INSERT INTO grupos_horarios (id_grupo, dia_semana, hora_inicio, hora_fin)
    VALUES (id_grupo_param, dia_param, hora_inicio_param, hora_fin_param);

    -- Registrar disponibilidad del salón si no existe
    INSERT INTO salones_disponibilidad(id_salon, id_ciclo_escolar, dia_semana, hora_inicio, hora_fin, disponible)
    VALUES (id_salon_param, id_ciclo_escolar_var, dia_param, hora_inicio_param, hora_fin_param, TRUE)
    ON CONFLICT DO NOTHING;

    -- Marcar salón como ocupado
    UPDATE salones_disponibilidad
    SET disponible = FALSE
    WHERE id_salon = id_salon_param
      AND id_ciclo_escolar = id_ciclo_escolar_var
      AND dia_semana = dia_param
      AND hora_inicio <= hora_inicio_param
      AND hora_fin >= hora_fin_param;

    -- Registrar disponibilidad del profesor si no existe
    INSERT INTO profesores_disponibilidad(id_profesor, id_ciclo_escolar, dia_semana, hora_inicio, hora_fin, disponible)
    VALUES (id_profesor_grupo, id_ciclo_escolar_var, dia_param, hora_inicio_param, hora_fin_param, TRUE)
    ON CONFLICT DO NOTHING;

    -- Marcar el profesor como no disponible
    UPDATE profesores_disponibilidad
    SET disponible = FALSE
    WHERE id_profesor = id_profesor_grupo
      AND id_ciclo_escolar = id_ciclo_escolar_var
      AND dia_semana = dia_param
      AND hora_inicio <= hora_inicio_param
      AND hora_fin >= hora_fin_param;

    RETURN 'Horario asignado exitosamente.';
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.consulta_info_admin(
	matricula_usr text)
    RETURNS TABLE(id_carrera integer, id_ivd text, nombre_usuario text, password text, correo_institucional text, rol text, estatus_administrador text, carrera text) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
	RETURN QUERY
	SELECT * FROM usuarios u JOIN administradores using (id_ivd) 
	JOIN carreras using (id_carrera)
	WHERE u.id_ivd = matricula_usr;
		
END;
$BODY$;

DROP FUNCTION IF EXISTS public.consulta_info_alumnos(text);

CREATE OR REPLACE FUNCTION public.consulta_info_alumnos(
	matricula_usr text)
    RETURNS TABLE(id_carrera integer, id_ivd text, nombre_usuario text, password text, correo_institucional text, rol text, semestre text, regular boolean, estatus_alumno text, inscrito boolean, carrera text) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
	RETURN QUERY
	SELECT * FROM usuarios u 
	JOIN alumnos using (id_ivd)
	JOIN carreras using (id_carrera)
	WHERE u.id_ivd = matricula_usr;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.crear_grupo_completo(
	id_salon_param integer,
	id_ciclo_escolar_materia_param integer,
	dia_semana_param text,
	hora_inicio_param time without time zone,
	hora_fin_param time without time zone)
    RETURNS integer
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    capacidad_salon INT;
    nuevo_id_grupo INT;
BEGIN
    -- 1. Obtener la capacidad del salón
    SELECT capacidad INTO capacidad_salon
    FROM salones
    WHERE id_salon = id_salon_param
    LIMIT 1;

    IF capacidad_salon IS NULL THEN
        RAISE EXCEPTION 'El salón no existe';
    END IF;

    -- 2. Insertar en grupos
    INSERT INTO grupos (id_salon, cupo_maximo, cupo_disponible)
    VALUES (id_salon_param, capacidad_salon, capacidad_salon)
    RETURNING id_grupo INTO nuevo_id_grupo;

    -- 3. Insertar en grupos_ciclos_materias
    INSERT INTO grupos_ciclos_materias (id_grupo, id_ciclo_escolar_materia)
    VALUES (nuevo_id_grupo, id_ciclo_escolar_materia_param);

    -- 4. Insertar en grupos_horarios
    INSERT INTO grupos_horarios (id_grupo, dia_semana, hora_inicio, hora_fin)
    VALUES (nuevo_id_grupo, dia_semana_param, hora_inicio_param, hora_fin_param);

    -- Regresar el id_grupo creado
    RETURN nuevo_id_grupo;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.obtener_id_materias_impartidas(
	integer,
	integer)
    RETURNS TABLE(id_profesor_materia integer, id_ciclo_escolar_materia integer) 
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
SELECT pm.id_profesor_materia, pm.id_ciclo_escolar_materia
FROM profesores_materias pm
JOIN ciclos_escolares_materias using (id_ciclo_escolar_materia)
WHERE id_profesor = $1::int AND id_ciclo_escolar = $2::int;
$BODY$;

CREATE OR REPLACE FUNCTION public.obtener_info_materias_impartidas(
	integer,
	integer)
    RETURNS TABLE(id_plan_estudio integer, creditos integer, horas_profesor integer, materia text, id_materia integer) 
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
    
SELECT pm.id_plan_estudio, m.creditos, m.horas_profesor, m.materia, m.id_materia 
FROM obtener_id_materias_impartidas($1::int, $2::int)
JOIN ciclos_escolares_materias cem using (id_ciclo_escolar_materia)
JOIN planes_materias pm using (id_plan_materia)
JOIN materias m using (id_materia); 
$BODY$;

CREATE OR REPLACE FUNCTION public.verificar_o_crear_grupo(
	id_materia_param integer,
	id_ciclo_param integer,
	id_profesor_param integer,
	id_salon_param integer)
    RETURNS integer
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    id_pm INTEGER;
    id_cem INTEGER;
    id_grupo_existente INTEGER;
    capacidad_salon INTEGER;
    nuevo_id_grupo INTEGER;
BEGIN
    IF id_profesor_param IS NULL THEN
        RAISE EXCEPTION 'No se puede crear grupo sin profesor asignado';
    END IF;

    -- Obtener id_plan_materia
    SELECT id_plan_materia INTO id_pm
    FROM planes_materias
    WHERE id_materia = id_materia_param
    LIMIT 1;

    IF id_pm IS NULL THEN
        RAISE EXCEPTION 'No se encontró plan_materia para la materia %', id_materia_param;
    END IF;

    -- Obtener id_ciclo_escolar_materia
    SELECT id_ciclo_escolar_materia INTO id_cem
    FROM ciclos_escolares_materias
    WHERE id_plan_materia = id_pm
      AND id_ciclo_escolar = id_ciclo_param
    LIMIT 1;

    IF id_cem IS NULL THEN
        RAISE EXCEPTION 'No se encontró la relación materia-ciclo %', id_ciclo_param;
    END IF;

    -- Verificar si ya existe el grupo
    SELECT g.id_grupo INTO id_grupo_existente
    FROM grupos g
    JOIN grupos_ciclos_materias gcm ON g.id_grupo = gcm.id_grupo
    WHERE g.id_profesor = id_profesor_param
      AND g.id_salon = id_salon_param
      AND gcm.id_ciclo_escolar_materia = id_cem
    LIMIT 1;

    IF id_grupo_existente IS NOT NULL THEN
        RETURN id_grupo_existente;
    END IF;

    -- Obtener capacidad del salón
    SELECT capacidad INTO capacidad_salon
    FROM salones
    WHERE id_salon = id_salon_param
    LIMIT 1;

    IF capacidad_salon IS NULL THEN
        RAISE EXCEPTION 'El salón % no existe.', id_salon_param;
    END IF;

    -- Crear nuevo grupo
    INSERT INTO grupos (id_profesor, id_salon, cupo_maximo, cupo_disponible)
    VALUES (id_profesor_param, id_salon_param, capacidad_salon, capacidad_salon)
    RETURNING id_grupo INTO nuevo_id_grupo;

    -- Relacionar con ciclo-materia
    INSERT INTO grupos_ciclos_materias (id_grupo, id_ciclo_escolar_materia)
    VALUES (nuevo_id_grupo, id_cem);

    RETURN nuevo_id_grupo;
END;
$BODY$;