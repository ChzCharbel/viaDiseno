const EnlistaModel = require('../models/enlista.model');

exports.get_enlista = (req, res, next) => {
  const matricula = req.session.matricula;
  if (!matricula) {
    return res.status(401).send('Sesión no iniciada.');
  }

  EnlistaModel.obtenerGruposDeAlumno(matricula)
    .then(grupos => {
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
        matricula: req.session.matricula,
        csrfToken: req.csrfToken() 
      });
    })
    .catch(err => {
      console.error('Error al obtener grupos:', err);
      res.status(500).send('Error interno al cargar grupos del alumno');
    });
};
