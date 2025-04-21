CREATE OR REPLACE PROCEDURE sincronizar_planes_materias(
    id_usr_materia integer,
    id_plan_usr integer,
    semestre_usr integer,
    estatus_usr text
)
LANGUAGE plpgsql
AS $$
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
$$;

CREATE OR REPLACE FUNCTION crear_grupo_completo(
    id_salon_param INT,
    id_ciclo_escolar_materia_param INT,
    dia_semana_param TEXT,
    hora_inicio_param TIME,
    hora_fin_param TIME
)
RETURNS INT
LANGUAGE plpgsql
AS $$
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
$$;