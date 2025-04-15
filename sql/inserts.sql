--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-04-10 12:26:22

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5009 (class 0 OID 16577)
-- Dependencies: 218
-- Data for Name: CicloEscolar; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ciclos_escolares VALUES ('FebJun17', '2017-02-22', '2017-06-18', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES ('AgoDic17', '2017-08-19', '2017-12-17', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES ('FebJun18', '2018-02-21', '2018-06-16', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES ('AgoDic18', '2018-08-15', '2018-12-15', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES ('FebJun19', '2019-02-17', '2019-06-14', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES ('AgoDic19', '2019-08-10', '2019-12-10', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES ('FebJun20', '2020-02-20', '2020-06-11', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES ('AgoDic20', '2020-08-16', '2020-12-12', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES ('FebJun21', '2021-02-18', '2021-06-13', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES ('AgoDic21', '2021-08-19', '2021-12-14', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES ('FebJun22', '2022-02-15', '2022-06-15', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES ('AgoDic22', '2022-08-14', '2022-12-10', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES ('FebJun23', '2023-02-13', '2023-06-09', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES ('AgoDic23', '2023-08-11', '2023-12-08', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES ('FebJun24', '2024-02-10', '2024-06-07', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES ('AgoDic24', '2024-08-20', '2024-12-06', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES ('FebJun25', '2025-02-19', '2025-06-05', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES ('AgoDic25', '2025-08-21', '2025-12-04', NULL, NULL);
INSERT INTO public.ciclos_escolares VALUES ('FebJun15', '2015-02-25', '2015-06-25', '2025-04-08', '2025-04-29');
INSERT INTO public.ciclos_escolares VALUES ('AgoDic15', '2015-08-17', '2015-12-03', '2025-04-08', '2025-04-16');
INSERT INTO public.ciclos_escolares VALUES ('FebJun16', '2016-02-19', '2016-06-20', '2000-12-31', '1999-12-02');
INSERT INTO public.ciclos_escolares VALUES ('AgoDic16', '2016-08-18', '2016-12-19', '2025-04-10', '2025-04-28');


--
-- TOC entry 5008 (class 0 OID 16570)
-- Dependencies: 217
-- Data for Name: Plan; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.planes VALUES ('P001', 'PDMIV25', 'Diseño de la Moda e Industria del Vestido');
INSERT INTO public.planes VALUES ('P002', 'PDAI25', 'Diseno y Arquitectura de Interiores');


--
-- TOC entry 5010 (class 0 OID 16584)
-- Dependencies: 219
-- Data for Name: Materia; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.materias VALUES ('M001', 'Historia del Arte', 'P001', 15, 8, '');
INSERT INTO public.materias VALUES ('M002', 'Historia de la Arquitectura I', 'P002', 18, 10, '');
INSERT INTO public.materias VALUES ('M003', 'Historia de la Arquitectura II', 'P002', 18, 10, '');
INSERT INTO public.materias VALUES ('M004', 'Diseño de Accesorios', 'P001', 17, 12, 'Máquina ACC3000');
INSERT INTO public.materias VALUES ('M005', 'Materiales Textiles', 'P001', 21, 6, '');
INSERT INTO public.materias VALUES ('M006', 'Modelado en Maniquí I', 'P001', 15, 10, 'Maniquí');
INSERT INTO public.materias VALUES ('M007', 'Modelado en Maniquí II', 'P001', 17, 14, 'Maniquí');
INSERT INTO public.materias VALUES ('M008', 'Diseño de Paisaje', 'P002', 17, 15, 'Mesas de taller');
INSERT INTO public.materias VALUES ('M009', 'Psicología del Espacio', 'P002', 18, 18, '');
INSERT INTO public.materias VALUES ('M010', 'Iluminación y Acústica', 'P002', 17, 15, 'Lámparas ISH');
INSERT INTO public.materias VALUES ('M011', 'Aplicación Textil I', 'P001', 17, 4, 'Mesas de taller');
INSERT INTO public.materias VALUES ('M012', 'Aplicación Textil II', 'P001', 18, 6, 'Mesas de taller');
INSERT INTO public.materias VALUES ('M013', 'Conceptos y Tendencias de la Moda I', 'P001', 15, 6, '');
INSERT INTO public.materias VALUES ('M014', 'Conceptos y Tendencias de la Moda II', 'P001', 17, 6, '');
INSERT INTO public.materias VALUES ('M015', 'Modelación Digital I', 'P001', 21, 15, 'Tabletas XP1900');
INSERT INTO public.materias VALUES ('M016', 'Modelación Digital II', 'P001', 21, 20, 'Tabletas XP1925');
INSERT INTO public.materias VALUES ('M017', 'Modelos y Prototipos de Mobiliario', 'P002', 21, 20, 'Mesas de taller');
INSERT INTO public.materias VALUES ('M018', 'Fundamentos de Mercadotecnia', 'P002', 21, 20, '');
INSERT INTO public.materias VALUES ('M019', 'Imagen Corporativa', 'P002', 21, 20, '');
INSERT INTO public.materias VALUES ('M020', 'Ilustración Gráfica Digital', 'P002', 21, 20, 'Computadoras XP2070');


--
-- TOC entry 5013 (class 0 OID 16620)
-- Dependencies: 222
-- Data for Name: Profesor; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.profesores VALUES ('IVD012902', 'Alberto Méndez Álvarez');
INSERT INTO public.profesores VALUES ('IVD83721', 'Juan Ignacio Arriola Ruíz');
INSERT INTO public.profesores VALUES ('IVD56893', 'Antonia García Heche');
INSERT INTO public.profesores VALUES ('IVD42452', 'Esther Vázquez Herrera');
INSERT INTO public.profesores VALUES ('IVD53916', 'Beatriz Paredes Sevilla');
INSERT INTO public.profesores VALUES ('IVD92482', 'Inés Pineda González');


--
-- TOC entry 5012 (class 0 OID 16613)
-- Dependencies: 221
-- Data for Name: Salon; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.salones VALUES ('S001', 10, 'Aula normal');
INSERT INTO public.salones VALUES ('S002', 15, 'Aula normal');
INSERT INTO public.salones VALUES ('S003', 10, 'Aula normal');
INSERT INTO public.salones VALUES ('S004', 15, 'Aula normal');
INSERT INTO public.salones VALUES ('S005', 10, 'Aula normal');
INSERT INTO public.salones VALUES ('S006', 10, 'Taller de telas');
INSERT INTO public.salones VALUES ('S007', 10, 'Lamparas ISH');
INSERT INTO public.salones VALUES ('S008', 15, 'Aula de computadoras');
INSERT INTO public.salones VALUES ('S009', 8, 'Aula de maquinaria');
INSERT INTO public.salones VALUES ('S010', 8, 'Taller de telas');
INSERT INTO public.salones VALUES ('S011', 7, '20 Maniquies');
INSERT INTO public.salones VALUES ('S012', 10, '15 lamparas SH');
INSERT INTO public.salones VALUES ('S013', 10, 'Aula normal');
INSERT INTO public.salones VALUES ('S014', 5, 'Aula normal');
INSERT INTO public.salones VALUES ('S015', 5, 'Aula normal');


--
-- TOC entry 5017 (class 0 OID 16665)
-- Dependencies: 226
-- Data for Name: Grupo; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.grupos VALUES ('G003', 'M003', 'IVD83721', 'S003', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.grupos VALUES ('G004', 'M004', 'IVD56893', 'S009', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.grupos VALUES ('G005', 'M005', 'IVD56893', 'S006', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.grupos VALUES ('G006', 'M006', 'IVD42452', 'S011', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.grupos VALUES ('G007', 'M007', 'IVD42452', 'S011', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.grupos VALUES ('G008', 'M008', 'IVD53916', 'S004', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.grupos VALUES ('G009', 'M009', 'IVD53916', 'S005', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.grupos VALUES ('G010', 'M010', 'IVD53916', 'S007', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.grupos VALUES ('G011', 'M011', 'IVD92482', 'S006', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.grupos VALUES ('G012', 'M012', 'IVD92482', 'S010', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.grupos VALUES ('G013', 'M013', 'IVD012902', 'S006', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.grupos VALUES ('G014', 'M014', 'IVD012902', 'S010', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.grupos VALUES ('G015', 'M015', 'IVD83721', 'S008', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.grupos VALUES ('G016', 'M016', 'IVD83721', 'S008', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.grupos VALUES ('G017', 'M017', 'IVD56893', 'S009', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.grupos VALUES ('G018', 'M018', 'IVD56893', 'S001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.grupos VALUES ('G019', 'M019', 'IVD42452', 'S002', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.grupos VALUES ('G020', 'M020', 'IVD42452', 'S008', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.grupos VALUES ('G001', 'M001', 'IVD012902', 'S001', '08:00:00', '10:00:00', '10:00:00', '12:00:00', '08:00:00', '10:00:00', '10:00:00', '12:00:00', NULL, NULL);
INSERT INTO public.grupos VALUES ('G002', 'M002', 'IVD83721', 'S002', '11:00:00', '12:00:00', '08:00:00', '10:00:00', '10:00:00', '13:00:00', NULL, NULL, '13:30:00', '15:00:00');


--
-- TOC entry 5021 (class 0 OID 16739)
-- Dependencies: 230
-- Data for Name: Abre; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.abre VALUES ('FebJun15', 'G001');
INSERT INTO public.abre VALUES ('FebJun15', 'G002');
INSERT INTO public.abre VALUES ('FebJun15', 'G003');
INSERT INTO public.abre VALUES ('AgoDic15', 'G004');
INSERT INTO public.abre VALUES ('AgoDic15', 'G005');
INSERT INTO public.abre VALUES ('AgoDic15', 'G006');
INSERT INTO public.abre VALUES ('FebJun16', 'G007');
INSERT INTO public.abre VALUES ('FebJun16', 'G008');
INSERT INTO public.abre VALUES ('FebJun16', 'G009');
INSERT INTO public.abre VALUES ('AgoDic16', 'G010');
INSERT INTO public.abre VALUES ('AgoDic16', 'G011');
INSERT INTO public.abre VALUES ('AgoDic16', 'G012');
INSERT INTO public.abre VALUES ('FebJun17', 'G013');
INSERT INTO public.abre VALUES ('FebJun17', 'G014');
INSERT INTO public.abre VALUES ('FebJun17', 'G015');
INSERT INTO public.abre VALUES ('AgoDic17', 'G016');
INSERT INTO public.abre VALUES ('AgoDic17', 'G017');
INSERT INTO public.abre VALUES ('AgoDic17', 'G018');
INSERT INTO public.abre VALUES ('FebJun18', 'G019');
INSERT INTO public.abre VALUES ('FebJun18', 'G020');
INSERT INTO public.abre VALUES ('FebJun18', 'G001');
INSERT INTO public.abre VALUES ('AgoDic18', 'G002');
INSERT INTO public.abre VALUES ('AgoDic18', 'G003');
INSERT INTO public.abre VALUES ('AgoDic18', 'G004');
INSERT INTO public.abre VALUES ('FebJun19', 'G005');
INSERT INTO public.abre VALUES ('FebJun19', 'G006');
INSERT INTO public.abre VALUES ('FebJun19', 'G007');
INSERT INTO public.abre VALUES ('AgoDic19', 'G008');
INSERT INTO public.abre VALUES ('AgoDic19', 'G009');
INSERT INTO public.abre VALUES ('AgoDic19', 'G010');
INSERT INTO public.abre VALUES ('FebJun20', 'G011');
INSERT INTO public.abre VALUES ('FebJun20', 'G012');
INSERT INTO public.abre VALUES ('FebJun20', 'G013');
INSERT INTO public.abre VALUES ('AgoDic20', 'G014');
INSERT INTO public.abre VALUES ('AgoDic20', 'G015');
INSERT INTO public.abre VALUES ('AgoDic20', 'G016');
INSERT INTO public.abre VALUES ('FebJun21', 'G017');
INSERT INTO public.abre VALUES ('FebJun21', 'G018');
INSERT INTO public.abre VALUES ('FebJun21', 'G019');
INSERT INTO public.abre VALUES ('AgoDic21', 'G020');
INSERT INTO public.abre VALUES ('AgoDic21', 'G001');
INSERT INTO public.abre VALUES ('AgoDic21', 'G002');
INSERT INTO public.abre VALUES ('FebJun22', 'G003');
INSERT INTO public.abre VALUES ('FebJun22', 'G004');
INSERT INTO public.abre VALUES ('FebJun22', 'G005');
INSERT INTO public.abre VALUES ('AgoDic22', 'G006');
INSERT INTO public.abre VALUES ('AgoDic22', 'G007');
INSERT INTO public.abre VALUES ('AgoDic22', 'G008');
INSERT INTO public.abre VALUES ('FebJun23', 'G009');
INSERT INTO public.abre VALUES ('FebJun23', 'G010');
INSERT INTO public.abre VALUES ('AgoDic23', 'G011');
INSERT INTO public.abre VALUES ('AgoDic23', 'G012');
INSERT INTO public.abre VALUES ('AgoDic23', 'G013');
INSERT INTO public.abre VALUES ('FebJun24', 'G014');
INSERT INTO public.abre VALUES ('FebJun24', 'G015');
INSERT INTO public.abre VALUES ('AgoDic24', 'G016');
INSERT INTO public.abre VALUES ('AgoDic24', 'G017');
INSERT INTO public.abre VALUES ('FebJun25', 'G018');
INSERT INTO public.abre VALUES ('FebJun25', 'G019');
INSERT INTO public.abre VALUES ('AgoDic25', 'G020');


--
-- TOC entry 5023 (class 0 OID 16773)
-- Dependencies: 232
-- Data for Name: Privilegio; Type: TABLE DATA; Schema: public; Owner: postgres
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
-- TOC entry 5024 (class 0 OID 16780)
-- Dependencies: 233
-- Data for Name: Accede; Type: TABLE DATA; Schema: public; Owner: postgres
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
-- TOC entry 5014 (class 0 OID 16634)
-- Dependencies: 223
-- Data for Name: Usuario; Type: TABLE DATA; Schema: public; Owner: postgres
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
-- TOC entry 5015 (class 0 OID 16641)
-- Dependencies: 224
-- Data for Name: Administrador; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.administradores VALUES ('IVD87509', 'Diseño de la Moda e Industria del Vestido');
INSERT INTO public.administradores VALUES ('IVD87510', 'Diseño y Arquitectura de Interiores');
INSERT INTO public.administradores VALUES ('IVD87511', 'Diseño de la Moda e Industria del Vestido');
INSERT INTO public.administradores VALUES ('IVD87512', 'Diseño y Arquitectura de Interiores');
INSERT INTO public.administradores VALUES ('IVD87513', 'Diseño de la Moda e Industria del Vestido');
INSERT INTO public.administradores VALUES ('300014', 'Diseño de la Moda e Industria del Vestido');
INSERT INTO public.administradores VALUES ('300015', 'Diseño y Arquitectura de Interiores');


--
-- TOC entry 5016 (class 0 OID 16653)
-- Dependencies: 225
-- Data for Name: Alumno; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.alumnos VALUES ('IVD87493', '1', true, 'Diseño de la Moda e Industria del Vestido');
INSERT INTO public.alumnos VALUES ('IVD87494', '2', true, 'Diseño y Arquitectura de Interiores');
INSERT INTO public.alumnos VALUES ('IVD87495', '3', false, 'Diseño de la Moda e Industria del Vestido');
INSERT INTO public.alumnos VALUES ('IVD87496', '4', true, 'Diseño y Arquitectura de Interiores');
INSERT INTO public.alumnos VALUES ('IVD87497', '5', true, 'Diseño de la Moda e Industria del Vestido');
INSERT INTO public.alumnos VALUES ('IVD87498', '1', true, 'Diseño y Arquitectura de Interiores');
INSERT INTO public.alumnos VALUES ('IVD87499', '2', false, 'Diseño de la Moda e Industria del Vestido');
INSERT INTO public.alumnos VALUES ('IVD87500', '3', true, 'Diseño y Arquitectura de Interiores');
INSERT INTO public.alumnos VALUES ('IVD87501', '4', true, 'Diseño de la Moda e Industria del Vestido');
INSERT INTO public.alumnos VALUES ('IVD87502', '5', true, 'Diseño y Arquitectura de Interiores');
INSERT INTO public.alumnos VALUES ('IVD87503', '6', true, 'Diseño de la Moda e Industria del Vestido');
INSERT INTO public.alumnos VALUES ('IVD87504', '7', true, 'Diseño y Arquitectura de Interiores');
INSERT INTO public.alumnos VALUES ('IVD87505', '8', false, 'Diseño de la Moda e Industria del Vestido');
INSERT INTO public.alumnos VALUES ('IVD87506', '1', true, 'Diseño y Arquitectura de Interiores');
INSERT INTO public.alumnos VALUES ('IVD87507', '2', true, 'Diseño de la Moda e Industria del Vestido');
INSERT INTO public.alumnos VALUES ('100001', '2', false, 'Diseño y Arquitectura de Interiores');
INSERT INTO public.alumnos VALUES ('100007', '2', false, 'Diseño de la Moda e Industria del Vestido');
INSERT INTO public.alumnos VALUES ('100023', '2', true, 'Diseño y Arquitectura de Interiores');
INSERT INTO public.alumnos VALUES ('100123', '2', true, 'Diseño de la Moda e Industria del Vestido');


--
-- TOC entry 5019 (class 0 OID 16705)
-- Dependencies: 228
-- Data for Name: Disponible; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.disponible VALUES ('FebJun15', 'IVD012902', '{08:00:00,12:00:00}', '{10:00:00,14:00:00}', '{}', '{10:00:00,14:00:00}', '{08:00:00,12:00:00}');
INSERT INTO public.disponible VALUES ('FebJun15', 'IVD83721', '{09:00:00,13:00:00}', '{}', '{09:00:00,13:00:00}', '{11:00:00,15:00:00}', '{}');
INSERT INTO public.disponible VALUES ('FebJun15', 'IVD56893', '{07:00:00,11:00:00}', '{}', '{07:00:00,11:00:00}', '{}', '{07:00:00,11:00:00}');
INSERT INTO public.disponible VALUES ('AgoDic15', 'IVD42452', '{}', '{10:00:00,14:00:00}', '{08:00:00,12:00:00}', '{}', '{08:00:00,12:00:00}');
INSERT INTO public.disponible VALUES ('AgoDic15', 'IVD53916', '{10:00:00,14:00:00}', '{12:00:00,15:00:00}', '{}', '{}', '{10:00:00,14:00:00}');
INSERT INTO public.disponible VALUES ('AgoDic15', 'IVD92482', '{}', '{09:30:00,13:30:00}', '{07:30:00,11:30:00}', '{09:30:00,13:30:00}', '{}');
INSERT INTO public.disponible VALUES ('FebJun16', 'IVD012902', '{08:00:00,12:00:00}', '{}', '{08:00:00,12:00:00}', '{}', '{08:00:00,12:00:00}');
INSERT INTO public.disponible VALUES ('FebJun16', 'IVD83721', '{09:00:00,13:00:00}', '{11:00:00,15:00:00}', '{}', '{11:00:00,15:00:00}', '{}');
INSERT INTO public.disponible VALUES ('FebJun16', 'IVD56893', '{07:00:00,11:00:00}', '{09:00:00,13:00:00}', '{}', '{09:00:00,13:00:00}', '{}');
INSERT INTO public.disponible VALUES ('FebJun16', 'IVD42452', '{}', '{10:00:00,14:00:00}', '{}', '{10:00:00,14:00:00}', '{08:00:00,12:00:00}');
INSERT INTO public.disponible VALUES ('FebJun16', 'IVD53916', '{10:00:00,14:00:00}', '{}', '{10:00:00,14:00:00}', '{12:00:00,15:00:00}', '{}');
INSERT INTO public.disponible VALUES ('AgoDic16', 'IVD92482', '{}', '{09:30:00,13:30:00}', '{}', '{09:30:00,13:30:00}', '{07:30:00,11:30:00}');
INSERT INTO public.disponible VALUES ('AgoDic16', 'IVD012902', '{08:00:00,12:00:00}', '{10:00:00,14:00:00}', '{}', '{10:00:00,14:00:00}', '{}');
INSERT INTO public.disponible VALUES ('AgoDic16', 'IVD83721', '{09:00:00,13:00:00}', '{}', '{09:00:00,13:00:00}', '{}', '{09:00:00,13:00:00}');
INSERT INTO public.disponible VALUES ('FebJun17', 'IVD56893', '{}', '{09:00:00,13:00:00}', '{07:00:00,11:00:00}', '{09:00:00,13:00:00}', '{}');
INSERT INTO public.disponible VALUES ('FebJun17', 'IVD42452', '{08:00:00,12:00:00}', '{}', '{08:00:00,12:00:00}', '{}', '{08:00:00,12:00:00}');
INSERT INTO public.disponible VALUES ('FebJun17', 'IVD53916', '{}', '{12:00:00,15:00:00}', '{10:00:00,14:00:00}', '{}', '{10:00:00,14:00:00}');
INSERT INTO public.disponible VALUES ('FebJun17', 'IVD92482', '{07:30:00,11:30:00}', '{}', '{07:30:00,11:30:00}', '{09:30:00,13:30:00}', '{}');
INSERT INTO public.disponible VALUES ('AgoDic17', 'IVD012902', '{}', '{10:00:00,14:00:00}', '{08:00:00,12:00:00}', '{}', '{08:00:00,12:00:00}');
INSERT INTO public.disponible VALUES ('AgoDic17', 'IVD83721', '{09:00:00,13:00:00}', '{}', '{09:00:00,13:00:00}', '{11:00:00,15:00:00}', '{}');
INSERT INTO public.disponible VALUES ('AgoDic17', 'IVD56893', '{07:00:00,11:00:00}', '{09:00:00,13:00:00}', '{}', '{09:00:00,13:00:00}', '{}');
INSERT INTO public.disponible VALUES ('FebJun18', 'IVD42452', '{}', '{10:00:00,14:00:00}', '{08:00:00,12:00:00}', '{}', '{08:00:00,12:00:00}');
INSERT INTO public.disponible VALUES ('FebJun18', 'IVD53916', '{10:00:00,14:00:00}', '{12:00:00,15:00:00}', '{}', '{}', '{10:00:00,14:00:00}');
INSERT INTO public.disponible VALUES ('FebJun18', 'IVD92482', '{}', '{09:30:00,13:30:00}', '{07:30:00,11:30:00}', '{09:30:00,13:30:00}', '{}');
INSERT INTO public.disponible VALUES ('AgoDic18', 'IVD012902', '{08:00:00,12:00:00}', '{}', '{08:00:00,12:00:00}', '{}', '{08:00:00,12:00:00}');
INSERT INTO public.disponible VALUES ('AgoDic18', 'IVD83721', '{09:00:00,13:00:00}', '{11:00:00,15:00:00}', '{}', '{11:00:00,15:00:00}', '{}');
INSERT INTO public.disponible VALUES ('AgoDic18', 'IVD56893', '{07:00:00,11:00:00}', '{09:00:00,13:00:00}', '{}', '{09:00:00,13:00:00}', '{}');
INSERT INTO public.disponible VALUES ('AgoDic18', 'IVD42452', '{}', '{10:00:00,14:00:00}', '{}', '{10:00:00,14:00:00}', '{08:00:00,12:00:00}');
INSERT INTO public.disponible VALUES ('AgoDic18', 'IVD53916', '{10:00:00,14:00:00}', '{}', '{10:00:00,14:00:00}', '{12:00:00,15:00:00}', '{}');
INSERT INTO public.disponible VALUES ('FebJun21', 'IVD012902', '{08:00:00,12:00:00}', '{10:00:00,14:00:00}', '{}', '{10:00:00,14:00:00}', '{08:00:00,12:00:00}');


--
-- TOC entry 5018 (class 0 OID 16688)
-- Dependencies: 227
-- Data for Name: Enlista; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.enlista VALUES ('G001', 'IVD87493');
INSERT INTO public.enlista VALUES ('G001', 'IVD87495');
INSERT INTO public.enlista VALUES ('G001', 'IVD87497');
INSERT INTO public.enlista VALUES ('G002', 'IVD87494');
INSERT INTO public.enlista VALUES ('G002', 'IVD87500');
INSERT INTO public.enlista VALUES ('G002', 'IVD87502');
INSERT INTO public.enlista VALUES ('G003', 'IVD87494');
INSERT INTO public.enlista VALUES ('G003', 'IVD87500');
INSERT INTO public.enlista VALUES ('G003', 'IVD87504');
INSERT INTO public.enlista VALUES ('G004', 'IVD87493');
INSERT INTO public.enlista VALUES ('G004', 'IVD87495');
INSERT INTO public.enlista VALUES ('G004', 'IVD87497');
INSERT INTO public.enlista VALUES ('G005', 'IVD87493');
INSERT INTO public.enlista VALUES ('G005', 'IVD87501');
INSERT INTO public.enlista VALUES ('G005', 'IVD87503');
INSERT INTO public.enlista VALUES ('G006', 'IVD87493');
INSERT INTO public.enlista VALUES ('G006', 'IVD87497');
INSERT INTO public.enlista VALUES ('G006', 'IVD87501');
INSERT INTO public.enlista VALUES ('G007', 'IVD87493');
INSERT INTO public.enlista VALUES ('G007', 'IVD87501');
INSERT INTO public.enlista VALUES ('G007', 'IVD87503');
INSERT INTO public.enlista VALUES ('G008', 'IVD87494');
INSERT INTO public.enlista VALUES ('G008', 'IVD87500');
INSERT INTO public.enlista VALUES ('G008', 'IVD87502');
INSERT INTO public.enlista VALUES ('G009', 'IVD87494');
INSERT INTO public.enlista VALUES ('G009', 'IVD87500');
INSERT INTO public.enlista VALUES ('G009', 'IVD87504');
INSERT INTO public.enlista VALUES ('G010', 'IVD87494');
INSERT INTO public.enlista VALUES ('G010', 'IVD87500');
INSERT INTO public.enlista VALUES ('G010', 'IVD87504');
INSERT INTO public.enlista VALUES ('G011', 'IVD87493');
INSERT INTO public.enlista VALUES ('G011', 'IVD87497');
INSERT INTO public.enlista VALUES ('G011', 'IVD87501');
INSERT INTO public.enlista VALUES ('G012', 'IVD87493');
INSERT INTO public.enlista VALUES ('G012', 'IVD87501');
INSERT INTO public.enlista VALUES ('G012', 'IVD87503');
INSERT INTO public.enlista VALUES ('G013', 'IVD87493');
INSERT INTO public.enlista VALUES ('G013', 'IVD87495');
INSERT INTO public.enlista VALUES ('G013', 'IVD87497');
INSERT INTO public.enlista VALUES ('G014', 'IVD87493');
INSERT INTO public.enlista VALUES ('G014', 'IVD87501');
INSERT INTO public.enlista VALUES ('G014', 'IVD87503');
INSERT INTO public.enlista VALUES ('G015', 'IVD87494');
INSERT INTO public.enlista VALUES ('G015', 'IVD87500');
INSERT INTO public.enlista VALUES ('G015', 'IVD87502');
INSERT INTO public.enlista VALUES ('G016', 'IVD87494');
INSERT INTO public.enlista VALUES ('G016', 'IVD87500');
INSERT INTO public.enlista VALUES ('G016', 'IVD87504');
INSERT INTO public.enlista VALUES ('G017', 'IVD87494');
INSERT INTO public.enlista VALUES ('G017', 'IVD87500');
INSERT INTO public.enlista VALUES ('G017', 'IVD87502');
INSERT INTO public.enlista VALUES ('G018', 'IVD87494');
INSERT INTO public.enlista VALUES ('G018', 'IVD87500');
INSERT INTO public.enlista VALUES ('G018', 'IVD87504');
INSERT INTO public.enlista VALUES ('G019', 'IVD87494');
INSERT INTO public.enlista VALUES ('G019', 'IVD87500');
INSERT INTO public.enlista VALUES ('G019', 'IVD87502');
INSERT INTO public.enlista VALUES ('G020', 'IVD87494');
INSERT INTO public.enlista VALUES ('G020', 'IVD87500');
INSERT INTO public.enlista VALUES ('G020', 'IVD87504');
INSERT INTO public.enlista VALUES ('G001', '100007');
INSERT INTO public.enlista VALUES ('G002', '100007');
INSERT INTO public.enlista VALUES ('G003', '100007');
INSERT INTO public.enlista VALUES ('G004', '100007');


--
-- TOC entry 5020 (class 0 OID 16722)
-- Dependencies: 229
-- Data for Name: Ofrece; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ofrece VALUES ('FebJun15', 'M001');
INSERT INTO public.ofrece VALUES ('FebJun15', 'M002');
INSERT INTO public.ofrece VALUES ('FebJun15', 'M004');
INSERT INTO public.ofrece VALUES ('FebJun15', 'M005');
INSERT INTO public.ofrece VALUES ('AgoDic15', 'M003');
INSERT INTO public.ofrece VALUES ('AgoDic15', 'M006');
INSERT INTO public.ofrece VALUES ('AgoDic15', 'M007');
INSERT INTO public.ofrece VALUES ('AgoDic15', 'M008');
INSERT INTO public.ofrece VALUES ('FebJun16', 'M009');
INSERT INTO public.ofrece VALUES ('FebJun16', 'M010');
INSERT INTO public.ofrece VALUES ('FebJun16', 'M011');
INSERT INTO public.ofrece VALUES ('FebJun16', 'M012');
INSERT INTO public.ofrece VALUES ('FebJun16', 'M013');
INSERT INTO public.ofrece VALUES ('AgoDic16', 'M014');
INSERT INTO public.ofrece VALUES ('AgoDic16', 'M015');
INSERT INTO public.ofrece VALUES ('AgoDic16', 'M016');
INSERT INTO public.ofrece VALUES ('AgoDic16', 'M017');
INSERT INTO public.ofrece VALUES ('FebJun17', 'M018');
INSERT INTO public.ofrece VALUES ('FebJun17', 'M019');
INSERT INTO public.ofrece VALUES ('FebJun17', 'M020');
INSERT INTO public.ofrece VALUES ('AgoDic17', 'M001');
INSERT INTO public.ofrece VALUES ('AgoDic17', 'M002');
INSERT INTO public.ofrece VALUES ('AgoDic17', 'M003');
INSERT INTO public.ofrece VALUES ('AgoDic17', 'M004');
INSERT INTO public.ofrece VALUES ('FebJun18', 'M005');
INSERT INTO public.ofrece VALUES ('FebJun18', 'M006');
INSERT INTO public.ofrece VALUES ('FebJun18', 'M007');
INSERT INTO public.ofrece VALUES ('FebJun18', 'M008');
INSERT INTO public.ofrece VALUES ('AgoDic18', 'M009');
INSERT INTO public.ofrece VALUES ('AgoDic18', 'M010');
INSERT INTO public.ofrece VALUES ('AgoDic18', 'M011');
INSERT INTO public.ofrece VALUES ('AgoDic18', 'M012');
INSERT INTO public.ofrece VALUES ('FebJun19', 'M013');
INSERT INTO public.ofrece VALUES ('FebJun19', 'M014');
INSERT INTO public.ofrece VALUES ('FebJun19', 'M015');
INSERT INTO public.ofrece VALUES ('AgoDic19', 'M016');
INSERT INTO public.ofrece VALUES ('AgoDic19', 'M017');
INSERT INTO public.ofrece VALUES ('AgoDic19', 'M018');
INSERT INTO public.ofrece VALUES ('FebJun20', 'M019');
INSERT INTO public.ofrece VALUES ('FebJun20', 'M020');
INSERT INTO public.ofrece VALUES ('AgoDic20', 'M001');
INSERT INTO public.ofrece VALUES ('AgoDic20', 'M002');
INSERT INTO public.ofrece VALUES ('AgoDic20', 'M003');
INSERT INTO public.ofrece VALUES ('FebJun21', 'M004');
INSERT INTO public.ofrece VALUES ('FebJun21', 'M005');
INSERT INTO public.ofrece VALUES ('AgoDic21', 'M006');
INSERT INTO public.ofrece VALUES ('AgoDic21', 'M007');
INSERT INTO public.ofrece VALUES ('AgoDic21', 'M008');
INSERT INTO public.ofrece VALUES ('FebJun22', 'M009');
INSERT INTO public.ofrece VALUES ('FebJun22', 'M010');
INSERT INTO public.ofrece VALUES ('AgoDic22', 'M011');
INSERT INTO public.ofrece VALUES ('AgoDic22', 'M012');
INSERT INTO public.ofrece VALUES ('FebJun23', 'M013');
INSERT INTO public.ofrece VALUES ('FebJun23', 'M014');
INSERT INTO public.ofrece VALUES ('AgoDic23', 'M015');
INSERT INTO public.ofrece VALUES ('AgoDic23', 'M016');
INSERT INTO public.ofrece VALUES ('FebJun24', 'M017');
INSERT INTO public.ofrece VALUES ('FebJun24', 'M018');
INSERT INTO public.ofrece VALUES ('AgoDic24', 'M019');
INSERT INTO public.ofrece VALUES ('AgoDic24', 'M020');
INSERT INTO public.ofrece VALUES ('FebJun25', 'M001');
INSERT INTO public.ofrece VALUES ('FebJun25', 'M002');
INSERT INTO public.ofrece VALUES ('AgoDic25', 'M003');
INSERT INTO public.ofrece VALUES ('AgoDic25', 'M004');


--
-- TOC entry 5011 (class 0 OID 16596)
-- Dependencies: 220
-- Data for Name: Requisito; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5022 (class 0 OID 16756)
-- Dependencies: 231
-- Data for Name: SolicitaCambio; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.solicitudes_cambio VALUES ('IVD87493', 'M001', true, 'Cambio solicitado por incompatibilidad de horario.', '2024-02-10', '2024-02-12');
INSERT INTO public.solicitudes_cambio VALUES ('IVD87494', 'M002', true, 'El alumno desea cambiar de materia debido a preferencia personal.', '2024-02-11', '2024-02-13');
INSERT INTO public.solicitudes_cambio VALUES ('IVD87495', 'M003', false, 'Solicita cambio debido a dificultad con el contenido.', '2024-02-12', NULL);
INSERT INTO public.solicitudes_cambio VALUES ('IVD87496', 'M004', true, 'El profesor recomendó cambio a otra materia más adecuada.', '2024-02-13', '2024-02-15');
INSERT INTO public.solicitudes_cambio VALUES ('IVD87497', 'M005', false, 'Cambio solicitado porque la materia no cumple expectativas.', '2024-02-14', NULL);
INSERT INTO public.solicitudes_cambio VALUES ('IVD87498', 'M006', true, 'Problemas con el equipamiento en la materia.', '2024-02-15', '2024-02-17');
INSERT INTO public.solicitudes_cambio VALUES ('IVD87499', 'M007', false, 'Cambio solicitado por exceso de carga académica.', '2024-02-16', NULL);
INSERT INTO public.solicitudes_cambio VALUES ('IVD87500', 'M008', true, 'Incompatibilidad con el horario de otras materias.', '2024-02-17', '2024-02-19');
INSERT INTO public.solicitudes_cambio VALUES ('IVD87501', 'M009', true, 'Cambio debido a problemas personales con el profesor.', '2024-02-18', '2024-02-20');
INSERT INTO public.solicitudes_cambio VALUES ('IVD87502', 'M010', false, 'El alumno no pudo conseguir el material necesario para la materia.', '2024-02-19', NULL);
INSERT INTO public.solicitudes_cambio VALUES ('IVD87503', 'M011', true, 'Cambio solicitado porque la materia no era lo esperado.', '2024-02-20', '2024-02-22');
INSERT INTO public.solicitudes_cambio VALUES ('IVD87504', 'M012', true, 'El estudiante cambió de especialización.', '2024-02-21', '2024-02-23');
INSERT INTO public.solicitudes_cambio VALUES ('IVD87505', 'M013', false, 'Cambio por falta de interés en el contenido del curso.', '2024-02-22', NULL);
INSERT INTO public.solicitudes_cambio VALUES ('IVD87506', 'M014', true, 'Cambio solicitado debido a sugerencia de asesor académico.', '2024-02-23', '2024-02-25');
INSERT INTO public.solicitudes_cambio VALUES ('IVD87507', 'M015', false, 'El alumno desea cambiar a una materia más avanzada.', '2024-02-24', NULL);

UPDATE public.profesores
SET estatus = 'active';

UPDATE public.grupos
SET
    lunes_inicio = '12:00',
    lunes_fin = '14:00',
    miercoles_inicio = '13:00',
    miercoles_fin = '14:00'
WHERE id_grupo = 'G003';

UPDATE public.grupos
SET
    martes_inicio = '12:00',
    martes_fin = '14:00',
    jueves_inicio = '08:00',
    jueves_fin = '10:00'
WHERE id_grupo = 'G004';
--
-- TOC entry 5025 (class 0 OID 16807)
-- Dependencies: 234
-- Data for Name: gruposs; Type: TABLE DATA; Schema: public; Owner: postgres
--



-- Completed on 2025-04-10 12:26:22

--
-- PostgreSQL database dump complete
--

