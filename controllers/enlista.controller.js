const EnlistaModel = require('../models/enlista.model');

exports.get_enlista = (req, res, next) => {
    const matricula = req.session.matricula;
    if (!matricula) {
        return res.status(401).send('Sesión no iniciada.');
    }

    EnlistaModel.obtenerGruposDeAlumno(matricula)
    .then(result => {
        const grupos = result.rows.map(row => ({
          idGrupo: row.id_grupo,
          materia: {
            id: row.id_materia,
            nombre: row.nombre_materia
          },
          profesor: {
            nombre: row.nombre_profesor
          },
          salon: {
            id: row.id_salon
          },
          // horarios según SQL (en minúsculas)
          lunes_inicio: row.lunes_inicio,
          lunes_fin: row.lunes_fin,
          martes_inicio: row.martes_inicio,
          martes_fin: row.martes_fin,
          miercoles_inicio: row.miercoles_inicio,
          miercoles_fin: row.miercoles_fin,
          jueves_inicio: row.jueves_inicio,
          jueves_fin: row.jueves_fin,
          viernes_inicio: row.viernes_inicio,
          viernes_fin: row.viernes_fin
        }));
            res.render('horario_alumnos_regulares', { 
              grupos, 
              titulo: 'Horario de Clases', 
              privilegios: req.session.privilegios || [],
              carrera: req.session.carrera || '',
              ciclosEscolares: req.session.ciclosEscolares || [],
              cicloActual: req.params.idCiclo || '',
              username: req.session.username || '',
              mail: req.session.mail || '',
              rol: req.session.rol || '',
              matricula: req.session.matricula
            });
        })
        .catch(err => {
            console.error('Error al obtener grupos:', err);
            res.status(500).send('Error interno al cargar grupos del alumno');
        });
};
