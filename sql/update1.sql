ALTER TABLE IF EXISTS public."Profesor"
    ADD COLUMN estatus character varying[];

UPDATE "Profesor"
SET estatus = 'active';