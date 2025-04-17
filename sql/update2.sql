CREATE TABLE IF NOT EXISTS public.profesores_materias (
    id_profesor_materia SERIAL PRIMARY KEY,
    id_profesor INTEGER NOT NULL,
    id_ciclo_escolar_materia INTEGER NOT NULL,
    CONSTRAINT fk_profesor FOREIGN KEY (id_profesor)
        REFERENCES public.profesores (id_profesor)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_ciclo_materia FOREIGN KEY (id_ciclo_escolar_materia)
        REFERENCES public.ciclos_escolares_materias (id_ciclo_escolar_materia)
        ON UPDATE CASCADE ON DELETE CASCADE
);

ALTER TABLE "public"."planes_materias" RENAME COLUMN "id_plan" TO "id_plan_estudio";