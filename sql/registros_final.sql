--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-05-01 23:24:00

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5079 (class 0 OID 16945)
-- Dependencies: 220
-- Data for Name: privilegios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.privilegios VALUES ('PRIV001', 'Consultar alumnos');
INSERT INTO public.privilegios VALUES ('PRIV002', 'Consultar materias');
INSERT INTO public.privilegios VALUES ('PRIV003', 'Consultar avance de plan de estudios');
INSERT INTO public.privilegios VALUES ('PRIV004', 'Consultar todos los grupos');
INSERT INTO public.privilegios VALUES ('PRIV005', 'Consultar grupos asignados');
INSERT INTO public.privilegios VALUES ('PRIV006', 'Consultar fecha de inscripciones');
INSERT INTO public.privilegios VALUES ('PRIV007', 'Consultar oferta académica');
INSERT INTO public.privilegios VALUES ('PRIV008', 'Consultar profesores');
INSERT INTO public.privilegios VALUES ('PRIV009', 'Registrar disponibilidad de profesores');
INSERT INTO public.privilegios VALUES ('PRIV010', 'Registrar materias que imparte profesor');
INSERT INTO public.privilegios VALUES ('PRIV011', 'Registrar oferta académica');
INSERT INTO public.privilegios VALUES ('PRIV012', 'Registrar grupo');
INSERT INTO public.privilegios VALUES ('PRIV013', 'Registrar fecha de inscripciones');
INSERT INTO public.privilegios VALUES ('PRIV014', 'Asignar y eliminar materia de grupo');
INSERT INTO public.privilegios VALUES ('PRIV015', 'Asignar y eliminar profesor de grupo');
INSERT INTO public.privilegios VALUES ('PRIV016', 'Asignar y eliminar salón de grupo');
INSERT INTO public.privilegios VALUES ('PRIV017', 'Asignar materias a alumnos irregulares');
INSERT INTO public.privilegios VALUES ('PRIV018', 'Enviar solicitud de cambio');
INSERT INTO public.privilegios VALUES ('PRIV019', 'Contestar solicitud de cambio');
INSERT INTO public.privilegios VALUES ('PRIV020', 'Consultar solicitudes');


--
-- TOC entry 5076 (class 0 OID 16875)
-- Dependencies: 217
-- Data for Name: accede; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.accede VALUES ('admin', 'PRIV001');
INSERT INTO public.accede VALUES ('admin', 'PRIV002');
INSERT INTO public.accede VALUES ('admin', 'PRIV003');
INSERT INTO public.accede VALUES ('admin', 'PRIV004');
INSERT INTO public.accede VALUES ('admin', 'PRIV005');
INSERT INTO public.accede VALUES ('student', 'PRIV005');
INSERT INTO public.accede VALUES ('admin', 'PRIV006');
INSERT INTO public.accede VALUES ('student', 'PRIV006');
INSERT INTO public.accede VALUES ('admin', 'PRIV007');
INSERT INTO public.accede VALUES ('student', 'PRIV007');
INSERT INTO public.accede VALUES ('admin', 'PRIV008');
INSERT INTO public.accede VALUES ('admin', 'PRIV009');
INSERT INTO public.accede VALUES ('admin', 'PRIV010');
INSERT INTO public.accede VALUES ('admin', 'PRIV011');
INSERT INTO public.accede VALUES ('admin', 'PRIV012');
INSERT INTO public.accede VALUES ('admin', 'PRIV013');
INSERT INTO public.accede VALUES ('admin', 'PRIV014');
INSERT INTO public.accede VALUES ('admin', 'PRIV015');
INSERT INTO public.accede VALUES ('admin', 'PRIV016');
INSERT INTO public.accede VALUES ('admin', 'PRIV017');
INSERT INTO public.accede VALUES ('student', 'PRIV018');
INSERT INTO public.accede VALUES ('admin', 'PRIV019');
INSERT INTO public.accede VALUES ('admin', 'PRIV020');


--
-- TOC entry 5080 (class 0 OID 16980)
-- Dependencies: 221
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.usuarios VALUES ('IVD99023', 'Elena Domínguez', 'aJsqeCFw34Far', 'edominguez@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD27384', 'Paloma Núñez Luna', 'IEWE8aefcsw', 'pnunez@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD012902', 'Alberto Méndez Álvarez', 'jncfinhuq33842938ed', 'amendez@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD83721', 'Juan Ignacio Arriola Ruíz', 'iuo394uf89ecij', 'jarriola@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD56893', 'Antonia García Heche', '98q98qwud', 'agarcia@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD42452', 'Esther Vázquez Herrera', 'qwdxp12o', 'evazquez@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD53916', 'Beatriz Paredes Sevilla', '59iyh6hjj', 'bparedes@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD92482', 'Inés Pineda González', '0923829', 'igonzalez@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD87493', 'Jorge Cáceres Ochoa', 'Contrasena123', 'jcaceres@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD87494', 'Mariana López Herrera', 'LokiMiGato22', 'mlopez@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD87495', 'Ricardo Gómez Nieto', 'AmoLasTortas99', 'rgomez@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD87496', 'Fernanda Ruiz Salgado', 'PikachuEsReal01', 'fruiz@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD87497', 'Alejandro Torres Velasco', 'PerroSalchicha07', 'atorres@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD87498', 'Laura Méndez Rivas', 'ViajarSinDinero24', 'lmendez@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD87499', 'Daniel Vázquez Ortega', 'GatoDormilón88', 'dvazquez@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD87500', 'Gabriela Sánchez Pineda', 'OdioLevantarm3', 'gsanchez@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD87501', 'José Luis Perea Castro', 'CaféYPeliculas12', 'jperea@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD87502', 'Valeria Ortega Román', 'PugEnMochila99', 'vortega@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD87503', 'Sebastián Herrera Núñez', 'NoMasTareas777', 'sherrera@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD87504', 'Camila Estrada Lozano', 'QuieroPizzaYa', 'cestrada@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD87505', 'Andrés Velázquez Quiróz', 'PerritoFeliz44', 'avelazquez@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD87506', 'Natalia Ríos Jiménez', 'MiGatoMeOdia02', 'nrios@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD87507', 'Juan Pablo Pérez Galván', 'DormirEsUnLujo', 'jperez@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD87508', 'Sofía Delgado Varela', 'NetflixYNachos21', 'sdelgado@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD87509', 'Iván Morales Fuentes', 'HamsterLoco19', 'imorales@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD87510', 'Andrea Gutiérrez Salas', 'AutoRojoRápido', 'agutierrez@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD87511', 'Emiliano Castro Hernández', 'AmoLosGatosXD', 'ecastro@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD87512', 'Paulina Ramos Cervantes', 'QuieroUnPerrito', 'pramos@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('IVD87513', 'Roberto Núñez Olvera', 'NoMasExamenes25', 'rnunez@IVD.mx', NULL);
INSERT INTO public.usuarios VALUES ('300015', 'Samir Baidon null', '$2b$12$VNb9dJRNyDKwbx.vhwi9HeoiJSRfhbVM/A53JBXLArUnfXoxQxnVW', 'samirbaidonpardo@hotmail.com', 'admin');
INSERT INTO public.usuarios VALUES ('100001', 'Jorge Bins Dibbert', '$2b$12$ZC1SOwQ9ezMpvi76zYUwDeDmJkB7rDDasxfEgKZplLCPqFpbkRmZC', 'bernardogr95+ivd-test@gmail.com', 'student');
INSERT INTO public.usuarios VALUES ('100007', 'Halina Runte Ziemann', '$2b$12$4b8P22PBD4.tkASmEu2/necJbcLsRY0WSEaDNtk4A.synceHkxF2S', '100007@ivd.edu.mx', 'student');
INSERT INTO public.usuarios VALUES ('100023', 'Brad Nienow Crooks', '$2b$12$f3n4wCy1WuHWntsvh7MwKep3uXB7lliezAFa0PUlMRbeH9567r/ni', '100023@ivd.edu.mx', 'student');
INSERT INTO public.usuarios VALUES ('100123', 'Adrian Gomez Romero', '$2b$12$.DDh.jGaz0ydpxIr5tgNl.i1RNejf7WpGrgHCPj6M5/nG4cxUhk9C', 'adriangomezr95@gmail.com', 'student');
INSERT INTO public.usuarios VALUES ('XP300', 'Xime', NULL, 'xime@gmail.com', 'student');
INSERT INTO public.usuarios VALUES ('XP119', 'Ximena', 'xime123', 'ximena@gmail.com', 'admin');
INSERT INTO public.usuarios VALUES ('300014', 'Bernardo Gomez Romero', '$2b$12$PjfoH.Ytr1myoIvUJZyq5.8QLEQg6uGE4zG/fxhbNozK60xAJmLGG', '300014@ivd.edu.mx', 'admin');
INSERT INTO public.usuarios VALUES ('100002', 'Rich Cronin Altenwerth', NULL, '100002@ivd.edu.mx', 'student');
INSERT INTO public.usuarios VALUES ('100124', 'Bernardo Gomez Alumno', NULL, 'bernardogr95+alumno@gmail.com', 'student');
INSERT INTO public.usuarios VALUES ('100131', 'Leo Cerva null', NULL, 'leocerva29@gmail.com', 'student');
INSERT INTO public.usuarios VALUES ('100125', 'Bernardo Gomez Alumno2', NULL, 'bernardogr95+alumno2@gmail.com', 'student');
INSERT INTO public.usuarios VALUES ('100122', 'Juan Peréz López', NULL, '100122@ivd.edu.mx', 'student');
INSERT INTO public.usuarios VALUES ('100132', 'Fermin  Nieto null', NULL, 'nietofermin@gmail.com', 'student');
INSERT INTO public.usuarios VALUES ('100128', 'Mateo Minghi Vega', NULL, '100128@ivd.edu.mx', 'student');
INSERT INTO public.usuarios VALUES ('100130', 'Enrique Student  Mailing', NULL, 'a01711235@tec.mx', 'student');
INSERT INTO public.usuarios VALUES ('100133', 'Alumno Prueba null', NULL, 'lalilianrdz@gmail.com', 'student');
INSERT INTO public.usuarios VALUES ('100136', 'Enrique Ayala null', NULL, 'ivd-admins-qa.upscale159@passmail.net', 'student');
INSERT INTO public.usuarios VALUES ('100099', 'Santiago Metz Douglas', NULL, '100099@ivd.edu.mx', 'student');
INSERT INTO public.usuarios VALUES ('100135', 'Enrique  Ayal null', NULL, 'enayala12@gmail.com', 'student');


--
-- TOC entry 5077 (class 0 OID 16882)
-- Dependencies: 218
-- Data for Name: administradores; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.administradores VALUES ('IVD87510', 'active', 2);
INSERT INTO public.administradores VALUES ('IVD87512', 'active', 2);
INSERT INTO public.administradores VALUES ('300015', 'active', 2);
INSERT INTO public.administradores VALUES ('IVD87509', 'active', 1);
INSERT INTO public.administradores VALUES ('IVD87511', 'active', 1);
INSERT INTO public.administradores VALUES ('IVD87513', 'active', 1);
INSERT INTO public.administradores VALUES ('XP119', 'inactive', 1);
INSERT INTO public.administradores VALUES ('300014', '', 7);


--
-- TOC entry 5078 (class 0 OID 16889)
-- Dependencies: 219
-- Data for Name: alumnos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.alumnos VALUES ('100001', '9', true, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('100002', '2', true, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('100007', '2', false, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('IVD87493', '1', true, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('IVD87495', '3', false, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('IVD87497', '5', true, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('IVD87499', '2', false, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('IVD87501', '4', true, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('IVD87503', '6', true, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('IVD87505', '8', false, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('IVD87507', '2', true, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('XP300', '4', true, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('IVD87494', '2', true, 'active', 8, false);
INSERT INTO public.alumnos VALUES ('IVD87496', '4', true, 'active', 8, false);
INSERT INTO public.alumnos VALUES ('IVD87498', '1', true, 'active', 8, false);
INSERT INTO public.alumnos VALUES ('IVD87500', '3', true, 'active', 8, false);
INSERT INTO public.alumnos VALUES ('IVD87502', '5', true, 'active', 8, false);
INSERT INTO public.alumnos VALUES ('IVD87504', '7', true, 'active', 8, false);
INSERT INTO public.alumnos VALUES ('IVD87506', '1', true, 'active', 8, false);
INSERT INTO public.alumnos VALUES ('100023', '2', true, 'active', 8, false);
INSERT INTO public.alumnos VALUES ('100123', '1', true, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('100124', '1', true, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('100136', '1', true, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('100131', '3', true, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('100099', '2', false, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('100125', '1', true, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('100122', '4', true, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('100132', '2', false, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('100133', '1', true, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('100128', '3', false, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('100130', '4', false, 'active', 7, false);
INSERT INTO public.alumnos VALUES ('100135', '3', true, 'active', 7, false);


--
-- TOC entry 5082 (class 0 OID 17282)
-- Dependencies: 223
-- Data for Name: carreras; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.carreras VALUES (8, 'Diseño y Arquitectura de Interiores');
INSERT INTO public.carreras VALUES (9, 'Ingenieria en Sistemas');
INSERT INTO public.carreras VALUES (7, 'Diseño de la Moda e Industria del Vestido');


--
-- TOC entry 5084 (class 0 OID 17291)
-- Dependencies: 225
-- Data for Name: ciclos_escolares; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ciclos_escolares VALUES (18, '-', '2000-01-01', '2000-01-06', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (16, '2020-2', '2020-01-26', '2020-06-11', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (15, '2021-1', '2020-08-16', '2020-12-13', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (14, '2021-2', '2021-01-24', '2021-06-10', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (13, '2022-1', '2021-08-15', '2021-12-09', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (17, '2024-1', '2024-07-01', '2024-12-31', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (19, '2024-2', '2025-01-19', '2025-06-13', '2025-04-08', '2025-04-29');
INSERT INTO public.ciclos_escolares VALUES (52, 'Lm099', '2025-02-01', '2025-02-13', NULL, NULL);


--
-- TOC entry 5086 (class 0 OID 17300)
-- Dependencies: 227
-- Data for Name: materias; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.materias VALUES (387, 'Ilustración de prendas infantiles', 5, 3);
INSERT INTO public.materias VALUES (388, 'Técnicas de traje de baño', 7, 2);
INSERT INTO public.materias VALUES (389, 'Técnicas de mercadotecnia', 7, 2);
INSERT INTO public.materias VALUES (390, 'Taller para prendas básicas', 8, 2);
INSERT INTO public.materias VALUES (391, 'Taller para representación', 9, 5);
INSERT INTO public.materias VALUES (392, 'Diseño de lencería', 9, 3);
INSERT INTO public.materias VALUES (393, 'Herramientas de prendas masculinas', 8, 4);
INSERT INTO public.materias VALUES (409, 'Progra', 15, 5);
INSERT INTO public.materias VALUES (410, 'Algoritmos', 15, 3);
INSERT INTO public.materias VALUES (308, 'Teoría para accesorios', 5, 4);
INSERT INTO public.materias VALUES (309, 'Taller de diseño', 7, 5);
INSERT INTO public.materias VALUES (310, 'Técnicas para prendas básicas', 6, 4);
INSERT INTO public.materias VALUES (311, 'Confección para prendas básicas', 7, 2);
INSERT INTO public.materias VALUES (312, 'Técnicas de prendas femeninas', 6, 2);
INSERT INTO public.materias VALUES (313, 'Taller para prendas infantiles', 8, 4);
INSERT INTO public.materias VALUES (314, 'Patronaje de prendas masculinas', 6, 4);
INSERT INTO public.materias VALUES (315, 'Teoría para joyería', 9, 3);
INSERT INTO public.materias VALUES (316, 'Patronaje de color', 8, 3);
INSERT INTO public.materias VALUES (317, 'Confección de prendas infantiles', 5, 2);
INSERT INTO public.materias VALUES (318, 'Diseño de textiles', 9, 2);
INSERT INTO public.materias VALUES (319, 'Herramientas para lencería', 5, 5);
INSERT INTO public.materias VALUES (320, 'Confección de prendas masculinas', 6, 4);
INSERT INTO public.materias VALUES (321, 'Confección para prendas femeninas', 6, 4);
INSERT INTO public.materias VALUES (322, 'Diseño de joyería', 9, 5);
INSERT INTO public.materias VALUES (323, 'Teoría de representación', 9, 4);
INSERT INTO public.materias VALUES (324, 'Patronaje para joyería', 5, 4);
INSERT INTO public.materias VALUES (325, 'Taller para representación', 6, 2);
INSERT INTO public.materias VALUES (326, 'Ilustración de joyería', 6, 4);
INSERT INTO public.materias VALUES (327, 'Taller para lencería', 6, 4);
INSERT INTO public.materias VALUES (328, 'Patronaje para lencería', 7, 2);
INSERT INTO public.materias VALUES (329, 'Diseño para textiles', 5, 2);
INSERT INTO public.materias VALUES (330, 'Teoría para prendas femeninas', 7, 5);
INSERT INTO public.materias VALUES (331, 'Teoría para mercadotecnia', 8, 2);
INSERT INTO public.materias VALUES (332, 'Fundamentos para lencería', 5, 4);
INSERT INTO public.materias VALUES (333, 'Confección de representación', 9, 5);
INSERT INTO public.materias VALUES (334, 'Fundamentos de lencería', 5, 3);
INSERT INTO public.materias VALUES (335, 'Herramientas de lencería', 6, 2);
INSERT INTO public.materias VALUES (336, 'Taller de joyería', 8, 3);
INSERT INTO public.materias VALUES (337, 'Herramientas para lencería', 6, 2);
INSERT INTO public.materias VALUES (1, 'Historia del Arte', 15, 8);
INSERT INTO public.materias VALUES (2, 'Historia de la Arquitectura I', 18, 10);
INSERT INTO public.materias VALUES (3, 'Historia de la Arquitectura II', 18, 10);
INSERT INTO public.materias VALUES (4, 'Diseño de Accesorios', 17, 12);
INSERT INTO public.materias VALUES (5, 'Materiales Textiles', 21, 6);
INSERT INTO public.materias VALUES (6, 'Modelado en Maniquí I', 15, 10);
INSERT INTO public.materias VALUES (7, 'Modelado en Maniquí II', 17, 14);
INSERT INTO public.materias VALUES (8, 'Diseño de Paisaje', 17, 15);
INSERT INTO public.materias VALUES (9, 'Psicología del Espacio', 18, 18);
INSERT INTO public.materias VALUES (10, 'Iluminación y Acústica', 17, 15);
INSERT INTO public.materias VALUES (11, 'Aplicación Textil I', 17, 4);
INSERT INTO public.materias VALUES (12, 'Aplicación Textil II', 18, 6);
INSERT INTO public.materias VALUES (13, 'Conceptos y Tendencias de la Moda I', 15, 6);
INSERT INTO public.materias VALUES (14, 'Conceptos y Tendencias de la Moda II', 17, 6);
INSERT INTO public.materias VALUES (15, 'Modelación Digital I', 21, 15);
INSERT INTO public.materias VALUES (16, 'Modelación Digital II', 21, 20);
INSERT INTO public.materias VALUES (17, 'Modelos y Prototipos de Mobiliario', 21, 20);
INSERT INTO public.materias VALUES (18, 'Fundamentos de Mercadotecnia', 21, 20);
INSERT INTO public.materias VALUES (19, 'Imagen Corporativa', 21, 20);
INSERT INTO public.materias VALUES (20, 'Ilustración Gráfica Digital', 21, 20);
INSERT INTO public.materias VALUES (338, 'Taller para representación', 5, 2);
INSERT INTO public.materias VALUES (339, 'Confección para prendas básicas', 6, 4);
INSERT INTO public.materias VALUES (340, 'Técnicas para joyería', 8, 4);
INSERT INTO public.materias VALUES (341, 'Diseño de diseño', 8, 3);
INSERT INTO public.materias VALUES (342, 'Patronaje para lencería', 5, 3);
INSERT INTO public.materias VALUES (343, 'Teoría para color', 6, 4);
INSERT INTO public.materias VALUES (344, 'Fundamentos de traje de baño', 8, 5);
INSERT INTO public.materias VALUES (345, 'Fundamentos para traje de baño', 9, 2);
INSERT INTO public.materias VALUES (346, 'Diseño para color', 6, 4);
INSERT INTO public.materias VALUES (347, 'Fundamentos para textiles', 9, 4);
INSERT INTO public.materias VALUES (348, 'Ilustración para representación', 8, 2);
INSERT INTO public.materias VALUES (349, 'Fundamentos para prendas masculinas', 8, 3);
INSERT INTO public.materias VALUES (350, 'Taller para traje de baño', 8, 4);
INSERT INTO public.materias VALUES (351, 'Técnicas para lencería', 8, 3);
INSERT INTO public.materias VALUES (352, 'Patronaje para prendas masculinas', 9, 2);
INSERT INTO public.materias VALUES (353, 'Taller de traje de baño', 7, 5);
INSERT INTO public.materias VALUES (354, 'Diseño de prendas masculinas', 6, 4);
INSERT INTO public.materias VALUES (355, 'Técnicas de sastrería para dama', 8, 3);
INSERT INTO public.materias VALUES (356, 'Diseño para lencería', 5, 4);
INSERT INTO public.materias VALUES (357, 'Herramientas de prendas masculinas', 7, 5);
INSERT INTO public.materias VALUES (358, 'Teoría de traje de baño', 7, 4);
INSERT INTO public.materias VALUES (359, 'Teoría para prendas básicas', 9, 3);
INSERT INTO public.materias VALUES (360, 'Diseño de color', 9, 3);
INSERT INTO public.materias VALUES (361, 'Teoría de prendas masculinas', 8, 3);
INSERT INTO public.materias VALUES (362, 'Técnicas de prendas masculinas', 9, 2);
INSERT INTO public.materias VALUES (363, 'Teoría de prendas femeninas', 5, 3);
INSERT INTO public.materias VALUES (364, 'Técnicas de prendas básicas', 5, 3);
INSERT INTO public.materias VALUES (365, 'Fundamentos de prendas masculinas', 7, 4);
INSERT INTO public.materias VALUES (366, 'Fundamentos de prendas femeninas', 8, 3);
INSERT INTO public.materias VALUES (367, 'Confección de representación', 6, 5);
INSERT INTO public.materias VALUES (368, 'Taller para representación', 8, 3);
INSERT INTO public.materias VALUES (369, 'Taller para lencería', 6, 3);
INSERT INTO public.materias VALUES (370, 'Teoría para textiles', 9, 2);
INSERT INTO public.materias VALUES (371, 'Herramientas para accesorios', 6, 5);
INSERT INTO public.materias VALUES (372, 'Confección para prendas básicas', 5, 3);
INSERT INTO public.materias VALUES (373, 'Teoría de color', 7, 3);
INSERT INTO public.materias VALUES (374, 'Técnicas para traje de baño', 7, 2);
INSERT INTO public.materias VALUES (375, 'Confección para traje de baño', 9, 5);
INSERT INTO public.materias VALUES (376, 'Teoría de prendas infantiles', 5, 3);
INSERT INTO public.materias VALUES (377, 'Diseño de prendas básicas', 5, 4);
INSERT INTO public.materias VALUES (378, 'Fundamentos de traje de baño', 9, 5);
INSERT INTO public.materias VALUES (379, 'Taller de textiles', 9, 4);
INSERT INTO public.materias VALUES (380, 'Técnicas de joyería', 5, 2);
INSERT INTO public.materias VALUES (381, 'Confección para color', 8, 3);
INSERT INTO public.materias VALUES (382, 'Ilustración para prendas femeninas', 7, 2);
INSERT INTO public.materias VALUES (383, 'Taller de joyería', 6, 3);
INSERT INTO public.materias VALUES (384, 'Taller de representación', 6, 2);
INSERT INTO public.materias VALUES (385, 'Técnicas para lencería', 9, 4);
INSERT INTO public.materias VALUES (386, 'Ilustración de prendas femeninas', 7, 2);
INSERT INTO public.materias VALUES (394, 'Teoría para accesorios', 7, 3);
INSERT INTO public.materias VALUES (395, 'Ilustración de lencería', 5, 4);
INSERT INTO public.materias VALUES (396, 'Confección de diseño', 9, 2);
INSERT INTO public.materias VALUES (397, 'Taller de prendas femeninas', 8, 4);
INSERT INTO public.materias VALUES (398, 'Confección de sastrería para dama', 8, 3);
INSERT INTO public.materias VALUES (399, 'Diseño de color', 8, 2);
INSERT INTO public.materias VALUES (400, 'Herramientas para accesorios', 5, 4);
INSERT INTO public.materias VALUES (401, 'Taller para color', 9, 5);
INSERT INTO public.materias VALUES (402, 'Taller de prendas femeninas', 5, 3);
INSERT INTO public.materias VALUES (403, 'Taller para color', 5, 4);
INSERT INTO public.materias VALUES (404, 'Confección para traje de baño', 6, 2);
INSERT INTO public.materias VALUES (405, 'Diseño para prendas básicas', 7, 3);
INSERT INTO public.materias VALUES (406, 'Ilustración para color', 9, 5);
INSERT INTO public.materias VALUES (407, 'Patronaje de prendas masculinas', 7, 3);
INSERT INTO public.materias VALUES (408, 'Fundamentos de joyería', 7, 5);
INSERT INTO public.materias VALUES (307, 'Confección de Lencería y Traje', 5, 5);


--
-- TOC entry 5088 (class 0 OID 17309)
-- Dependencies: 229
-- Data for Name: planes_estudios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.planes_estudios VALUES (10, 'Ingenieria en Sistemas 1', 9);
INSERT INTO public.planes_estudios VALUES (7, 'Diseño de la Moda e Industria del Vestido 1', 7);
INSERT INTO public.planes_estudios VALUES (8, 'Diseño de la Moda e Industria del Vestido 2', 7);
INSERT INTO public.planes_estudios VALUES (9, 'Diseno y Arquitectura de Interiores 1', 8);


--
-- TOC entry 5090 (class 0 OID 17323)
-- Dependencies: 231
-- Data for Name: planes_materias; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.planes_materias VALUES (1, 7, 1, 1, 'active');
INSERT INTO public.planes_materias VALUES (4, 7, 4, 4, 'active');
INSERT INTO public.planes_materias VALUES (7, 7, 7, 7, 'active');
INSERT INTO public.planes_materias VALUES (10, 7, 10, 2, 'active');
INSERT INTO public.planes_materias VALUES (13, 7, 13, 5, 'active');
INSERT INTO public.planes_materias VALUES (16, 7, 16, 8, 'active');
INSERT INTO public.planes_materias VALUES (19, 7, 19, 3, 'active');
INSERT INTO public.planes_materias VALUES (2, 8, 2, 2, 'active');
INSERT INTO public.planes_materias VALUES (5, 8, 5, 5, 'active');
INSERT INTO public.planes_materias VALUES (8, 8, 8, 8, 'active');
INSERT INTO public.planes_materias VALUES (11, 8, 11, 3, 'active');
INSERT INTO public.planes_materias VALUES (14, 8, 14, 6, 'active');
INSERT INTO public.planes_materias VALUES (17, 8, 17, 1, 'active');
INSERT INTO public.planes_materias VALUES (20, 8, 20, 4, 'active');
INSERT INTO public.planes_materias VALUES (93, 8, 378, 6, 'active');
INSERT INTO public.planes_materias VALUES (94, 8, 379, 7, 'active');
INSERT INTO public.planes_materias VALUES (95, 8, 380, 8, 'active');
INSERT INTO public.planes_materias VALUES (96, 8, 381, 9, 'active');
INSERT INTO public.planes_materias VALUES (101, 8, 386, 5, 'active');
INSERT INTO public.planes_materias VALUES (102, 8, 387, 6, 'active');
INSERT INTO public.planes_materias VALUES (103, 8, 388, 7, 'active');
INSERT INTO public.planes_materias VALUES (104, 8, 389, 8, 'active');
INSERT INTO public.planes_materias VALUES (109, 8, 394, 4, 'active');
INSERT INTO public.planes_materias VALUES (110, 8, 395, 5, 'active');
INSERT INTO public.planes_materias VALUES (111, 8, 396, 6, 'active');
INSERT INTO public.planes_materias VALUES (117, 8, 402, 3, 'active');
INSERT INTO public.planes_materias VALUES (118, 8, 403, 4, 'active');
INSERT INTO public.planes_materias VALUES (119, 8, 404, 5, 'active');
INSERT INTO public.planes_materias VALUES (21, 10, 409, 1, 'active');
INSERT INTO public.planes_materias VALUES (22, 10, 410, 1, 'active');
INSERT INTO public.planes_materias VALUES (23, 7, 308, 2, 'active');
INSERT INTO public.planes_materias VALUES (24, 7, 309, 3, 'active');
INSERT INTO public.planes_materias VALUES (25, 7, 310, 4, 'active');
INSERT INTO public.planes_materias VALUES (26, 7, 311, 5, 'active');
INSERT INTO public.planes_materias VALUES (27, 7, 312, 6, 'active');
INSERT INTO public.planes_materias VALUES (28, 7, 313, 7, 'active');
INSERT INTO public.planes_materias VALUES (29, 7, 314, 8, 'active');
INSERT INTO public.planes_materias VALUES (30, 7, 315, 1, 'active');
INSERT INTO public.planes_materias VALUES (31, 7, 316, 2, 'active');
INSERT INTO public.planes_materias VALUES (32, 7, 317, 3, 'active');
INSERT INTO public.planes_materias VALUES (33, 7, 318, 4, 'active');
INSERT INTO public.planes_materias VALUES (34, 7, 319, 5, 'active');
INSERT INTO public.planes_materias VALUES (35, 7, 320, 6, 'active');
INSERT INTO public.planes_materias VALUES (36, 7, 321, 7, 'active');
INSERT INTO public.planes_materias VALUES (37, 7, 322, 8, 'active');
INSERT INTO public.planes_materias VALUES (38, 7, 323, 1, 'active');
INSERT INTO public.planes_materias VALUES (39, 7, 324, 2, 'active');
INSERT INTO public.planes_materias VALUES (40, 7, 325, 3, 'active');
INSERT INTO public.planes_materias VALUES (41, 7, 326, 4, 'active');
INSERT INTO public.planes_materias VALUES (42, 7, 327, 5, 'active');
INSERT INTO public.planes_materias VALUES (43, 7, 328, 6, 'active');
INSERT INTO public.planes_materias VALUES (44, 7, 329, 7, 'active');
INSERT INTO public.planes_materias VALUES (45, 7, 330, 8, 'active');
INSERT INTO public.planes_materias VALUES (46, 7, 331, 1, 'active');
INSERT INTO public.planes_materias VALUES (47, 7, 332, 2, 'active');
INSERT INTO public.planes_materias VALUES (48, 7, 333, 3, 'active');
INSERT INTO public.planes_materias VALUES (49, 7, 334, 4, 'active');
INSERT INTO public.planes_materias VALUES (50, 7, 335, 5, 'active');
INSERT INTO public.planes_materias VALUES (51, 7, 336, 6, 'active');
INSERT INTO public.planes_materias VALUES (52, 7, 337, 7, 'active');
INSERT INTO public.planes_materias VALUES (53, 7, 338, 8, 'active');
INSERT INTO public.planes_materias VALUES (54, 7, 339, 1, 'active');
INSERT INTO public.planes_materias VALUES (55, 7, 340, 2, 'active');
INSERT INTO public.planes_materias VALUES (56, 7, 341, 3, 'active');
INSERT INTO public.planes_materias VALUES (57, 7, 342, 4, 'active');
INSERT INTO public.planes_materias VALUES (58, 7, 343, 5, 'active');
INSERT INTO public.planes_materias VALUES (59, 7, 344, 6, 'active');
INSERT INTO public.planes_materias VALUES (60, 7, 345, 7, 'active');
INSERT INTO public.planes_materias VALUES (61, 7, 346, 8, 'active');
INSERT INTO public.planes_materias VALUES (62, 7, 347, 1, 'active');
INSERT INTO public.planes_materias VALUES (63, 7, 348, 2, 'active');
INSERT INTO public.planes_materias VALUES (64, 7, 349, 3, 'active');
INSERT INTO public.planes_materias VALUES (65, 7, 350, 4, 'active');
INSERT INTO public.planes_materias VALUES (66, 7, 351, 5, 'active');
INSERT INTO public.planes_materias VALUES (67, 7, 352, 6, 'active');
INSERT INTO public.planes_materias VALUES (68, 7, 353, 7, 'active');
INSERT INTO public.planes_materias VALUES (3, 9, 3, 3, 'active');
INSERT INTO public.planes_materias VALUES (6, 9, 6, 6, 'active');
INSERT INTO public.planes_materias VALUES (9, 9, 9, 1, 'active');
INSERT INTO public.planes_materias VALUES (12, 9, 12, 4, 'active');
INSERT INTO public.planes_materias VALUES (15, 9, 15, 7, 'active');
INSERT INTO public.planes_materias VALUES (69, 7, 354, 8, 'active');
INSERT INTO public.planes_materias VALUES (70, 8, 355, 1, 'active');
INSERT INTO public.planes_materias VALUES (71, 8, 356, 2, 'active');
INSERT INTO public.planes_materias VALUES (72, 8, 357, 3, 'active');
INSERT INTO public.planes_materias VALUES (77, 8, 362, 8, 'active');
INSERT INTO public.planes_materias VALUES (78, 8, 363, 9, 'active');
INSERT INTO public.planes_materias VALUES (79, 8, 364, 1, 'active');
INSERT INTO public.planes_materias VALUES (80, 8, 365, 2, 'active');
INSERT INTO public.planes_materias VALUES (81, 8, 366, 3, 'active');
INSERT INTO public.planes_materias VALUES (82, 8, 367, 4, 'active');
INSERT INTO public.planes_materias VALUES (83, 8, 368, 5, 'active');
INSERT INTO public.planes_materias VALUES (84, 8, 369, 6, 'active');
INSERT INTO public.planes_materias VALUES (85, 8, 370, 7, 'active');
INSERT INTO public.planes_materias VALUES (86, 8, 371, 8, 'active');
INSERT INTO public.planes_materias VALUES (87, 8, 372, 9, 'active');
INSERT INTO public.planes_materias VALUES (88, 8, 373, 1, 'active');
INSERT INTO public.planes_materias VALUES (89, 8, 374, 2, 'active');
INSERT INTO public.planes_materias VALUES (90, 8, 375, 3, 'active');
INSERT INTO public.planes_materias VALUES (91, 8, 376, 4, 'active');
INSERT INTO public.planes_materias VALUES (92, 8, 377, 5, 'active');
INSERT INTO public.planes_materias VALUES (97, 8, 382, 1, 'active');
INSERT INTO public.planes_materias VALUES (98, 8, 383, 2, 'active');
INSERT INTO public.planes_materias VALUES (99, 8, 384, 3, 'active');
INSERT INTO public.planes_materias VALUES (100, 8, 385, 4, 'active');
INSERT INTO public.planes_materias VALUES (105, 8, 390, 9, 'active');
INSERT INTO public.planes_materias VALUES (106, 8, 391, 1, 'active');
INSERT INTO public.planes_materias VALUES (107, 8, 392, 2, 'active');
INSERT INTO public.planes_materias VALUES (108, 8, 393, 3, 'active');
INSERT INTO public.planes_materias VALUES (112, 8, 397, 7, 'active');
INSERT INTO public.planes_materias VALUES (113, 8, 398, 8, 'active');
INSERT INTO public.planes_materias VALUES (114, 8, 399, 9, 'active');
INSERT INTO public.planes_materias VALUES (115, 8, 400, 1, 'active');
INSERT INTO public.planes_materias VALUES (116, 8, 401, 2, 'active');
INSERT INTO public.planes_materias VALUES (120, 8, 405, 6, 'active');
INSERT INTO public.planes_materias VALUES (121, 8, 406, 7, 'active');
INSERT INTO public.planes_materias VALUES (122, 8, 407, 8, 'active');
INSERT INTO public.planes_materias VALUES (123, 8, 408, 9, 'active');
INSERT INTO public.planes_materias VALUES (124, 7, 307, 1, 'active');
INSERT INTO public.planes_materias VALUES (18, 9, 18, 2, 'active');
INSERT INTO public.planes_materias VALUES (73, 8, 358, 4, 'active');
INSERT INTO public.planes_materias VALUES (74, 8, 359, 5, 'active');
INSERT INTO public.planes_materias VALUES (75, 8, 360, 6, 'active');
INSERT INTO public.planes_materias VALUES (76, 8, 361, 7, 'active');


--
-- TOC entry 5092 (class 0 OID 17342)
-- Dependencies: 233
-- Data for Name: ciclos_escolares_materias; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ciclos_escolares_materias VALUES (134, 19, 1, 1);
INSERT INTO public.ciclos_escolares_materias VALUES (135, 19, 62, 1);
INSERT INTO public.ciclos_escolares_materias VALUES (136, 19, 124, 1);
INSERT INTO public.ciclos_escolares_materias VALUES (137, 19, 30, 1);
INSERT INTO public.ciclos_escolares_materias VALUES (138, 19, 38, 1);
INSERT INTO public.ciclos_escolares_materias VALUES (139, 19, 46, 1);
INSERT INTO public.ciclos_escolares_materias VALUES (140, 19, 54, 1);
INSERT INTO public.ciclos_escolares_materias VALUES (141, 19, 63, 2);
INSERT INTO public.ciclos_escolares_materias VALUES (142, 19, 55, 2);
INSERT INTO public.ciclos_escolares_materias VALUES (143, 19, 47, 2);
INSERT INTO public.ciclos_escolares_materias VALUES (144, 19, 39, 2);
INSERT INTO public.ciclos_escolares_materias VALUES (145, 19, 31, 2);
INSERT INTO public.ciclos_escolares_materias VALUES (146, 19, 23, 2);
INSERT INTO public.ciclos_escolares_materias VALUES (147, 19, 10, 2);


--
-- TOC entry 5094 (class 0 OID 17359)
-- Dependencies: 235
-- Data for Name: profesores; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.profesores VALUES (1, 'IVD012902', 'Alberto Méndez Álvarez', 'active');
INSERT INTO public.profesores VALUES (2, 'IVD83721', 'Juan Ignacio Arriola Ruíz', 'active');
INSERT INTO public.profesores VALUES (3, 'IVD56893', 'Antonia García Heche', 'active');
INSERT INTO public.profesores VALUES (4, 'IVD42452', 'Esther Vázquez Herrera', 'active');
INSERT INTO public.profesores VALUES (5, 'IVD53916', 'Beatriz Paredes Sevilla', 'active');
INSERT INTO public.profesores VALUES (6, 'IVD92482', 'Inés Pineda González', 'active');
INSERT INTO public.profesores VALUES (7, '200021', 'Prof Nuevote Prof', 'active');
INSERT INTO public.profesores VALUES (8, '200022', 'a aa aaa', 'active');
INSERT INTO public.profesores VALUES (9, '200001', 'Elicia McClure Botsford', 'active');
INSERT INTO public.profesores VALUES (10, '200002', 'Garret Block Watsica', 'active');
INSERT INTO public.profesores VALUES (11, '200003', 'Elvin Jones Welch', 'active');
INSERT INTO public.profesores VALUES (12, '200004', 'Charlie Connelly Terry', 'active');
INSERT INTO public.profesores VALUES (13, '200005', 'Jacquelin Wunsch Waelchi', 'active');
INSERT INTO public.profesores VALUES (14, '200006', 'Dannie Adams Boyle', 'active');
INSERT INTO public.profesores VALUES (15, '200007', 'Van Kovacek Heller', 'active');
INSERT INTO public.profesores VALUES (16, '200008', 'Johnnie Schoen Fadel', 'active');
INSERT INTO public.profesores VALUES (17, '200009', 'Eura Hirthe Botsford', 'active');
INSERT INTO public.profesores VALUES (18, '200010', 'Lance Schulist Lehner', 'active');
INSERT INTO public.profesores VALUES (19, '200011', 'Ghislaine Orn Orn', 'active');
INSERT INTO public.profesores VALUES (20, '200012', 'Tayna Swaniawski Bashirian', 'active');
INSERT INTO public.profesores VALUES (21, '200013', 'Rodger Kemmer Veum', 'active');
INSERT INTO public.profesores VALUES (22, '200014', 'Zita McClure Wilderman', 'active');
INSERT INTO public.profesores VALUES (23, '200015', 'Marleen Steuber Doyle', 'active');
INSERT INTO public.profesores VALUES (24, '200016', 'Ronnie Hudson Hessel', 'active');
INSERT INTO public.profesores VALUES (25, '200017', 'Shayla Hayes Gerlach', 'active');
INSERT INTO public.profesores VALUES (26, '200018', 'Anibal Wiza Aufderhar', 'active');
INSERT INTO public.profesores VALUES (27, '200019', 'Morris Crona Walker', 'active');
INSERT INTO public.profesores VALUES (28, '200020', 'Brain Dickinson Paucek', 'active');
INSERT INTO public.profesores VALUES (29, '200023', 'kj kj kj', 'active');


--
-- TOC entry 5096 (class 0 OID 17368)
-- Dependencies: 237
-- Data for Name: salones; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.salones VALUES (1, 1, 15, 'ambos', 'taller, clases teoricas');
INSERT INTO public.salones VALUES (2, 2, 20, 'normal', 'clases teoricas');
INSERT INTO public.salones VALUES (3, 3, 22, 'ambos', 'mesas con luz, clases teoricas, clases practicas');
INSERT INTO public.salones VALUES (4, 4, 18, 'normal', 'clases teoricas');
INSERT INTO public.salones VALUES (5, 6, 15, 'especial', 'confeccion, maquinas industriales, maquinas familiares');
INSERT INTO public.salones VALUES (6, 7, 20, 'especial', 'taller, clases de maquetas, joyeria, aplicacion textil');
INSERT INTO public.salones VALUES (7, 8, 35, 'ambos', 'clases teoricas, clases practicas, restiradores para alumnos de interiores');
INSERT INTO public.salones VALUES (8, 9, 12, 'ambos', 'clases teoricas, clases practicas, restiradores para alumnos de interiores');
INSERT INTO public.salones VALUES (9, 10, 18, 'especial', 'confeccion, maquinas familiares, maniquies, burros de planchar');
INSERT INTO public.salones VALUES (10, 11, 22, 'especial', 'confeccion, maquinas familiares, maniquies, burros de planchar');


--
-- TOC entry 5098 (class 0 OID 17377)
-- Dependencies: 239
-- Data for Name: grupos; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5108 (class 0 OID 17463)
-- Dependencies: 249
-- Data for Name: enlista; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5102 (class 0 OID 17408)
-- Dependencies: 243
-- Data for Name: grupos_ciclos_materias; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5100 (class 0 OID 17394)
-- Dependencies: 241
-- Data for Name: grupos_horarios; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5104 (class 0 OID 17425)
-- Dependencies: 245
-- Data for Name: profesores_disponibilidad; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.profesores_disponibilidad VALUES (513, 9, 19, 'martes', '09:00:00', '09:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (515, 9, 19, 'miercoles', '09:00:00', '09:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (563, 13, 19, 'miercoles', '13:30:00', '14:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (427, 7, 19, 'jueves', '07:30:00', '08:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (430, 7, 19, 'lunes', '08:00:00', '08:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (474, 8, 19, 'miercoles', '07:30:00', '08:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (497, 8, 19, 'miercoles', '09:30:00', '10:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (559, 13, 19, 'jueves', '13:00:00', '13:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (502, 8, 19, 'miercoles', '10:00:00', '10:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (455, 7, 19, 'lunes', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (463, 7, 19, 'jueves', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (467, 7, 19, 'miercoles', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (505, 8, 19, 'lunes', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (546, 9, 19, 'martes', '12:00:00', '12:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (620, 20, 19, 'jueves', '14:30:00', '15:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (421, 7, 19, 'martes', '07:30:00', '08:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (441, 7, 19, 'martes', '09:00:00', '09:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (420, 7, 19, 'lunes', '07:00:00', '07:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (451, 7, 19, 'martes', '10:00:00', '10:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (582, 13, 19, 'martes', '15:30:00', '16:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (471, 8, 19, 'martes', '07:30:00', '08:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (423, 7, 19, 'miercoles', '07:30:00', '08:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (432, 7, 19, 'miercoles', '08:00:00', '08:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (447, 7, 19, 'miercoles', '09:30:00', '10:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (444, 7, 19, 'viernes', '09:00:00', '09:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (428, 7, 19, 'viernes', '07:30:00', '08:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (439, 7, 19, 'viernes', '08:30:00', '09:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (628, 20, 19, 'martes', '15:30:00', '16:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (481, 8, 19, 'martes', '08:00:00', '08:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (17, 4, 13, 'martes', '10:00:00', '10:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (18, 4, 14, 'miércoles', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (19, 4, 15, 'jueves', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (20, 4, 16, 'viernes', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (21, 5, 17, 'lunes', '12:00:00', '12:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (22, 5, 18, 'martes', '12:30:00', '13:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (23, 5, 19, 'miércoles', '13:00:00', '13:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (491, 8, 19, 'martes', '09:00:00', '09:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (529, 9, 19, 'viernes', '10:00:00', '10:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (577, 13, 19, 'martes', '15:00:00', '15:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (690, 28, 19, 'jueves', '12:30:00', '13:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (693, 28, 19, 'martes', '13:00:00', '13:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (700, 28, 19, 'jueves', '13:30:00', '14:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (525, 9, 19, 'lunes', '10:00:00', '10:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (721, 28, 19, 'viernes', '15:30:00', '16:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (703, 28, 19, 'martes', '14:00:00', '14:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (635, 28, 19, 'miercoles', '07:00:00', '07:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (707, 28, 19, 'lunes', '14:30:00', '15:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (710, 28, 19, 'jueves', '14:30:00', '15:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (592, 20, 19, 'lunes', '12:00:00', '12:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (714, 28, 19, 'miercoles', '15:00:00', '15:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (637, 28, 19, 'jueves', '07:30:00', '08:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (642, 28, 19, 'lunes', '08:00:00', '08:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (645, 28, 19, 'jueves', '08:00:00', '08:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (720, 28, 19, 'jueves', '15:30:00', '16:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (549, 9, 19, 'viernes', '12:00:00', '12:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (550, 13, 19, 'lunes', '07:00:00', '07:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (601, 20, 19, 'viernes', '12:30:00', '13:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (552, 13, 19, 'lunes', '10:00:00', '10:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (553, 13, 19, 'lunes', '13:00:00', '13:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (609, 20, 19, 'miercoles', '13:30:00', '14:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (565, 13, 19, 'viernes', '13:30:00', '14:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (478, 8, 19, 'viernes', '07:30:00', '08:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (484, 8, 19, 'viernes', '08:00:00', '08:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (664, 28, 19, 'miercoles', '10:00:00', '10:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (658, 28, 19, 'martes', '09:30:00', '10:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (510, 9, 19, 'lunes', '08:30:00', '09:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (667, 28, 19, 'lunes', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (470, 8, 19, 'lunes', '07:00:00', '07:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (523, 9, 19, 'jueves', '09:30:00', '10:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (370, 10, 52, 'lunes', '07:00:00', '07:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (132, 7, 18, 'miercoles', '07:00:00', '07:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (131, 7, 18, 'martes', '07:00:00', '07:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (134, 7, 18, 'martes', '07:30:00', '08:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (133, 7, 18, 'lunes', '07:00:00', '07:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (533, 9, 19, 'jueves', '10:30:00', '11:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (651, 28, 19, 'viernes', '08:30:00', '09:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (537, 9, 19, 'miercoles', '11:00:00', '11:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (671, 28, 19, 'viernes', '10:30:00', '11:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (542, 9, 19, 'miercoles', '11:30:00', '12:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (612, 20, 19, 'lunes', '14:00:00', '14:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (509, 8, 19, 'viernes', '10:30:00', '11:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (686, 28, 19, 'viernes', '12:00:00', '12:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (679, 28, 19, 'miercoles', '11:30:00', '12:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (672, 28, 19, 'lunes', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (677, 28, 19, 'lunes', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (683, 28, 19, 'martes', '12:00:00', '12:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (574, 13, 19, 'jueves', '14:30:00', '15:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (624, 20, 19, 'martes', '15:00:00', '15:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (141, 7, 18, 'lunes', '08:00:00', '08:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (146, 7, 18, 'lunes', '08:30:00', '09:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (245, 13, 18, 'lunes', '13:30:00', '14:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (259, 13, 18, 'lunes', '15:30:00', '16:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (263, 13, 18, 'viernes', '15:30:00', '16:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (371, 10, 52, 'martes', '07:00:00', '07:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (378, 10, 52, 'viernes', '07:30:00', '08:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (379, 10, 52, 'lunes', '07:30:00', '08:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (381, 10, 52, 'martes', '08:00:00', '08:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (142, 7, 18, 'martes', '08:00:00', '08:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (384, 10, 52, 'viernes', '08:00:00', '08:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (136, 7, 18, 'jueves', '07:00:00', '07:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (250, 13, 18, 'martes', '14:30:00', '15:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (389, 10, 52, 'viernes', '08:30:00', '09:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (144, 7, 18, 'jueves', '08:00:00', '08:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (393, 10, 52, 'jueves', '09:00:00', '09:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (149, 7, 18, 'jueves', '08:30:00', '09:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (137, 7, 18, 'lunes', '07:30:00', '08:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (216, 8, 18, 'lunes', '10:00:00', '10:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (222, 8, 18, 'lunes', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (223, 8, 18, 'jueves', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (226, 8, 18, 'martes', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (227, 8, 18, 'miercoles', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (272, 8, 18, 'jueves', '09:00:00', '09:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (234, 8, 18, 'viernes', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (277, 18, 18, 'jueves', '12:30:00', '13:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (280, 18, 18, 'miercoles', '13:00:00', '13:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (287, 18, 18, 'viernes', '13:30:00', '14:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (289, 18, 18, 'martes', '14:00:00', '14:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (294, 18, 18, 'martes', '14:30:00', '15:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (297, 18, 18, 'viernes', '14:30:00', '15:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (299, 18, 18, 'martes', '15:00:00', '15:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (302, 18, 18, 'viernes', '15:00:00', '15:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (306, 18, 18, 'jueves', '15:30:00', '16:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (322, 7, 52, 'miercoles', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (350, 2, 52, 'lunes', '13:00:00', '13:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (355, 2, 52, 'lunes', '13:30:00', '14:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (360, 2, 52, 'lunes', '14:00:00', '14:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (339, 2, 52, 'viernes', '11:00:00', '11:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (344, 2, 52, 'viernes', '12:00:00', '12:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (314, 7, 52, 'miercoles', '10:30:00', '11:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (364, 2, 52, 'viernes', '14:00:00', '14:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (369, 2, 52, 'viernes', '14:30:00', '15:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (333, 2, 52, 'miercoles', '11:30:00', '12:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (342, 2, 52, 'miercoles', '12:00:00', '12:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (347, 2, 52, 'miercoles', '12:30:00', '13:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (311, 7, 52, 'martes', '10:00:00', '10:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (331, 2, 52, 'martes', '11:30:00', '12:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (330, 2, 52, 'lunes', '11:00:00', '11:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (319, 7, 52, 'lunes', '11:00:00', '11:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (335, 2, 52, 'jueves', '11:30:00', '12:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (353, 2, 52, 'jueves', '13:00:00', '13:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (357, 2, 52, 'jueves', '13:30:00', '14:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (363, 2, 52, 'jueves', '14:00:00', '14:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (368, 2, 52, 'jueves', '14:30:00', '15:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (396, 10, 52, 'martes', '09:30:00', '10:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (397, 10, 52, 'miercoles', '09:30:00', '10:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (401, 10, 52, 'martes', '10:00:00', '10:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (402, 10, 52, 'miercoles', '10:00:00', '10:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (404, 10, 52, 'viernes', '10:00:00', '10:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (407, 10, 52, 'miercoles', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (409, 10, 52, 'viernes', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (412, 10, 52, 'miercoles', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (414, 10, 52, 'viernes', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (416, 10, 52, 'martes', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (419, 10, 52, 'viernes', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (435, 7, 19, 'lunes', '08:30:00', '09:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (448, 7, 19, 'jueves', '09:30:00', '10:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (453, 7, 19, 'jueves', '10:00:00', '10:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (458, 7, 19, 'jueves', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (462, 7, 19, 'miercoles', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (466, 7, 19, 'martes', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (472, 8, 19, 'martes', '07:00:00', '07:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (528, 9, 19, 'jueves', '10:00:00', '10:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (489, 8, 19, 'viernes', '08:30:00', '09:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (486, 8, 19, 'martes', '08:30:00', '09:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (422, 7, 19, 'martes', '07:00:00', '07:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (496, 8, 19, 'martes', '09:30:00', '10:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (584, 13, 19, 'jueves', '15:30:00', '16:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (539, 9, 19, 'viernes', '11:00:00', '11:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (511, 9, 19, 'martes', '08:30:00', '09:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (558, 13, 19, 'miercoles', '13:00:00', '13:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (520, 9, 19, 'martes', '09:30:00', '10:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (482, 8, 19, 'miercoles', '08:00:00', '08:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (507, 8, 19, 'miercoles', '10:30:00', '11:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (554, 13, 19, 'martes', '13:00:00', '13:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (572, 13, 19, 'martes', '14:30:00', '15:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (500, 8, 19, 'lunes', '10:00:00', '10:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (587, 20, 19, 'lunes', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (517, 9, 19, 'viernes', '09:00:00', '09:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (504, 8, 19, 'viernes', '10:00:00', '10:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (479, 8, 19, 'lunes', '08:00:00', '08:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (532, 9, 19, 'miercoles', '10:30:00', '11:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (548, 9, 19, 'jueves', '12:00:00', '12:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (493, 8, 19, 'jueves', '09:00:00', '09:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (235, 13, 18, 'lunes', '13:00:00', '13:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (239, 13, 18, 'jueves', '13:30:00', '14:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (247, 13, 18, 'jueves', '14:00:00', '14:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (252, 13, 18, 'jueves', '14:30:00', '15:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (135, 7, 18, 'viernes', '07:00:00', '07:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (372, 10, 52, 'miercoles', '07:00:00', '07:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (375, 10, 52, 'miercoles', '07:30:00', '08:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (385, 10, 52, 'lunes', '08:30:00', '09:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (264, 13, 18, 'miercoles', '13:00:00', '13:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (238, 13, 18, 'miercoles', '13:30:00', '14:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (388, 10, 52, 'jueves', '08:30:00', '09:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (256, 13, 18, 'miercoles', '15:00:00', '15:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (236, 13, 18, 'martes', '13:30:00', '14:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (243, 13, 18, 'martes', '14:00:00', '14:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (139, 7, 18, 'jueves', '07:30:00', '08:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (215, 8, 18, 'martes', '10:00:00', '10:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (221, 8, 18, 'miercoles', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (229, 8, 18, 'viernes', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (273, 8, 18, 'viernes', '09:00:00', '09:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (231, 8, 18, 'martes', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (279, 18, 18, 'viernes', '12:30:00', '13:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (281, 18, 18, 'jueves', '13:00:00', '13:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (286, 18, 18, 'jueves', '13:30:00', '14:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (288, 18, 18, 'lunes', '14:00:00', '14:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (301, 18, 18, 'jueves', '15:00:00', '15:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (304, 18, 18, 'martes', '15:30:00', '16:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (336, 2, 52, 'viernes', '11:30:00', '12:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (317, 7, 52, 'viernes', '10:30:00', '11:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (312, 7, 52, 'miercoles', '10:00:00', '10:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (359, 2, 52, 'viernes', '13:30:00', '14:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (362, 2, 52, 'miercoles', '14:00:00', '14:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (332, 2, 52, 'martes', '11:00:00', '11:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (321, 7, 52, 'martes', '11:00:00', '11:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (340, 2, 52, 'lunes', '12:00:00', '12:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (392, 10, 52, 'miercoles', '09:00:00', '09:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (400, 10, 52, 'lunes', '10:00:00', '10:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (405, 10, 52, 'lunes', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (408, 10, 52, 'jueves', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (413, 10, 52, 'jueves', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (629, 20, 19, 'miercoles', '15:30:00', '16:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (596, 20, 19, 'viernes', '12:00:00', '12:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (555, 13, 19, 'lunes', '09:00:00', '09:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (611, 20, 19, 'viernes', '13:30:00', '14:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (616, 20, 19, 'viernes', '14:00:00', '14:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (621, 20, 19, 'viernes', '14:30:00', '15:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (626, 20, 19, 'viernes', '15:00:00', '15:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (446, 7, 19, 'martes', '09:30:00', '10:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (599, 20, 19, 'miercoles', '12:30:00', '13:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (567, 13, 19, 'martes', '14:00:00', '14:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (424, 7, 19, 'miercoles', '07:00:00', '07:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (442, 7, 19, 'miercoles', '09:00:00', '09:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (449, 7, 19, 'viernes', '09:30:00', '10:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (454, 7, 19, 'viernes', '10:00:00', '10:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (459, 7, 19, 'viernes', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (464, 7, 19, 'viernes', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (469, 7, 19, 'viernes', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (512, 9, 19, 'miercoles', '08:30:00', '09:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (473, 8, 19, 'miercoles', '07:00:00', '07:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (573, 13, 19, 'miercoles', '14:30:00', '15:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (578, 13, 19, 'miercoles', '15:00:00', '15:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (564, 13, 19, 'jueves', '13:30:00', '14:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (638, 28, 19, 'jueves', '07:00:00', '07:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (643, 28, 19, 'martes', '08:00:00', '08:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (647, 28, 19, 'lunes', '08:30:00', '09:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (588, 20, 19, 'martes', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (650, 28, 19, 'jueves', '08:30:00', '09:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (673, 28, 19, 'martes', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (718, 28, 19, 'martes', '15:30:00', '16:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (593, 20, 19, 'martes', '12:00:00', '12:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (519, 9, 19, 'lunes', '09:30:00', '10:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (516, 9, 19, 'jueves', '09:00:00', '09:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (476, 8, 19, 'jueves', '07:30:00', '08:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (608, 20, 19, 'lunes', '13:30:00', '14:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (580, 13, 19, 'viernes', '15:00:00', '15:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (585, 13, 19, 'viernes', '15:30:00', '16:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (590, 20, 19, 'jueves', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (242, 13, 18, 'lunes', '14:00:00', '14:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (257, 13, 18, 'jueves', '15:00:00', '15:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (240, 13, 18, 'viernes', '13:30:00', '14:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (248, 13, 18, 'viernes', '14:00:00', '14:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (138, 7, 18, 'miercoles', '07:30:00', '08:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (373, 10, 52, 'martes', '07:30:00', '08:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (376, 10, 52, 'jueves', '07:30:00', '08:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (251, 13, 18, 'miercoles', '14:30:00', '15:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (237, 13, 18, 'martes', '13:00:00', '13:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (261, 13, 18, 'miercoles', '15:30:00', '16:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (380, 10, 52, 'lunes', '08:00:00', '08:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (403, 10, 52, 'jueves', '10:00:00', '10:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (265, 8, 18, 'lunes', '09:00:00', '09:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (266, 8, 18, 'martes', '09:30:00', '10:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (267, 8, 18, 'miercoles', '09:30:00', '10:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (268, 8, 18, 'jueves', '09:30:00', '10:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (269, 8, 18, 'viernes', '09:30:00', '10:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (217, 8, 18, 'miercoles', '10:00:00', '10:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (220, 8, 18, 'martes', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (230, 8, 18, 'lunes', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (274, 8, 18, 'lunes', '09:30:00', '10:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (233, 8, 18, 'jueves', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (308, 18, 18, 'martes', '12:30:00', '13:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (365, 2, 52, 'lunes', '14:30:00', '15:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (334, 2, 52, 'miercoles', '11:00:00', '11:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (358, 2, 52, 'miercoles', '13:30:00', '14:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (367, 2, 52, 'miercoles', '14:30:00', '15:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (346, 2, 52, 'martes', '12:30:00', '13:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (315, 7, 52, 'jueves', '10:00:00', '10:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (351, 2, 52, 'martes', '13:00:00', '13:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (325, 7, 52, 'lunes', '11:30:00', '12:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (343, 2, 52, 'jueves', '12:00:00', '12:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (406, 10, 52, 'martes', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (410, 10, 52, 'lunes', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (425, 7, 19, 'jueves', '07:00:00', '07:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (674, 28, 19, 'miercoles', '11:00:00', '11:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (665, 28, 19, 'jueves', '10:00:00', '10:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (668, 28, 19, 'martes', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (524, 9, 19, 'viernes', '09:30:00', '10:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (437, 7, 19, 'miercoles', '08:30:00', '09:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (434, 7, 19, 'viernes', '08:00:00', '08:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (678, 28, 19, 'martes', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (568, 13, 19, 'miercoles', '14:00:00', '14:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (541, 9, 19, 'martes', '11:30:00', '12:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (583, 13, 19, 'miercoles', '15:30:00', '16:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (561, 13, 19, 'martes', '13:30:00', '14:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (627, 20, 19, 'lunes', '15:30:00', '16:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (688, 28, 19, 'martes', '12:30:00', '13:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (556, 13, 19, 'lunes', '09:30:00', '10:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (589, 20, 19, 'miercoles', '11:30:00', '12:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (594, 20, 19, 'miercoles', '12:00:00', '12:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (571, 13, 19, 'lunes', '14:30:00', '15:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (576, 13, 19, 'lunes', '15:00:00', '15:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (614, 20, 19, 'miercoles', '14:00:00', '14:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (619, 20, 19, 'miercoles', '14:30:00', '15:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (499, 8, 19, 'viernes', '09:30:00', '10:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (475, 8, 19, 'jueves', '07:00:00', '07:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (600, 20, 19, 'jueves', '12:30:00', '13:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (521, 9, 19, 'miercoles', '09:30:00', '10:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (695, 28, 19, 'jueves', '13:00:00', '13:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (698, 28, 19, 'martes', '13:30:00', '14:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (702, 28, 19, 'lunes', '14:00:00', '14:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (508, 8, 19, 'jueves', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (538, 9, 19, 'jueves', '11:00:00', '11:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (705, 28, 19, 'jueves', '14:00:00', '14:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (514, 9, 19, 'viernes', '08:30:00', '09:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (712, 28, 19, 'lunes', '15:00:00', '15:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (622, 20, 19, 'lunes', '15:00:00', '15:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (715, 28, 19, 'jueves', '15:00:00', '15:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (719, 28, 19, 'miercoles', '15:30:00', '16:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (639, 28, 19, 'viernes', '07:00:00', '07:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (598, 20, 19, 'martes', '12:30:00', '13:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (603, 20, 19, 'martes', '13:00:00', '13:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (648, 28, 19, 'martes', '08:30:00', '09:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (661, 28, 19, 'viernes', '09:30:00', '10:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (545, 9, 19, 'lunes', '12:00:00', '12:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (503, 8, 19, 'jueves', '10:00:00', '10:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (681, 28, 19, 'viernes', '11:30:00', '12:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (691, 28, 19, 'viernes', '12:30:00', '13:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (654, 28, 19, 'miercoles', '09:00:00', '09:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (606, 20, 19, 'martes', '13:30:00', '14:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (579, 13, 19, 'jueves', '15:00:00', '15:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (613, 20, 19, 'martes', '14:00:00', '14:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (433, 7, 19, 'jueves', '08:00:00', '08:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (440, 7, 19, 'lunes', '09:00:00', '09:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (443, 7, 19, 'jueves', '09:00:00', '09:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (452, 7, 19, 'miercoles', '10:00:00', '10:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (456, 7, 19, 'martes', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (460, 7, 19, 'lunes', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (465, 7, 19, 'lunes', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (241, 13, 18, 'jueves', '13:00:00', '13:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (254, 13, 18, 'lunes', '15:00:00', '15:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (260, 13, 18, 'martes', '15:30:00', '16:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (140, 7, 18, 'viernes', '07:30:00', '08:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (145, 7, 18, 'viernes', '08:00:00', '08:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (696, 28, 19, 'viernes', '13:00:00', '13:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (150, 7, 18, 'viernes', '08:30:00', '09:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (258, 13, 18, 'viernes', '15:00:00', '15:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (143, 7, 18, 'miercoles', '08:00:00', '08:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (148, 7, 18, 'miercoles', '08:30:00', '09:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (374, 10, 52, 'jueves', '07:00:00', '07:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (382, 10, 52, 'miercoles', '08:00:00', '08:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (246, 13, 18, 'miercoles', '14:00:00', '14:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (426, 7, 19, 'lunes', '07:30:00', '08:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (147, 7, 18, 'martes', '08:30:00', '09:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (387, 10, 52, 'miercoles', '08:30:00', '09:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (390, 10, 52, 'lunes', '09:00:00', '09:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (218, 8, 18, 'jueves', '10:00:00', '10:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (224, 8, 18, 'viernes', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (270, 8, 18, 'martes', '09:00:00', '09:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (228, 8, 18, 'jueves', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (232, 8, 18, 'miercoles', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (275, 18, 18, 'lunes', '12:30:00', '13:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (278, 18, 18, 'martes', '13:00:00', '13:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (581, 13, 19, 'lunes', '15:30:00', '16:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (283, 18, 18, 'lunes', '13:30:00', '14:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (285, 18, 18, 'miercoles', '13:30:00', '14:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (290, 18, 18, 'miercoles', '14:00:00', '14:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (292, 18, 18, 'viernes', '14:00:00', '14:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (634, 28, 19, 'martes', '07:30:00', '08:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (657, 28, 19, 'lunes', '09:30:00', '10:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (649, 28, 19, 'miercoles', '08:30:00', '09:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (669, 28, 19, 'miercoles', '10:30:00', '11:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (526, 9, 19, 'martes', '10:00:00', '10:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (531, 9, 19, 'martes', '10:30:00', '11:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (536, 9, 19, 'martes', '11:00:00', '11:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (569, 13, 19, 'jueves', '14:00:00', '14:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (625, 20, 19, 'jueves', '15:00:00', '15:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (641, 28, 19, 'lunes', '07:30:00', '08:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (557, 13, 19, 'lunes', '08:30:00', '09:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (607, 20, 19, 'viernes', '13:00:00', '13:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (604, 20, 19, 'miercoles', '13:00:00', '13:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (295, 18, 18, 'miercoles', '14:30:00', '15:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (298, 18, 18, 'lunes', '15:00:00', '15:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (303, 18, 18, 'lunes', '15:30:00', '16:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (305, 18, 18, 'miercoles', '15:30:00', '16:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (309, 18, 18, 'lunes', '13:00:00', '13:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (560, 13, 19, 'viernes', '13:00:00', '13:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (570, 13, 19, 'viernes', '14:00:00', '14:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (477, 8, 19, 'viernes', '07:00:00', '07:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (361, 2, 52, 'martes', '14:00:00', '14:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (366, 2, 52, 'martes', '14:30:00', '15:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (318, 7, 52, 'viernes', '10:00:00', '10:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (349, 2, 52, 'viernes', '12:30:00', '13:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (354, 2, 52, 'viernes', '13:00:00', '13:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (341, 2, 52, 'martes', '12:00:00', '12:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (323, 7, 52, 'jueves', '11:00:00', '11:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (328, 7, 52, 'jueves', '11:30:00', '12:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (345, 2, 52, 'lunes', '12:30:00', '13:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (337, 2, 52, 'jueves', '11:00:00', '11:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (394, 10, 52, 'viernes', '09:00:00', '09:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (398, 10, 52, 'jueves', '09:30:00', '10:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (415, 10, 52, 'lunes', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (418, 10, 52, 'jueves', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (518, 9, 19, 'jueves', '08:30:00', '09:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (630, 20, 19, 'jueves', '15:30:00', '16:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (617, 20, 19, 'lunes', '14:30:00', '15:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (492, 8, 19, 'miercoles', '09:00:00', '09:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (485, 8, 19, 'lunes', '08:30:00', '09:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (656, 28, 19, 'viernes', '09:00:00', '09:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (540, 9, 19, 'lunes', '11:30:00', '12:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (660, 28, 19, 'jueves', '09:30:00', '10:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (663, 28, 19, 'martes', '10:00:00', '10:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (495, 8, 19, 'lunes', '09:30:00', '10:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (652, 28, 19, 'lunes', '09:00:00', '09:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (670, 28, 19, 'jueves', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (675, 28, 19, 'jueves', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (653, 28, 19, 'martes', '09:00:00', '09:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (488, 8, 19, 'jueves', '08:30:00', '09:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (632, 28, 19, 'lunes', '07:00:00', '07:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (689, 28, 19, 'miercoles', '12:30:00', '13:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (682, 28, 19, 'lunes', '12:00:00', '12:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (685, 28, 19, 'jueves', '12:00:00', '12:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (692, 28, 19, 'lunes', '13:00:00', '13:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (597, 20, 19, 'lunes', '12:30:00', '13:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (699, 28, 19, 'miercoles', '13:30:00', '14:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (640, 28, 19, 'viernes', '07:30:00', '08:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (709, 28, 19, 'miercoles', '14:30:00', '15:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (713, 28, 19, 'martes', '15:00:00', '15:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (646, 28, 19, 'viernes', '08:00:00', '08:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (706, 28, 19, 'viernes', '14:00:00', '14:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (716, 28, 19, 'viernes', '15:00:00', '15:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (644, 28, 19, 'miercoles', '08:00:00', '08:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (527, 9, 19, 'miercoles', '10:00:00', '10:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (666, 28, 19, 'viernes', '10:00:00', '10:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (544, 9, 19, 'viernes', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (438, 7, 19, 'jueves', '08:30:00', '09:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (445, 7, 19, 'lunes', '09:30:00', '10:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (450, 7, 19, 'lunes', '10:00:00', '10:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (457, 7, 19, 'miercoles', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (461, 7, 19, 'martes', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (468, 7, 19, 'jueves', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (591, 20, 19, 'viernes', '11:30:00', '12:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (586, 13, 19, 'lunes', '07:30:00', '08:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (431, 7, 19, 'martes', '08:00:00', '08:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (436, 7, 19, 'martes', '08:30:00', '09:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (249, 13, 18, 'lunes', '14:30:00', '15:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (255, 13, 18, 'martes', '15:00:00', '15:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (262, 13, 18, 'jueves', '15:30:00', '16:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (244, 13, 18, 'viernes', '13:00:00', '13:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (253, 13, 18, 'viernes', '14:30:00', '15:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (377, 10, 52, 'viernes', '07:00:00', '07:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (383, 10, 52, 'jueves', '08:00:00', '08:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (219, 8, 18, 'viernes', '10:00:00', '10:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (225, 8, 18, 'lunes', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (271, 8, 18, 'miercoles', '09:00:00', '09:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (276, 18, 18, 'miercoles', '12:30:00', '13:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (282, 18, 18, 'viernes', '13:00:00', '13:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (284, 18, 18, 'martes', '13:30:00', '14:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (291, 18, 18, 'jueves', '14:00:00', '14:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (293, 18, 18, 'lunes', '14:30:00', '15:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (296, 18, 18, 'jueves', '14:30:00', '15:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (300, 18, 18, 'miercoles', '15:00:00', '15:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (307, 18, 18, 'viernes', '15:30:00', '16:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (324, 7, 52, 'viernes', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (327, 7, 52, 'miercoles', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (329, 7, 52, 'viernes', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (352, 2, 52, 'miercoles', '13:00:00', '13:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (313, 7, 52, 'martes', '10:30:00', '11:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (326, 7, 52, 'martes', '11:30:00', '12:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (356, 2, 52, 'martes', '13:30:00', '14:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (551, 13, 19, 'lunes', '08:00:00', '08:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (429, 7, 19, 'viernes', '07:00:00', '07:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (562, 13, 19, 'lunes', '13:30:00', '14:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (566, 13, 19, 'lunes', '14:00:00', '14:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (708, 28, 19, 'martes', '14:30:00', '15:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (684, 28, 19, 'miercoles', '12:00:00', '12:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (615, 20, 19, 'jueves', '14:00:00', '14:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (316, 7, 52, 'jueves', '10:30:00', '11:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (310, 7, 52, 'lunes', '10:00:00', '10:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (338, 2, 52, 'lunes', '11:30:00', '12:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (320, 7, 52, 'lunes', '10:30:00', '11:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (348, 2, 52, 'jueves', '12:30:00', '13:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (386, 10, 52, 'martes', '08:30:00', '09:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (391, 10, 52, 'martes', '09:00:00', '09:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (395, 10, 52, 'lunes', '09:30:00', '10:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (399, 10, 52, 'viernes', '09:30:00', '10:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (411, 10, 52, 'martes', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (631, 20, 19, 'viernes', '15:30:00', '16:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (575, 13, 19, 'viernes', '14:30:00', '15:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (623, 20, 19, 'miercoles', '15:00:00', '15:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (494, 8, 19, 'viernes', '09:00:00', '09:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (655, 28, 19, 'jueves', '09:00:00', '09:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (417, 10, 52, 'miercoles', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (534, 9, 19, 'viernes', '10:30:00', '11:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (501, 8, 19, 'martes', '10:00:00', '10:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (506, 8, 19, 'martes', '10:30:00', '11:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (676, 28, 19, 'viernes', '11:00:00', '11:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (543, 9, 19, 'jueves', '11:30:00', '12:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (602, 20, 19, 'lunes', '13:00:00', '13:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (701, 28, 19, 'viernes', '13:30:00', '14:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (717, 28, 19, 'lunes', '15:30:00', '16:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (522, 9, 19, 'lunes', '09:00:00', '09:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (480, 8, 19, 'lunes', '07:30:00', '08:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (680, 28, 19, 'jueves', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (535, 9, 19, 'lunes', '11:00:00', '11:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (662, 28, 19, 'lunes', '10:00:00', '10:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (605, 20, 19, 'jueves', '13:00:00', '13:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (490, 8, 19, 'lunes', '09:00:00', '09:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (687, 28, 19, 'lunes', '12:30:00', '13:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (694, 28, 19, 'miercoles', '13:00:00', '13:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (498, 8, 19, 'jueves', '09:30:00', '10:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (547, 9, 19, 'miercoles', '12:00:00', '12:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (483, 8, 19, 'jueves', '08:00:00', '08:30:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (610, 20, 19, 'jueves', '13:30:00', '14:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (487, 8, 19, 'miercoles', '08:30:00', '09:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (697, 28, 19, 'lunes', '13:30:00', '14:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (530, 9, 19, 'lunes', '10:30:00', '11:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (633, 28, 19, 'martes', '07:00:00', '07:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (704, 28, 19, 'miercoles', '14:00:00', '14:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (711, 28, 19, 'viernes', '14:30:00', '15:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (636, 28, 19, 'miercoles', '07:30:00', '08:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (659, 28, 19, 'miercoles', '09:30:00', '10:00:00', false);
INSERT INTO public.profesores_disponibilidad VALUES (595, 20, 19, 'jueves', '12:00:00', '12:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (618, 20, 19, 'martes', '14:30:00', '15:00:00', true);


--
-- TOC entry 5114 (class 0 OID 17532)
-- Dependencies: 255
-- Data for Name: profesores_materias; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.profesores_materias VALUES (98, 7, 136);
INSERT INTO public.profesores_materias VALUES (99, 7, 140);
INSERT INTO public.profesores_materias VALUES (100, 7, 135);
INSERT INTO public.profesores_materias VALUES (101, 7, 134);
INSERT INTO public.profesores_materias VALUES (102, 8, 138);
INSERT INTO public.profesores_materias VALUES (103, 8, 137);
INSERT INTO public.profesores_materias VALUES (104, 8, 139);
INSERT INTO public.profesores_materias VALUES (105, 9, 136);
INSERT INTO public.profesores_materias VALUES (106, 9, 140);
INSERT INTO public.profesores_materias VALUES (107, 9, 138);
INSERT INTO public.profesores_materias VALUES (108, 9, 137);
INSERT INTO public.profesores_materias VALUES (109, 13, 136);
INSERT INTO public.profesores_materias VALUES (110, 13, 140);
INSERT INTO public.profesores_materias VALUES (111, 13, 135);
INSERT INTO public.profesores_materias VALUES (112, 13, 134);
INSERT INTO public.profesores_materias VALUES (113, 13, 138);
INSERT INTO public.profesores_materias VALUES (114, 13, 137);
INSERT INTO public.profesores_materias VALUES (115, 13, 139);
INSERT INTO public.profesores_materias VALUES (116, 20, 136);
INSERT INTO public.profesores_materias VALUES (117, 20, 140);
INSERT INTO public.profesores_materias VALUES (118, 20, 135);
INSERT INTO public.profesores_materias VALUES (119, 20, 134);
INSERT INTO public.profesores_materias VALUES (120, 20, 138);
INSERT INTO public.profesores_materias VALUES (121, 20, 137);
INSERT INTO public.profesores_materias VALUES (122, 20, 139);
INSERT INTO public.profesores_materias VALUES (132, 28, 147);


--
-- TOC entry 5112 (class 0 OID 17506)
-- Dependencies: 253
-- Data for Name: requisitos; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5106 (class 0 OID 17444)
-- Dependencies: 247
-- Data for Name: salones_disponibilidad; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.salones_disponibilidad VALUES (15, 8, 13, 'miércoles', '14:00:00', '14:30:00', true);
INSERT INTO public.salones_disponibilidad VALUES (16, 8, 14, 'miércoles', '14:30:00', '15:00:00', true);
INSERT INTO public.salones_disponibilidad VALUES (17, 9, 15, 'jueves', '07:00:00', '07:30:00', true);
INSERT INTO public.salones_disponibilidad VALUES (18, 9, 16, 'jueves', '07:30:00', '08:00:00', true);
INSERT INTO public.salones_disponibilidad VALUES (19, 10, 17, 'viernes', '08:00:00', '08:30:00', true);
INSERT INTO public.salones_disponibilidad VALUES (20, 10, 18, 'viernes', '08:30:00', '09:00:00', true);
INSERT INTO public.salones_disponibilidad VALUES (21, 1, 19, 'lunes', '09:00:00', '09:30:00', true);


--
-- TOC entry 5110 (class 0 OID 17482)
-- Dependencies: 251
-- Data for Name: solicitudes_cambio; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.solicitudes_cambio VALUES (1, 'IVD87493', 13, 1, 'cambio', 'Cambio solicitado por incompatibilidad de horario.', NULL, '2024-02-10', '2024-02-12', true, true);
INSERT INTO public.solicitudes_cambio VALUES (15, 'IVD87507', 19, 15, 'agregar', 'El alumno desea cambiar a una materia más avanzada.', NULL, '2024-02-24', NULL, NULL, false);


--
-- TOC entry 5120 (class 0 OID 0)
-- Dependencies: 222
-- Name: carreras_id_carrera_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carreras_id_carrera_seq', 10, true);


--
-- TOC entry 5121 (class 0 OID 0)
-- Dependencies: 224
-- Name: ciclos_escolares_id_ciclo_escolar_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ciclos_escolares_id_ciclo_escolar_seq', 70, true);


--
-- TOC entry 5122 (class 0 OID 0)
-- Dependencies: 232
-- Name: ciclos_escolares_materias_id_ciclo_escolar_materia_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ciclos_escolares_materias_id_ciclo_escolar_materia_seq', 147, true);


--
-- TOC entry 5123 (class 0 OID 0)
-- Dependencies: 248
-- Name: enlista_id_enlista_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.enlista_id_enlista_seq', 348, true);


--
-- TOC entry 5124 (class 0 OID 0)
-- Dependencies: 242
-- Name: grupos_ciclos_materias_id_grupo_ciclo_materia_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.grupos_ciclos_materias_id_grupo_ciclo_materia_seq', 143, true);


--
-- TOC entry 5125 (class 0 OID 0)
-- Dependencies: 240
-- Name: grupos_horarios_id_grupo_horario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.grupos_horarios_id_grupo_horario_seq', 132, true);


--
-- TOC entry 5126 (class 0 OID 0)
-- Dependencies: 238
-- Name: grupos_id_grupo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.grupos_id_grupo_seq', 145, true);


--
-- TOC entry 5127 (class 0 OID 0)
-- Dependencies: 226
-- Name: materias_id_materia_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.materias_id_materia_seq', 40, true);


--
-- TOC entry 5128 (class 0 OID 0)
-- Dependencies: 228
-- Name: planes_estudios_id_plan_estudio_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.planes_estudios_id_plan_estudio_seq', 7, true);


--
-- TOC entry 5129 (class 0 OID 0)
-- Dependencies: 230
-- Name: planes_materias_id_plan_materia_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.planes_materias_id_plan_materia_seq', 1, false);


--
-- TOC entry 5130 (class 0 OID 0)
-- Dependencies: 244
-- Name: profesores_disponibilidad_id_profesor_disponibilidad_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profesores_disponibilidad_id_profesor_disponibilidad_seq', 721, true);


--
-- TOC entry 5131 (class 0 OID 0)
-- Dependencies: 234
-- Name: profesores_id_profesor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profesores_id_profesor_seq', 35, true);


--
-- TOC entry 5132 (class 0 OID 0)
-- Dependencies: 254
-- Name: profesores_materias_id_profesor_materia_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profesores_materias_id_profesor_materia_seq', 132, true);


--
-- TOC entry 5133 (class 0 OID 0)
-- Dependencies: 252
-- Name: requisitos_id_requisito_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.requisitos_id_requisito_seq', 1, false);


--
-- TOC entry 5134 (class 0 OID 0)
-- Dependencies: 246
-- Name: salones_disponibilidad_id_salon_disponibilidad_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.salones_disponibilidad_id_salon_disponibilidad_seq', 1, false);


--
-- TOC entry 5135 (class 0 OID 0)
-- Dependencies: 236
-- Name: salones_id_salon_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.salones_id_salon_seq', 4, true);


--
-- TOC entry 5136 (class 0 OID 0)
-- Dependencies: 250
-- Name: solicitudes_cambio_id_solicitud_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.solicitudes_cambio_id_solicitud_seq', 19, true);


-- Completed on 2025-05-01 23:24:00

--
-- PostgreSQL database dump complete
--

