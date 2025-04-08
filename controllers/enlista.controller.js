const EnlistaModel = require('../models/enlista.model');

exports.get_enlista = (req, res, next) => {
    const matricula = req.session.matricula;
    if (!matricula) {
        return res.status(401).send('Sesión no iniciada.');
    }

    EnlistaModel.obtenerGruposDeAlumno(matricula)
    .then(result => {
        const grupos = result.rows.map(row => ({
          idGrupo: row.idGrupo,
          materia: {
            nombre: row.nombreMateria
          },
          profesor: {
            nombre: row.nombreProfesor
          },
          salon: {
            id: row.idSalon
          },
          // horarios según SQL (en minúsculas)
          lunesInicio: row.lunesInicio,
          lunesFin: row.lunesFin,
          martesInicio: row.martesInicio,
          martesFin: row.martesFin,
          miercolesInicio: row.miercolesInicio,
          miercolesFin: row.miercolesFin,
          juevesInicio: row.juevesInicio,
          juevesFin: row.juevesFin,
          viernesInicio: row.viernesInicio,
          viernesFin: row.viernesFin
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
            });
        })
        .catch(err => {
            console.error('Error al obtener grupos:', err);
            res.status(500).send('Error interno al cargar grupos del alumno');
        });
};
