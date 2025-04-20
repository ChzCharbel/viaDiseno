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