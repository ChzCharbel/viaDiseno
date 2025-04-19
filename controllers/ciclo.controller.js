const CicloEscolar = require('../models/ciclos.model');
const { getCiclosEscolares } = require('../util/admin.api.client');


// Función GET para mostrar el formulario de inscripciones
exports.get_inscripciones_form = (req, res, next) => {
    const idCiclo = req.params.idCiclo;
    CicloEscolar.sincronizarCiclosEscolaresDesdeAPI();

    CicloEscolar.fetchOne(idCiclo)
        .then(result => {
            if (result.rows.length > 0) {
                const cicloEscolar = result.rows[0];
                res.render('fecha_inscripciones.ejs', {
                    cicloEscolar: cicloEscolar,
                    csrfToken: req.csrfToken(),
                    cicloActual: idCiclo, 
                    username: req.user?.nombre || 'Usuario'
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
    console.log('Entrando a post_inscripciones');

    const { fechaInicioInscripcion, fechaFinInscripcion } = req.body;
    const idCiclo = req.params.idCiclo;

    console.log('Datos recibidos:');
    console.log('Inicio Inscripción:', fechaInicioInscripcion);
    console.log('Fin Inscripción:', fechaFinInscripcion);
    console.log('ID Ciclo:', idCiclo);

    if (!fechaInicioInscripcion || !fechaFinInscripcion) {
        console.warn('Fechas de inscripción no proporcionadas');
        return res.status(400).send('Las fechas de inscripción son requeridas');
    }

    CicloEscolar.updateInscripciones(idCiclo, fechaInicioInscripcion, fechaFinInscripcion)
        .then(() => {
            const destino = `/inicio/${idCiclo}`;
            console.log('Redirigiendo a:', destino);
            res.redirect(destino);
        })
        .catch(err => {
            console.error('Error al guardar inscripción:', err);
            res.status(500).send('Error al guardar inscripción');
        });
};

// Función GET para mostrar las fechas guardadas en grande
exports.get_inscripciones_guardadas = (req, res, next) => {
    const idCiclo = req.params.idCiclo;

    CicloEscolar.fetchOne(idCiclo)
        .then(result => {
            if (result.rows.length > 0) {
                const cicloEscolar = result.rows[0];
                res.render('includes/_fechas_inscritas.ejs', {
                    ciclo: cicloEscolar,
                    cicloActual: idCiclo,
                    username: req.user?.nombre || 'Usuario'
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