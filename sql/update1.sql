INSERT INTO public."Enlista" VALUES ('G003', '100007');
INSERT INTO public."Enlista" VALUES ('G004', '100007');

UPDATE "Grupo"
SET
    "lunesInicio" = '12:00',
    "lunesFin" = '14:00',
    "miercolesInicio" = '13:00',
    "miercolesFin" = '14:00'
WHERE "idGrupo" = 'G003';

UPDATE "Grupo"
SET
    "martesInicio" = '12:00',
    "martesFin" = '14:00',
    "juevesInicio" = '08:00',
    "juevesFin" = '10:00'
WHERE "idGrupo" = 'G004';