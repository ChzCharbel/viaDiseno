const CicloEscolar = require('../models/ciclos.model');

// Función GET para mostrar el formulario de inscripciones
exports.get_inscripciones_form = (req, res, next) => {
    const idCiclo = req.params.idCiclo;

    // Consultamos el ciclo escolar por su id
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

    // Validar que las fechas sean correctas
    if (!fechaInicioInscripcion || !fechaFinInscripcion) {
        return res.status(400).send('Las fechas son requeridas');
    }

    // Actualizar las fechas de inscripción del ciclo escolar
    CicloEscolar.updateInscripciones(idCiclo, fechaInicioInscripcion, fechaFinInscripcion)
        .then(() => {
            res.redirect(`/inicio/${idCiclo}`); // Redirigir a la página del ciclo escolar
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error al guardar las fechas');
        });
};
