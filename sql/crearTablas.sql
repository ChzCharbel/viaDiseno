CREATE TABLE IF NOT EXISTS public."Plan"
(
	"idPlan" varchar NOT NULL,
	nombre varchar,
	carrera varchar,
	CONSTRAINT "planPk" PRIMARY KEY ("idPlan")
);

CREATE TABLE IF NOT EXISTS public."CicloEscolar"
(
	"idCicloEscolar" varchar NOT NULL,
	"fechaInicio" date,
	"fechaFin" date,
	CONSTRAINT "cicloEscolarPk" PRIMARY KEY ("idCicloEscolar")
);


CREATE TABLE IF NOT EXISTS public."Materia"
(
	"idMateria" varchar NOT NULL,
	"nombreMateria" varchar,
	"idPlan" varchar,
	creditos decimal,
	"horasProfesor" numeric,
	equipamiento varchar,
	CONSTRAINT "materiaPk" PRIMARY KEY ("idMateria"),
	CONSTRAINT "materiaFk" FOREIGN KEY ("idPlan")
		REFERENCES public."Plan"("idPlan") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public."Requisito"
(
	"idMateria" varchar NOT NULL,
	requisito varchar NOT NULL,
	CONSTRAINT "requisitoPk" PRIMARY KEY ("idMateria", requisito),
	CONSTRAINT "requisitoFk" FOREIGN KEY ("idMateria") 
		REFERENCES public."Materia" ("idMateria") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT "materiaFk2" FOREIGN KEY (requisito)
		REFERENCES public."Materia" ("idMateria") MATCH  SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE
);


CREATE TABLE "Salon" (
    "idSalon" character varying PRIMARY KEY,
    numero integer,
    cupo integer,
    tipo text,
    descripcion character varying
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX "salonPk" ON "Salon"("idSalon" text_ops);

CREATE TABLE IF NOT EXISTS public."Profesor"
(
	"matriculaProfesor" varchar NOT NULL,
	"nombreProfesor" varchar,
	CONSTRAINT "profesorPk" PRIMARY KEY ("matriculaProfesor")
);

CREATE TABLE IF NOT EXISTS public."Alumno"
(
	matricula varchar NOT NULL,
	semestre varchar,
	regular boolean,
carrera varchar,
	CONSTRAINT "alumnoPk" PRIMARY KEY (matricula),
	CONSTRAINT "alumnoFk" FOREIGN KEY (matricula)
		REFERENCES public."Usuario" ("idIVD") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public."Administrador"
(
	"idIVD" varchar NOT NULL,
	carrera varchar,
	CONSTRAINT "administradorPk" PRIMARY KEY ("idIVD"),
	CONSTRAINT "administradorFk" FOREIGN KEY ("idIVD")
		REFERENCES public."Usuario" MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public."Usuario"
(
	"idIVD" varchar NOT NULL,
	"nombreUsuario" varchar,
	"password" varchar,
	"correoInstitucional" varchar,
	CONSTRAINT "usuarioPk" PRIMARY KEY ("idIVD")
);

CREATE TABLE "Grupo" (
    "idGrupo" character varying PRIMARY KEY,
    "idMateria" character varying REFERENCES "Materia"("idMateria") ON DELETE CASCADE ON UPDATE CASCADE,
    "matriculaProfesor" character varying REFERENCES "Profesor"("matriculaProfesor") ON DELETE CASCADE ON UPDATE CASCADE,
    "idSalon" character varying REFERENCES "Salon"("idSalon") ON DELETE CASCADE ON UPDATE CASCADE,
    lunes time without time zone[],
    martes time without time zone[],
    miercoles time without time zone[],
    jueves time without time zone[],
    viernes time without time zone[]
);
-- Indices -------------------------------------------------------
CREATE UNIQUE INDEX "grupoPk" ON "Grupo"("idGrupo" text_ops);

CREATE TABLE IF NOT EXISTS public."Enlista"
(
	"idGrupo" varchar NOT NULL,
	matricula varchar NOT NULL,
	CONSTRAINT "enlistaPk" PRIMARY KEY ("idGrupo",matricula),
	CONSTRAINT "enlistaFk" FOREIGN KEY ("idGrupo")
		REFERENCES public."Grupo" ("idGrupo") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT "enlistaFk2" FOREIGN KEY (matricula)
		REFERENCES public."Alumno" (matricula) MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public."Disponible"
(
	"idCicloEscolar" varchar NOT NULL,
	"matriculaProfesor" varchar NOT NULL,
	lunes time without time zone[],
	martes time without time zone[],
	miercoles time without time zone[],
	jueves time without time zone[],
	viernes time without time zone[],
	CONSTRAINT "disponiblePk" PRIMARY KEY ("idCicloEscolar","matriculaProfesor"),
	CONSTRAINT "disponibleFk" FOREIGN KEY ("idCicloEscolar")
		REFERENCES public."CicloEscolar" ("idCicloEscolar") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT "disponibleFk2" FOREIGN KEY ("matriculaProfesor")
		REFERENCES public."Profesor" ("matriculaProfesor") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public."Ofrece"
(
	"idCicloEscolar" varchar NOT NULL,
	"idMateria" varchar NOT NULL,
	CONSTRAINT "ofrecePk" PRIMARY KEY ("idCicloEscolar","idMateria"),
	CONSTRAINT "ofreceFk" FOREIGN KEY ("idCicloEscolar") 
		REFERENCES public."CicloEscolar"("idCicloEscolar") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT "ofreceFk2" FOREIGN KEY ("idMateria") 
		REFERENCES public."Materia"("idMateria") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public."Abre"
(
	"idCicloEscolar" varchar NOT NULL,
	"idGrupo" varchar NOT NULL,
	CONSTRAINT "abrePk" PRIMARY KEY ("idCicloEscolar","idGrupo"),
	CONSTRAINT "abreFk" FOREIGN KEY ("idCicloEscolar") 
		REFERENCES public."CicloEscolar"("idCicloEscolar") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT "abreFk2" FOREIGN KEY ("idGrupo") 
		REFERENCES public."Grupo"("idGrupo") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public."SolicitaCambio"
(
	matricula varchar NOT NULL,
	"idMateria" varchar NOT NULL,
	resuelto boolean,
	descripcion varchar,
	"fechaSolicitud" date,
	"fechaResolucion" date,
	CONSTRAINT "solicitaCambioPk" PRIMARY KEY (matricula, "idMateria"),
	CONSTRAINT "solicitaCambioFk" FOREIGN KEY (matricula)
		REFERENCES public."Alumno"(matricula) MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT "solicitaCambioFk2" FOREIGN KEY ("idMateria")
		REFERENCES public."Materia"("idMateria") MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public."Privilegio"
(
	"idPrivilegio" varchar NOT NULL,
	"nombre" varchar,
	CONSTRAINT "privilegioPk" PRIMARY KEY ("idPrivilegio")
);

CREATE TABLE IF NOT EXISTS public."Accede"
(
	"nombreRol" varchar NOT NULL,
	"idPrivilegio" varchar,
	CONSTRAINT "accedePk" PRIMARY KEY ("nombreRol", "idPrivilegio"),
	CONSTRAINT "accedeFk" FOREIGN KEY ("idPrivilegio")
		REFERENCES public."Privilegio" MATCH SIMPLE
		ON UPDATE CASCADE
		ON DELETE CASCADE
);