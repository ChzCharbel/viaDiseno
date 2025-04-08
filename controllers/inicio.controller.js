const ciclosModel = require('../models/ciclos.model.js');

exports.get_inicio = (request, response, next) => {
    const idCiclo = request.params.idCiclo || '';

    console.log('CICLO ESCOLAR RUTA: ' + idCiclo);
    ciclosModel.fetchAll()
        .then(result => {
            const ciclosEscolares = result.rows;

            response.render('inicio.ejs', {
                titulo: 'inicio',
                privilegios: request.session.privilegios || [],
                carrera: request.session.carrera || '',
                ciclosEscolares: ciclosEscolares,
                cicloActual: idCiclo,
                username: request.session.username || '',
                mail: request.session.mail || '',
                rol: request.session.rol || '',
            });
        })
        .catch(err => {
            console.error('Error al obtener ciclos escolares:', err);
            response.status(500).send('Error interno al cargar ciclos escolares');
        });
    };


exports.post_guardar = (request, response, next) => {
    const idCicloEscolar = request.params.idCiclo;
    const { fechaInicio, fechaFin } = request.body;


    const ciclo = new ciclosModel(idCicloEscolar, fechaInicio, fechaFin);

  ciclo.save()
    .then(() => response.redirect('/inicio/' + idCicloEscolar))
    .catch(err => {
      console.error('Error al guardar inscripción:', err);
      response.status(500).send('Error al guardar inscripción');
    });
};