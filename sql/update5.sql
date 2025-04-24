-- FUNCTION: public.consulta_info_alumnos(text)

-- DROP FUNCTION IF EXISTS public.consulta_info_alumnos(text);

CREATE OR REPLACE FUNCTION public.consulta_info_alumnos(
	matricula_usr text)
    RETURNS TABLE(id_carrera integer, id_ivd text, nombre_usuario text, password text, correo_institucional text, rol text, semestre text, regular boolean, estatus_alumno text, carrera text) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
	RETURN QUERY
	SELECT 
		c.id_carrera,
		u.id_ivd,
		u.nombre_usuario,
		u.password,
		u.correo_institucional,
		u.rol,
		a.semestre,
		a.regular,
		a.estatus_alumno,
		c.carrera
	FROM usuarios u 
	JOIN alumnos a USING (id_ivd)
	JOIN carreras c USING (id_carrera)
	WHERE u.id_ivd = matricula_usr;
END;
$BODY$;

ALTER FUNCTION public.consulta_info_alumnos(text)
    OWNER TO postgres;
