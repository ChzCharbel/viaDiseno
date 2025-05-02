const Materia = require('../models/materias.model');
const Profesor = require('../models/profesores.model');
const Salon = require('../models/salones.model');
const GrupoHorario = require('../models/grupos_horarios.model');
const Horario = require('../models/horarios.model');
const { getAllCourses } = require('../util/admin.api.client');
const db = require('../util/database');


exports.get_materias = async (request, response, next) => {
    try {
        const materias = await Materia.getMateriasPorCiclo(request.params.idCiclo);
        const profesores = await Profesor.fetchAll();
        const salones = await Salon.fetchAll();
        const grupos_horarios = await GrupoHorario.fetchAll();
        
        // Si hay materias, recuperamos sus horarios
        if (materias && materias.length > 0) {
            // Para cada materia, obtenemos su horario
            for (let i = 0; i < materias.length; i++) {
                const horario = await Horario.getHorariosDeGrupo(materias[i].id);
                materias[i].horario = horario;
            }
        }

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
    } catch (error) {
        console.log(error);
        response.status(500).render('error.ejs', {
            titulo: 'Error',
            mensaje: 'Ocurrió un error al cargar los datos'
        });
    }
};

exports.guardarHorario = async (req, res) => {
    const id_grupo = parseInt(req.body.id_grupo);
    const id_ciclo_escolar = parseInt(req.body.id_ciclo_escolar);
    const id_salon = parseInt(req.body.id_salon);
    
    console.log("Recibida solicitud para guardar horario:", {
      id_grupo,
      id_ciclo_escolar,
      id_salon,
      body: req.body
    });
    
    if (isNaN(id_ciclo_escolar) || isNaN(id_salon)) {
        return res.status(400).send("Faltan datos obligatorios para guardar el horario.");
    }

    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  
    try {
      // Eliminamos los horarios actuales para este grupo si existen
      // Esto nos asegura que no haya duplicados
      try {
        await db.query(`
          DELETE FROM grupos_horarios 
          WHERE id_grupo = $1
        `, [id_grupo]);
      } catch (deleteErr) {
        console.error('Error al eliminar horarios existentes:', deleteErr);
      }
      for (let i = 0; i < dias.length; i++) {
        const diaOriginal = req.body[`dia_${i}`];
        const hora_inicio = req.body[`hora_inicio_${i}`];
        const hora_fin = req.body[`hora_fin_${i}`];
  
        if (hora_inicio && hora_fin) {
          let diaNormalizado = diaOriginal.toLowerCase();
          if (diaNormalizado === 'miércoles') {
            diaNormalizado = 'miercoles';
          }
          
          console.log(`Guardando horario para el día ${diaNormalizado}: ${hora_inicio} - ${hora_fin}`);
          await GrupoHorario.guardarHoras(
            id_grupo,
            id_salon,
            diaNormalizado,
            hora_inicio,
            hora_fin
          );
        }
      }
  
      res.redirect(`/materias/${id_ciclo_escolar}`);
    } catch (err) {
      console.error('Error al guardar horarios:', err);
      res.status(500).send("Error al guardar horarios");
    }
  };