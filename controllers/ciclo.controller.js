const CicloEscolar = require('../models/ciclos.model');

// Función GET para mostrar el formulario de inscripciones
exports.get_inscripciones_form = (req, res, next) => {
    const idCiclo = req.params.idCiclo;

    CicloEscolar.fetchOne(idCiclo)
        .then(result => {
            if (result.rows.length > 0) {
                const cicloEscolar = result.rows[0];
                res.render('fecha_inscripciones.ejs', {
                    cicloEscolar: cicloEscolar,
                    csrfToken: req.csrfToken(),
                });
            } else {
                res.status(404).send('Ciclo escolar no encontrado');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error al obtener el ciclo escolar');
        });
};

// Función POST para guardar las fechas de inscripción
exports.post_inscripciones = (req, res, next) => {
    const { fechaInicioInscripcion, fechaFinInscripcion } = req.body;
    const idCiclo = req.params.idCiclo;

    if (!fechaInicioInscripcion || !fechaFinInscripcion) {
        return res.status(400).send('Las fechas son requeridas');
    }

    CicloEscolar.updateInscripciones(idCiclo, fechaInicioInscripcion, fechaFinInscripcion)
        .then(() => {
            // Redirigir a la vista donde se muestran las fechas guardadas en grande
            res.redirect(`/inicio/inscripciones/${idCiclo}`);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error al guardar las fechas');
        });
};

// NUEVA función GET para mostrar las fechas guardadas en grande
exports.get_inscripciones_guardadas = (req, res, next) => {
    const idCiclo = req.params.idCiclo;

    CicloEscolar.fetchOne(idCiclo)
        .then(result => {
            if (result.rows.length > 0) {
                const cicloEscolar = result.rows[0];
                res.render('inscripcionGuardada.ejs', {
                    ciclo: cicloEscolar,
                    username: req.user?.nombre || 'Usuario' // cambia esto según cómo guardes el usuario
                });
            } else {
                res.status(404).send('Ciclo escolar no encontrado');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error al obtener los datos del ciclo');
        });
};