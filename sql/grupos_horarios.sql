--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-04-18 02:12:28

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
-- TOC entry 4973 (class 0 OID 17394)
-- Dependencies: 241
-- Data for Name: grupos_horarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.grupos_horarios VALUES (5, 2, 'lunes', '12:00:00', '14:00:00');
INSERT INTO public.grupos_horarios VALUES (6, 9, 'jueves', '09:00:00', '11:00:00');
INSERT INTO public.grupos_horarios VALUES (7, 1, 'lunes', '07:00:00', '09:00:00');
INSERT INTO public.grupos_horarios VALUES (9, 3, 'martes', '07:30:00', '09:30:00');
INSERT INTO public.grupos_horarios VALUES (10, 4, 'martes', '10:00:00', '12:00:00');
INSERT INTO public.grupos_horarios VALUES (11, 5, 'miércoles', '08:00:00', '10:00:00');
INSERT INTO public.grupos_horarios VALUES (12, 6, 'miércoles', '11:00:00', '13:00:00');
INSERT INTO public.grupos_horarios VALUES (13, 7, 'jueves', '07:30:00', '10:00:00');
INSERT INTO public.grupos_horarios VALUES (14, 8, 'jueves', '12:00:00', '14:00:00');
INSERT INTO public.grupos_horarios VALUES (16, 10, 'viernes', '13:00:00', '15:00:00');
INSERT INTO public.grupos_horarios VALUES (17, 11, 'lunes', '08:00:00', '10:00:00');
INSERT INTO public.grupos_horarios VALUES (18, 1, 'martes', '10:30:00', '12:30:00');
INSERT INTO public.grupos_horarios VALUES (19, 2, 'miércoles', '07:00:00', '09:00:00');
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
INSERT INTO public.grupos_horarios VALUES (2, 9, 'martes', '10:00:00', '12:00:00');
INSERT INTO public.grupos_horarios VALUES (20, 3, 'jueves', '11:00:00', '13:00:00');


--
-- TOC entry 4979 (class 0 OID 0)
-- Dependencies: 240
-- Name: grupos_horarios_id_grupo_horario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.grupos_horarios_id_grupo_horario_seq', 1, false);


-- Completed on 2025-04-18 02:12:28

--
-- PostgreSQL database dump complete
--

