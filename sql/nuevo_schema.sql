CREATE SCHEMA sistema_anterior;

ALTER TABLE public."Abre" SET SCHEMA sistema_anterior;
ALTER TABLE public."Accede" SET SCHEMA sistema_anterior;
ALTER TABLE public."Administrador" SET SCHEMA sistema_anterior;
ALTER TABLE public."Alumno" SET SCHEMA sistema_anterior;
ALTER TABLE public."CicloEscolar" SET SCHEMA sistema_anterior;
ALTER TABLE public."Disponible" SET SCHEMA sistema_anterior;
ALTER TABLE public."Enlista" SET SCHEMA sistema_anterior;
ALTER TABLE public."Grupo" SET SCHEMA sistema_anterior;
ALTER TABLE public."Materia" SET SCHEMA sistema_anterior;
ALTER TABLE public."Ofrece" SET SCHEMA sistema_anterior;
ALTER TABLE public."Plan" SET SCHEMA sistema_anterior;
ALTER TABLE public."Privilegio" SET SCHEMA sistema_anterior;
ALTER TABLE public."Profesor" SET SCHEMA sistema_anterior;
ALTER TABLE public."Requisito" SET SCHEMA sistema_anterior;
ALTER TABLE public."Salon" SET SCHEMA sistema_anterior;
ALTER TABLE public."SolicitaCambio" SET SCHEMA sistema_anterior;
ALTER TABLE public."Usuario" SET SCHEMA sistema_anterior;
ALTER TABLE public.gruposs SET SCHEMA sistema_anterior;

DROP SCHEMA IF EXISTS sistema_anterior CASCADE;