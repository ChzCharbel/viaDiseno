CREATE SCHEMA sistema_antiguo;

ALTER TABLE public."abre" SET SCHEMA sistema_antiguo;
ALTER TABLE public."accede" SET SCHEMA sistema_antiguo;
ALTER TABLE public."administradores" SET SCHEMA sistema_antiguo;
ALTER TABLE public."alumnos" SET SCHEMA sistema_antiguo;
ALTER TABLE public."ciclos_escolares" SET SCHEMA sistema_antiguo;
ALTER TABLE public."disponible" SET SCHEMA sistema_antiguo;
ALTER TABLE public."enlista" SET SCHEMA sistema_antiguo;
ALTER TABLE public."grupos" SET SCHEMA sistema_antiguo;
ALTER TABLE public."materias" SET SCHEMA sistema_antiguo;
ALTER TABLE public."ofrece" SET SCHEMA sistema_antiguo;
ALTER TABLE public."planes" SET SCHEMA sistema_antiguo;
ALTER TABLE public."privilegios" SET SCHEMA sistema_antiguo;
ALTER TABLE public."profesores" SET SCHEMA sistema_antiguo;
ALTER TABLE public."requisito" SET SCHEMA sistema_antiguo;
ALTER TABLE public."salones" SET SCHEMA sistema_antiguo;
ALTER TABLE public."solicitudes_cambio" SET SCHEMA sistema_antiguo;
ALTER TABLE public."usuarios" SET SCHEMA sistema_antiguo;

DROP SCHEMA IF EXISTS sistema_antiguo CASCADE;