--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-04-15 23:52:18

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
-- TOC entry 5052 (class 0 OID 16945)
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
-- TOC entry 5049 (class 0 OID 16875)
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
-- TOC entry 5053 (class 0 OID 16980)
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
INSERT INTO public.usuarios VALUES ('300014', 'Bernardo Gomez Romero', '$2b$12$8KUcPIMZi0eUaJnra/fin.q8hu1U34De6zpmO8DSz52pF01tIfZwe', '300014@ivd.edu.mx', 'admin');
INSERT INTO public.usuarios VALUES ('300015', 'Samir Baidon null', '$2b$12$VNb9dJRNyDKwbx.vhwi9HeoiJSRfhbVM/A53JBXLArUnfXoxQxnVW', 'samirbaidonpardo@hotmail.com', 'admin');
INSERT INTO public.usuarios VALUES ('100001', 'Jorge Bins Dibbert', '$2b$12$ZC1SOwQ9ezMpvi76zYUwDeDmJkB7rDDasxfEgKZplLCPqFpbkRmZC', 'bernardogr95+ivd-test@gmail.com', 'student');
INSERT INTO public.usuarios VALUES ('100007', 'Halina Runte Ziemann', '$2b$12$4b8P22PBD4.tkASmEu2/necJbcLsRY0WSEaDNtk4A.synceHkxF2S', '100007@ivd.edu.mx', 'student');
INSERT INTO public.usuarios VALUES ('100023', 'Brad Nienow Crooks', '$2b$12$f3n4wCy1WuHWntsvh7MwKep3uXB7lliezAFa0PUlMRbeH9567r/ni', '100023@ivd.edu.mx', 'student');
INSERT INTO public.usuarios VALUES ('100123', 'Adrian Gomez Romero', '$2b$12$.DDh.jGaz0ydpxIr5tgNl.i1RNejf7WpGrgHCPj6M5/nG4cxUhk9C', 'adriangomezr95@gmail.com', 'student');


--
-- TOC entry 5050 (class 0 OID 16882)
-- Dependencies: 218
-- Data for Name: administradores; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.administradores VALUES ('IVD87510', 'active', 2);
INSERT INTO public.administradores VALUES ('IVD87512', 'active', 2);
INSERT INTO public.administradores VALUES ('300015', 'active', 2);
INSERT INTO public.administradores VALUES ('IVD87509', 'active', 1);
INSERT INTO public.administradores VALUES ('IVD87511', 'active', 1);
INSERT INTO public.administradores VALUES ('IVD87513', 'active', 1);
INSERT INTO public.administradores VALUES ('300014', 'active', 1);


--
-- TOC entry 5051 (class 0 OID 16889)
-- Dependencies: 219
-- Data for Name: alumnos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.alumnos VALUES ('IVD87494', '2', true, 'active', 2);
INSERT INTO public.alumnos VALUES ('IVD87496', '4', true, 'active', 2);
INSERT INTO public.alumnos VALUES ('IVD87498', '1', true, 'active', 2);
INSERT INTO public.alumnos VALUES ('IVD87500', '3', true, 'active', 2);
INSERT INTO public.alumnos VALUES ('IVD87502', '5', true, 'active', 2);
INSERT INTO public.alumnos VALUES ('IVD87504', '7', true, 'active', 2);
INSERT INTO public.alumnos VALUES ('IVD87506', '1', true, 'active', 2);
INSERT INTO public.alumnos VALUES ('100023', '2', true, 'active', 2);
INSERT INTO public.alumnos VALUES ('100123', '2', true, 'active', 2);
INSERT INTO public.alumnos VALUES ('IVD87493', '1', true, 'active', 1);
INSERT INTO public.alumnos VALUES ('IVD87495', '3', false, 'active', 1);
INSERT INTO public.alumnos VALUES ('IVD87497', '5', true, 'active', 1);
INSERT INTO public.alumnos VALUES ('IVD87499', '2', false, 'active', 1);
INSERT INTO public.alumnos VALUES ('IVD87501', '4', true, 'active', 1);
INSERT INTO public.alumnos VALUES ('IVD87503', '6', true, 'active', 1);
INSERT INTO public.alumnos VALUES ('IVD87505', '8', false, 'active', 1);
INSERT INTO public.alumnos VALUES ('IVD87507', '2', true, 'active', 1);
INSERT INTO public.alumnos VALUES ('100001', '2', false, 'active', 1);
INSERT INTO public.alumnos VALUES ('100007', '2', false, 'active', 1);


--
-- TOC entry 5055 (class 0 OID 17282)
-- Dependencies: 223
-- Data for Name: carreras; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.carreras VALUES (2, 'Diseno y Arquitectura de Interiores');
INSERT INTO public.carreras VALUES (1, 'Diseño de la Moda e Industria del Vestido');


--
-- TOC entry 5057 (class 0 OID 17291)
-- Dependencies: 225
-- Data for Name: ciclos_escolares; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ciclos_escolares VALUES (1, 'FebJun17', '2017-02-22', '2017-06-18', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (2, 'AgoDic17', '2017-08-19', '2017-12-17', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (3, 'FebJun18', '2018-02-21', '2018-06-16', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (4, 'AgoDic18', '2018-08-15', '2018-12-15', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (5, 'FebJun19', '2019-02-17', '2019-06-14', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (6, 'AgoDic19', '2019-08-10', '2019-12-10', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (7, 'FebJun20', '2020-02-20', '2020-06-11', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (8, 'AgoDic20', '2020-08-16', '2020-12-12', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (9, 'FebJun21', '2021-02-18', '2021-06-13', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (10, 'AgoDic21', '2021-08-19', '2021-12-14', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (11, 'FebJun22', '2022-02-15', '2022-06-15', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (12, 'AgoDic22', '2022-08-14', '2022-12-10', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (13, 'FebJun23', '2023-02-13', '2023-06-09', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (14, 'AgoDic23', '2023-08-11', '2023-12-08', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (15, 'FebJun24', '2024-02-10', '2024-06-07', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (16, 'AgoDic24', '2024-08-20', '2024-12-06', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (17, 'FebJun25', '2025-02-19', '2025-06-05', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (18, 'AgoDic25', '2025-08-21', '2025-12-04', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES (19, 'FebJun15', '2015-02-25', '2015-06-25', '2025-04-08', '2025-04-29');
INSERT INTO public.ciclos_escolares VALUES (20, 'AgoDic15', '2015-08-17', '2015-12-03', '2025-04-08', '2025-04-16');
INSERT INTO public.ciclos_escolares VALUES (21, 'FebJun16', '2016-02-19', '2016-06-20', '2000-12-31', '1999-12-02');
INSERT INTO public.ciclos_escolares VALUES (22, 'AgoDic16', '2016-08-18', '2016-12-19', '2025-04-10', '2025-04-28');


--
-- TOC entry 5059 (class 0 OID 17300)
-- Dependencies: 227
-- Data for Name: materias; Type: TABLE DATA; Schema: public; Owner: postgres
--

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


--
-- TOC entry 5061 (class 0 OID 17309)
-- Dependencies: 229
-- Data for Name: planes_estudios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.planes_estudios VALUES (1, 'Diseño de la Moda e Industria del Vestido 1', 1);
INSERT INTO public.planes_estudios VALUES (2, 'Diseño de la Moda e Industria del Vestido 2', 1);
INSERT INTO public.planes_estudios VALUES (3, 'Diseno y Arquitectura de Interiores 1', 2);


--
-- TOC entry 5063 (class 0 OID 17323)
-- Dependencies: 231
-- Data for Name: planes_materias; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.planes_materias VALUES (1, 1, 1, 1, 'active');
INSERT INTO public.planes_materias VALUES (2, 2, 2, 2, 'active');
INSERT INTO public.planes_materias VALUES (3, 3, 3, 3, 'active');
INSERT INTO public.planes_materias VALUES (4, 1, 4, 4, 'active');
INSERT INTO public.planes_materias VALUES (5, 2, 5, 5, 'active');
INSERT INTO public.planes_materias VALUES (6, 3, 6, 6, 'active');
INSERT INTO public.planes_materias VALUES (7, 1, 7, 7, 'active');
INSERT INTO public.planes_materias VALUES (8, 2, 8, 8, 'active');
INSERT INTO public.planes_materias VALUES (9, 3, 9, 1, 'active');
INSERT INTO public.planes_materias VALUES (10, 1, 10, 2, 'active');
INSERT INTO public.planes_materias VALUES (11, 2, 11, 3, 'active');
INSERT INTO public.planes_materias VALUES (12, 3, 12, 4, 'active');
INSERT INTO public.planes_materias VALUES (13, 1, 13, 5, 'active');
INSERT INTO public.planes_materias VALUES (14, 2, 14, 6, 'active');
INSERT INTO public.planes_materias VALUES (15, 3, 15, 7, 'active');
INSERT INTO public.planes_materias VALUES (16, 1, 16, 8, 'active');
INSERT INTO public.planes_materias VALUES (17, 2, 17, 1, 'active');
INSERT INTO public.planes_materias VALUES (18, 3, 18, 2, 'active');
INSERT INTO public.planes_materias VALUES (19, 1, 19, 3, 'active');
INSERT INTO public.planes_materias VALUES (20, 2, 20, 4, 'active');


--
-- TOC entry 5065 (class 0 OID 17342)
-- Dependencies: 233
-- Data for Name: ciclos_escolares_materias; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ciclos_escolares_materias VALUES (1, 1, 1);
INSERT INTO public.ciclos_escolares_materias VALUES (2, 1, 2);
INSERT INTO public.ciclos_escolares_materias VALUES (3, 2, 3);
INSERT INTO public.ciclos_escolares_materias VALUES (4, 2, 4);
INSERT INTO public.ciclos_escolares_materias VALUES (5, 3, 5);
INSERT INTO public.ciclos_escolares_materias VALUES (6, 3, 6);
INSERT INTO public.ciclos_escolares_materias VALUES (7, 4, 7);
INSERT INTO public.ciclos_escolares_materias VALUES (8, 4, 8);
INSERT INTO public.ciclos_escolares_materias VALUES (9, 5, 9);
INSERT INTO public.ciclos_escolares_materias VALUES (10, 5, 10);
INSERT INTO public.ciclos_escolares_materias VALUES (11, 6, 11);
INSERT INTO public.ciclos_escolares_materias VALUES (12, 6, 12);
INSERT INTO public.ciclos_escolares_materias VALUES (13, 7, 13);
INSERT INTO public.ciclos_escolares_materias VALUES (14, 7, 14);
INSERT INTO public.ciclos_escolares_materias VALUES (15, 8, 15);
INSERT INTO public.ciclos_escolares_materias VALUES (16, 8, 16);
INSERT INTO public.ciclos_escolares_materias VALUES (17, 9, 17);
INSERT INTO public.ciclos_escolares_materias VALUES (18, 9, 18);
INSERT INTO public.ciclos_escolares_materias VALUES (19, 10, 19);
INSERT INTO public.ciclos_escolares_materias VALUES (20, 10, 20);
INSERT INTO public.ciclos_escolares_materias VALUES (21, 11, 1);
INSERT INTO public.ciclos_escolares_materias VALUES (22, 12, 2);
INSERT INTO public.ciclos_escolares_materias VALUES (23, 13, 3);
INSERT INTO public.ciclos_escolares_materias VALUES (24, 14, 4);
INSERT INTO public.ciclos_escolares_materias VALUES (25, 15, 5);
INSERT INTO public.ciclos_escolares_materias VALUES (26, 16, 6);
INSERT INTO public.ciclos_escolares_materias VALUES (27, 17, 7);
INSERT INTO public.ciclos_escolares_materias VALUES (28, 18, 8);
INSERT INTO public.ciclos_escolares_materias VALUES (29, 19, 9);
INSERT INTO public.ciclos_escolares_materias VALUES (30, 20, 10);


--
-- TOC entry 5067 (class 0 OID 17359)
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
-- TOC entry 5069 (class 0 OID 17368)
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
-- TOC entry 5071 (class 0 OID 17377)
-- Dependencies: 239
-- Data for Name: grupos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.grupos VALUES (1, 1, 4, 18, 18);
INSERT INTO public.grupos VALUES (2, 2, 1, 15, 14);
INSERT INTO public.grupos VALUES (3, 3, 10, 22, 20);
INSERT INTO public.grupos VALUES (4, 4, 2, 20, 20);
INSERT INTO public.grupos VALUES (5, 5, 9, 18, 15);
INSERT INTO public.grupos VALUES (6, 6, 4, 18, 18);
INSERT INTO public.grupos VALUES (7, 5, 3, 22, 21);
INSERT INTO public.grupos VALUES (8, 2, 6, 20, 19);
INSERT INTO public.grupos VALUES (9, 4, 7, 35, 30);
INSERT INTO public.grupos VALUES (10, 1, 5, 15, 13);
INSERT INTO public.grupos VALUES (11, 3, 8, 12, 11);


--
-- TOC entry 5081 (class 0 OID 17463)
-- Dependencies: 249
-- Data for Name: enlista; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.enlista VALUES (1, 2, '100007');
INSERT INTO public.enlista VALUES (2, 9, '100007');
INSERT INTO public.enlista VALUES (3, 10, '100007');
INSERT INTO public.enlista VALUES (4, 3, '100007');


--
-- TOC entry 5075 (class 0 OID 17408)
-- Dependencies: 243
-- Data for Name: grupos_ciclos_materias; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.grupos_ciclos_materias VALUES (27, 5, 27);
INSERT INTO public.grupos_ciclos_materias VALUES (26, 4, 26);
INSERT INTO public.grupos_ciclos_materias VALUES (25, 3, 25);
INSERT INTO public.grupos_ciclos_materias VALUES (24, 2, 24);
INSERT INTO public.grupos_ciclos_materias VALUES (23, 1, 23);
INSERT INTO public.grupos_ciclos_materias VALUES (22, 11, 22);
INSERT INTO public.grupos_ciclos_materias VALUES (21, 10, 21);
INSERT INTO public.grupos_ciclos_materias VALUES (20, 9, 20);
INSERT INTO public.grupos_ciclos_materias VALUES (19, 8, 19);
INSERT INTO public.grupos_ciclos_materias VALUES (18, 7, 18);
INSERT INTO public.grupos_ciclos_materias VALUES (17, 6, 17);
INSERT INTO public.grupos_ciclos_materias VALUES (16, 5, 16);
INSERT INTO public.grupos_ciclos_materias VALUES (15, 4, 15);
INSERT INTO public.grupos_ciclos_materias VALUES (14, 3, 14);
INSERT INTO public.grupos_ciclos_materias VALUES (13, 2, 13);
INSERT INTO public.grupos_ciclos_materias VALUES (12, 1, 12);
INSERT INTO public.grupos_ciclos_materias VALUES (11, 11, 11);
INSERT INTO public.grupos_ciclos_materias VALUES (10, 10, 10);
INSERT INTO public.grupos_ciclos_materias VALUES (9, 9, 9);
INSERT INTO public.grupos_ciclos_materias VALUES (8, 8, 8);
INSERT INTO public.grupos_ciclos_materias VALUES (7, 7, 7);
INSERT INTO public.grupos_ciclos_materias VALUES (6, 6, 6);
INSERT INTO public.grupos_ciclos_materias VALUES (5, 5, 5);
INSERT INTO public.grupos_ciclos_materias VALUES (4, 4, 4);
INSERT INTO public.grupos_ciclos_materias VALUES (3, 3, 3);
INSERT INTO public.grupos_ciclos_materias VALUES (2, 2, 2);
INSERT INTO public.grupos_ciclos_materias VALUES (1, 1, 1);


--
-- TOC entry 5073 (class 0 OID 17394)
-- Dependencies: 241
-- Data for Name: grupos_horarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.grupos_horarios VALUES (1, 2, 'lunes', '07:00:00', '09:00:00');
INSERT INTO public.grupos_horarios VALUES (2, 9, 'martes', '09:00:00', '11:00:00');
INSERT INTO public.grupos_horarios VALUES (3, 10, 'miercoles', '07:30:00', '10:00:00');
INSERT INTO public.grupos_horarios VALUES (4, 3, 'miercoles', '13:00:00', '15:00:00');
INSERT INTO public.grupos_horarios VALUES (5, 2, 'lunes', '12:00:00', '14:00:00');
INSERT INTO public.grupos_horarios VALUES (6, 9, 'jueves', '09:00:00', '11:00:00');
INSERT INTO public.grupos_horarios VALUES (7, 1, 'lunes', '07:00:00', '09:00:00');
INSERT INTO public.grupos_horarios VALUES (8, 2, 'lunes', '09:00:00', '11:00:00');
INSERT INTO public.grupos_horarios VALUES (9, 3, 'martes', '07:30:00', '09:30:00');
INSERT INTO public.grupos_horarios VALUES (10, 4, 'martes', '10:00:00', '12:00:00');
INSERT INTO public.grupos_horarios VALUES (11, 5, 'miércoles', '08:00:00', '10:00:00');
INSERT INTO public.grupos_horarios VALUES (12, 6, 'miércoles', '11:00:00', '13:00:00');
INSERT INTO public.grupos_horarios VALUES (13, 7, 'jueves', '07:30:00', '10:00:00');
INSERT INTO public.grupos_horarios VALUES (14, 8, 'jueves', '12:00:00', '14:00:00');
INSERT INTO public.grupos_horarios VALUES (15, 9, 'viernes', '09:00:00', '11:00:00');
INSERT INTO public.grupos_horarios VALUES (16, 10, 'viernes', '13:00:00', '15:00:00');
INSERT INTO public.grupos_horarios VALUES (17, 11, 'lunes', '08:00:00', '10:00:00');
INSERT INTO public.grupos_horarios VALUES (18, 1, 'martes', '10:30:00', '12:30:00');
INSERT INTO public.grupos_horarios VALUES (19, 2, 'miércoles', '07:00:00', '09:00:00');
INSERT INTO public.grupos_horarios VALUES (20, 3, 'jueves', '09:00:00', '11:00:00');
INSERT INTO public.grupos_horarios VALUES (21, 4, 'viernes', '07:30:00', '10:00:00');
INSERT INTO public.grupos_horarios VALUES (22, 5, 'lunes', '12:00:00', '14:00:00');
INSERT INTO public.grupos_horarios VALUES (23, 6, 'martes', '08:00:00', '10:00:00');
INSERT INTO public.grupos_horarios VALUES (24, 7, 'miércoles', '13:00:00', '15:00:00');
INSERT INTO public.grupos_horarios VALUES (25, 8, 'jueves', '07:00:00', '09:00:00');
INSERT INTO public.grupos_horarios VALUES (26, 9, 'viernes', '11:00:00', '13:00:00');
INSERT INTO public.grupos_horarios VALUES (27, 10, 'lunes', '07:30:00', '09:30:00');
INSERT INTO public.grupos_horarios VALUES (28, 11, 'martes', '09:30:00', '11:30:00');
INSERT INTO public.grupos_horarios VALUES (29, 1, 'miércoles', '10:00:00', '12:00:00');
INSERT INTO public.grupos_horarios VALUES (30, 2, 'jueves', '13:00:00', '15:00:00');
INSERT INTO public.grupos_horarios VALUES (31, 3, 'viernes', '08:30:00', '10:30:00');
INSERT INTO public.grupos_horarios VALUES (32, 4, 'lunes', '10:00:00', '12:00:00');
INSERT INTO public.grupos_horarios VALUES (33, 5, 'martes', '07:00:00', '09:00:00');
INSERT INTO public.grupos_horarios VALUES (34, 6, 'miércoles', '12:00:00', '14:00:00');
INSERT INTO public.grupos_horarios VALUES (35, 7, 'jueves', '10:30:00', '12:30:00');
INSERT INTO public.grupos_horarios VALUES (36, 8, 'viernes', '13:00:00', '15:00:00');


--
-- TOC entry 5077 (class 0 OID 17425)
-- Dependencies: 245
-- Data for Name: profesores_disponibilidad; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.profesores_disponibilidad VALUES (1, 1, 1, 'lunes', '07:00:00', '07:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (2, 1, 1, 'lunes', '07:30:00', '08:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (3, 1, 1, 'lunes', '08:00:00', '08:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (4, 1, 2, 'martes', '09:00:00', '09:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (5, 1, 3, 'miércoles', '10:00:00', '10:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (6, 2, 3, 'jueves', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (7, 2, 4, 'jueves', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (8, 2, 5, 'viernes', '13:00:00', '13:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (9, 2, 6, 'viernes', '13:30:00', '14:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (10, 3, 7, 'lunes', '14:30:00', '15:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (11, 3, 8, 'martes', '07:00:00', '07:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (12, 3, 8, 'martes', '07:30:00', '08:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (13, 3, 9, 'miércoles', '08:00:00', '08:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (14, 3, 10, 'jueves', '08:30:00', '09:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (15, 3, 11, 'viernes', '09:00:00', '09:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (16, 4, 12, 'lunes', '09:30:00', '10:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (17, 4, 13, 'martes', '10:00:00', '10:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (18, 4, 14, 'miércoles', '10:30:00', '11:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (19, 4, 15, 'jueves', '11:00:00', '11:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (20, 4, 16, 'viernes', '11:30:00', '12:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (21, 5, 17, 'lunes', '12:00:00', '12:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (22, 5, 18, 'martes', '12:30:00', '13:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (23, 5, 19, 'miércoles', '13:00:00', '13:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (24, 5, 20, 'jueves', '13:30:00', '14:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (25, 5, 21, 'viernes', '14:00:00', '14:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (26, 6, 22, 'lunes', '14:30:00', '15:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (27, 6, 1, 'martes', '07:00:00', '07:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (28, 6, 2, 'miércoles', '07:30:00', '08:00:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (29, 6, 3, 'jueves', '08:00:00', '08:30:00', true);
INSERT INTO public.profesores_disponibilidad VALUES (30, 6, 4, 'viernes', '08:30:00', '09:00:00', true);


--
-- TOC entry 5085 (class 0 OID 17506)
-- Dependencies: 253
-- Data for Name: requisitos; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5079 (class 0 OID 17444)
-- Dependencies: 247
-- Data for Name: salones_disponibilidad; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.salones_disponibilidad VALUES (1, 1, 1, 'lunes', '07:00:00', '07:30:00', true);
INSERT INTO public.salones_disponibilidad VALUES (2, 1, 1, 'lunes', '07:30:00', '08:00:00', true);
INSERT INTO public.salones_disponibilidad VALUES (3, 2, 2, 'martes', '08:00:00', '08:30:00', true);
INSERT INTO public.salones_disponibilidad VALUES (4, 2, 2, 'martes', '08:30:00', '09:00:00', true);
INSERT INTO public.salones_disponibilidad VALUES (5, 3, 3, 'miércoles', '09:00:00', '09:30:00', true);
INSERT INTO public.salones_disponibilidad VALUES (6, 3, 4, 'miércoles', '09:30:00', '10:00:00', true);
INSERT INTO public.salones_disponibilidad VALUES (7, 4, 5, 'jueves', '10:00:00', '10:30:00', true);
INSERT INTO public.salones_disponibilidad VALUES (8, 4, 6, 'jueves', '10:30:00', '11:00:00', true);
INSERT INTO public.salones_disponibilidad VALUES (9, 5, 7, 'viernes', '11:00:00', '11:30:00', true);
INSERT INTO public.salones_disponibilidad VALUES (10, 5, 8, 'viernes', '11:30:00', '12:00:00', true);
INSERT INTO public.salones_disponibilidad VALUES (11, 6, 9, 'lunes', '12:00:00', '12:30:00', true);
INSERT INTO public.salones_disponibilidad VALUES (12, 6, 10, 'lunes', '12:30:00', '13:00:00', true);
INSERT INTO public.salones_disponibilidad VALUES (13, 7, 11, 'martes', '13:00:00', '13:30:00', true);
INSERT INTO public.salones_disponibilidad VALUES (14, 7, 12, 'martes', '13:30:00', '14:00:00', true);
INSERT INTO public.salones_disponibilidad VALUES (15, 8, 13, 'miércoles', '14:00:00', '14:30:00', true);
INSERT INTO public.salones_disponibilidad VALUES (16, 8, 14, 'miércoles', '14:30:00', '15:00:00', true);
INSERT INTO public.salones_disponibilidad VALUES (17, 9, 15, 'jueves', '07:00:00', '07:30:00', true);
INSERT INTO public.salones_disponibilidad VALUES (18, 9, 16, 'jueves', '07:30:00', '08:00:00', true);
INSERT INTO public.salones_disponibilidad VALUES (19, 10, 17, 'viernes', '08:00:00', '08:30:00', true);
INSERT INTO public.salones_disponibilidad VALUES (20, 10, 18, 'viernes', '08:30:00', '09:00:00', true);
INSERT INTO public.salones_disponibilidad VALUES (21, 1, 19, 'lunes', '09:00:00', '09:30:00', true);
INSERT INTO public.salones_disponibilidad VALUES (22, 2, 20, 'martes', '09:30:00', '10:00:00', true);
INSERT INTO public.salones_disponibilidad VALUES (23, 3, 21, 'miércoles', '10:00:00', '10:30:00', true);
INSERT INTO public.salones_disponibilidad VALUES (24, 4, 22, 'jueves', '10:30:00', '11:00:00', true);
INSERT INTO public.salones_disponibilidad VALUES (25, 5, 1, 'viernes', '11:00:00', '11:30:00', true);
INSERT INTO public.salones_disponibilidad VALUES (26, 6, 2, 'lunes', '11:30:00', '12:00:00', true);
INSERT INTO public.salones_disponibilidad VALUES (27, 7, 3, 'martes', '12:00:00', '12:30:00', true);
INSERT INTO public.salones_disponibilidad VALUES (28, 8, 4, 'miércoles', '12:30:00', '13:00:00', true);
INSERT INTO public.salones_disponibilidad VALUES (29, 9, 5, 'jueves', '13:00:00', '13:30:00', true);
INSERT INTO public.salones_disponibilidad VALUES (30, 10, 6, 'viernes', '13:30:00', '14:00:00', true);


--
-- TOC entry 5083 (class 0 OID 17482)
-- Dependencies: 251
-- Data for Name: solicitudes_cambio; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.solicitudes_cambio VALUES (1, 'IVD87493', 13, 1, 'cambio', 'Cambio solicitado por incompatibilidad de horario.', NULL, '2024-02-10', '2024-02-12', true, true);
INSERT INTO public.solicitudes_cambio VALUES (2, 'IVD87494', 1, 2, 'cambio', 'El alumno desea cambiar de materia debido a preferencia personal.', NULL, '2024-02-11', '2024-02-13', true, true);
INSERT INTO public.solicitudes_cambio VALUES (3, 'IVD87495', 2, 3, 'cambio', 'Solicita cambio debido a dificultad con el contenido.', NULL, '2024-02-12', NULL, NULL, false);
INSERT INTO public.solicitudes_cambio VALUES (4, 'IVD87496', 3, 4, 'cambio', 'El profesor recomendó cambio a otra materia más adecuada.', 'No cuenta con prerrequisitos', '2024-02-13', '2024-02-15', false, true);
INSERT INTO public.solicitudes_cambio VALUES (5, 'IVD87497', 4, 5, 'cambio', 'Cambio solicitado porque la materia no cumple expectativas.', NULL, '2024-02-14', NULL, NULL, false);
INSERT INTO public.solicitudes_cambio VALUES (6, 'IVD87498', 5, 6, 'cambio', 'Problemas con el equipamiento en la materia.', 'Grupo sin cupo', '2024-02-15', '2024-02-17', false, true);
INSERT INTO public.solicitudes_cambio VALUES (7, 'IVD87499', 6, 7, 'cambio', 'Cambio solicitado por exceso de carga académica.', NULL, '2024-02-16', NULL, NULL, false);
INSERT INTO public.solicitudes_cambio VALUES (8, 'IVD87500', 7, 8, 'eliminar', 'Incompatibilidad con el horario de otras materias.', NULL, '2024-02-17', '2024-02-19', true, true);
INSERT INTO public.solicitudes_cambio VALUES (9, 'IVD87501', 8, 9, 'eliminar', 'Cambio debido a problemas personales con el profesor.', 'Materia obligatoria', '2024-02-18', '2024-02-20', false, true);
INSERT INTO public.solicitudes_cambio VALUES (10, 'IVD87502', 9, 10, 'eliminar', 'El alumno no pudo conseguir el material necesario para la materia.', NULL, '2024-02-19', NULL, NULL, false);
INSERT INTO public.solicitudes_cambio VALUES (11, 'IVD87503', 10, 11, 'agregar', 'Cambio solicitado porque la materia no era lo esperado.', 'No puede llevar sobrecarga', '2024-02-20', '2024-02-22', false, true);
INSERT INTO public.solicitudes_cambio VALUES (12, 'IVD87504', 11, 12, 'agregar', 'El estudiante cambió de especialización.', NULL, '2024-02-21', '2024-02-23', true, true);
INSERT INTO public.solicitudes_cambio VALUES (13, 'IVD87505', 12, 13, 'eliminar', 'Cambio por falta de interés en el contenido del curso.', NULL, '2024-02-22', NULL, NULL, false);
INSERT INTO public.solicitudes_cambio VALUES (14, 'IVD87506', 12, 14, 'agregar', 'Cambio solicitado debido a sugerencia de asesor académico.', 'No cuenta con prerrequisitos', '2024-02-23', '2024-02-25', false, true);
INSERT INTO public.solicitudes_cambio VALUES (15, 'IVD87507', 19, 15, 'agregar', 'El alumno desea cambiar a una materia más avanzada.', NULL, '2024-02-24', NULL, NULL, false);


--
-- TOC entry 5091 (class 0 OID 0)
-- Dependencies: 222
-- Name: carreras_id_carrera_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carreras_id_carrera_seq', 10, true);


--
-- TOC entry 5092 (class 0 OID 0)
-- Dependencies: 224
-- Name: ciclos_escolares_id_ciclo_escolar_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ciclos_escolares_id_ciclo_escolar_seq', 70, true);


--
-- TOC entry 5093 (class 0 OID 0)
-- Dependencies: 232
-- Name: ciclos_escolares_materias_id_ciclo_escolar_materia_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ciclos_escolares_materias_id_ciclo_escolar_materia_seq', 60, true);


--
-- TOC entry 5094 (class 0 OID 0)
-- Dependencies: 248
-- Name: enlista_id_enlista_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.enlista_id_enlista_seq', 1, false);


--
-- TOC entry 5095 (class 0 OID 0)
-- Dependencies: 242
-- Name: grupos_ciclos_materias_id_grupo_ciclo_materia_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.grupos_ciclos_materias_id_grupo_ciclo_materia_seq', 1, false);


--
-- TOC entry 5096 (class 0 OID 0)
-- Dependencies: 240
-- Name: grupos_horarios_id_grupo_horario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.grupos_horarios_id_grupo_horario_seq', 1, false);


--
-- TOC entry 5097 (class 0 OID 0)
-- Dependencies: 238
-- Name: grupos_id_grupo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.grupos_id_grupo_seq', 1, false);


--
-- TOC entry 5098 (class 0 OID 0)
-- Dependencies: 226
-- Name: materias_id_materia_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.materias_id_materia_seq', 40, true);


--
-- TOC entry 5099 (class 0 OID 0)
-- Dependencies: 228
-- Name: planes_estudios_id_plan_estudio_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.planes_estudios_id_plan_estudio_seq', 7, true);


--
-- TOC entry 5100 (class 0 OID 0)
-- Dependencies: 230
-- Name: planes_materias_id_plan_materia_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.planes_materias_id_plan_materia_seq', 1, false);


--
-- TOC entry 5101 (class 0 OID 0)
-- Dependencies: 244
-- Name: profesores_disponibilidad_id_profesor_disponibilidad_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profesores_disponibilidad_id_profesor_disponibilidad_seq', 60, true);


--
-- TOC entry 5102 (class 0 OID 0)
-- Dependencies: 234
-- Name: profesores_id_profesor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profesores_id_profesor_seq', 35, true);


--
-- TOC entry 5103 (class 0 OID 0)
-- Dependencies: 252
-- Name: requisitos_id_requisito_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.requisitos_id_requisito_seq', 1, false);


--
-- TOC entry 5104 (class 0 OID 0)
-- Dependencies: 246
-- Name: salones_disponibilidad_id_salon_disponibilidad_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.salones_disponibilidad_id_salon_disponibilidad_seq', 1, false);


--
-- TOC entry 5105 (class 0 OID 0)
-- Dependencies: 236
-- Name: salones_id_salon_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.salones_id_salon_seq', 4, true);


--
-- TOC entry 5106 (class 0 OID 0)
-- Dependencies: 250
-- Name: solicitudes_cambio_id_solicitud_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.solicitudes_cambio_id_solicitud_seq', 1, false);


-- Completed on 2025-04-15 23:52:19

--
-- PostgreSQL database dump complete
--

