const Materia = require('../models/materias.model');
const Profesor = require('../models/profesores.model');
const Salon = require('../models/salones.model');
const GrupoHorario = require('../models/grupos_horarios.model');
const { getAllCourses } = require('../util/admin.api.client');

exports.get_materias = (request, response, next) => {
    Promise.all([
        Materia.getAllCourses(),
        Profesor.fetchAll(),
        Salon.fetchAll(),

        GrupoHorario.fetchAll()
    ]).then(([materias, profesores, salones, grupos_horarios]) => {
        response.render('materias.ejs', {
            titulo: 'Grupos',
            materias: materias || [],
            privilegios: request.session.privilegios || [],
            profesores: profesores.rows || [],
            salones: salones.rows || [],
            grupos_horarios: grupos_horarios.rows || [],
            carrera: request.session.carrera || '',
            ciclosEscolares: request.session.ciclosEscolares || [],
            cicloActual: request.params.idCiclo || '',
            username: request.session.username || '',
            mail: request.session.mail || '',
            rol: request.session.rol || '',
            csrfToken: request.csrfToken()
        });
    }).catch((error) => {
        console.log(error);
        response.status(500).render('error.ejs', {
            titulo: 'Error',
            mensaje: 'Ocurrió un error al cargar los datos'
        });
    });
};


exports.post_guardar_horario = (req, res) => {
    const idGrupo = req.body.id_grupo;
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    const inserciones = dias.map((dia, index) => {
        const horaInicio = req.body[`hora_inicio_${index}`];
        const horaFin = req.body[`hora_fin_${index}`];

        if (horaInicio && horaFin) {
            return gruposHorariosModel.guardar({
                id_grupo: idGrupo,
                dia_semana: dia,
                hora_inicio: horaInicio,
                hora_fin: horaFin
            });
        } else {
            return Promise.resolve(); // No se asignó horario ese día
        }
    });

    Promise.all(inserciones)
        .then(() => res.redirect('/materias')) // o redirige según convenga
        .catch(err => {
            console.error('Error guardando horarios:', err);
            res.status(500).send('Error al guardar los horarios');
        });
};

exports.guardarHorario = async (req, res) => {
    const id_grupo = 1;
    const id_ciclo_escolar = 1
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  
    try {
      for (let i = 0; i < dias.length; i++) {
        const dia = req.body[`dia_${i}`];
        const hora_inicio = req.body[`hora_inicio_${i}`];
        const hora_fin = req.body[`hora_fin_${i}`];
  
        // Si ambas horas están definidas, guardar
        if (hora_inicio && hora_fin) {
          await GrupoHorario.guardarHoras(id_grupo, id_ciclo_escolar, dia, hora_inicio, hora_fin);
        }
      }
  
      res.redirect('/ruta-donde-quieras-ir');
    } catch (err) {
      console.error('Error al guardar horarios:', err);
      res.status(500).send("Error al guardar horarios");
    }
  };
  