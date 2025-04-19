CREATE OR REPLACE PROCEDURE sincronizar_ciclos_escolares(
    id_ciclo_api integer,
    nombre_ciclo TEXT,
    start_date DATE,
    end_date DATE
)
LANGUAGE plpgsql
AS $$
DECLARE
    existe_ciclo INTEGER;
BEGIN
    SELECT COUNT(*) INTO existe_ciclo
    FROM ciclos_escolares
    WHERE id_ciclo_escolar = id_ciclo_api;

    IF existe_ciclo = 0 THEN
        INSERT INTO ciclos_escolares (id_ciclo_escolar, ciclo_escolar, fecha_inicio, fecha_fin)
        VALUES (id_ciclo_api, nombre_ciclo, start_date, end_date);
    ELSE
        UPDATE ciclos_escolares 
        SET ciclo_escolar = nombre_ciclo,
            fecha_inicio = start_date,
            fecha_fin = end_date    
        WHERE id_ciclo_escolar = id_ciclo_api;
    END IF;
END;
$$;
