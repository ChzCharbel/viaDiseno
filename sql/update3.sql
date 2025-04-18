-- Por si no los deja agregar solicitudes por el id que es serial
SELECT setval('solicitudes_cambio_id_solicitud_seq', (SELECT MAX(id_solicitud) FROM solicitudes_cambio));

-- Para que sepan si tienen materias en el ciclo escolar actual (que es 22)
SELECT m.id_materia, m.materia
FROM ciclos_escolares_materias cem
JOIN planes_materias pm ON cem.id_plan_materia = pm.id_plan_materia
JOIN materias m ON pm.id_materia = m.id_materia
WHERE cem.id_ciclo_escolar = 22;