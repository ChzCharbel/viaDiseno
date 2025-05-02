const crearGrupos = require('../models/createGroups.model');
const Oferta = require('../models/oferta.model');

exports.get_opciones = (request, response, next) => {
    response.render('crear_grupos.ejs', {
        titulo: "crear_grupos_opciones",
        privilegios: request.session.privilegios || [],
        carrera: request.session.carrera || "",
        profesores: request.session.profesores || [],
        ciclosEscolares: request.session.ciclosEscolares || [],
        cicloActual: request.params.idCiclo || "",
        username: request.session.username || "",
        mail: request.session.mail || "",
        rol: request.session.rol || "",
        csrfToken: request.csrfToken(),
    });
}

exports.get_creados = (request, response, next) => {
    Oferta.fetchAll(request.params.idCiclo, request.session.carrera).then( (ofertaAcademica) => {
        crearGrupos.fetchAll(request.params.idCiclo).then((grupos) => {
            response.render('grupos_creados.ejs', {
                titulo: "crear_grupos",
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
    console.log('Creando grupos...');
    crearGrupos.getProfes(request.params.idCiclo, request.session.carrera).then(() => {
        response.redirect('/grupos/creados/' + request.params.idCiclo);
    }).catch((error) => {
        console.log(error);
    });
}

exports.get_rechazar = (request, response, next) => {
    crearGrupos.rollbackDisponibilidadProfe(request.params.idCicloMateria).then(() => {
        response.redirect('/grupos/creados/' + request.params.idCiclo);
    }).catch((error) => {
        console.log(error);
    });
}