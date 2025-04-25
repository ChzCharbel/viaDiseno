const crearGrupos = require('../models/createGroups.model');
const Oferta = require('../models/oferta.model');

exports.get_creados = (request, response, next) => {
    Oferta.fetchAll(request.params.idCiclo, request.session.carrera).then( (ofertaAcademica) => {
        console.log(ofertaAcademica.rows)
        crearGrupos.fetchAll(request.params.idCiclo).then((grupos) => {
            response.render('grupos_creados.ejs', {
                titulo: "grupos",
                privilegios: request.session.privilegios || [],
                carrera: request.session.carrera || "",
                profesores: request.session.profesores || [],
                grupos: grupos.rows || [],
                ofertaAcademica: ofertaAcademica.rows || [],
                ciclosEscolares: request.session.ciclosEscolares || [],
                cicloActual: request.params.idCiclo || "",
                username: request.session.username || "",
                mail: request.session.mail || "",
                rol: request.session.rol || "",
                csrfToken: request.csrfToken(),
            });
        });
    }).catch( (error) => {
        console.log(error);
    })
    
}

exports.get_crear = (request, response, next) => {
    //crearGrupos.getProfes();
    console.log('Creando grupos...')

}