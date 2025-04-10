const Materia = require('../models/materias.model');
const Oferta = require('../models/oferta.model');

exports.get_oferta = (request, response, next) => {
    Oferta.fetchAll(request.params.idCiclo).then((materiasOfertadas) => {
        response.render('oferta_academica.ejs',{
        titulo: 'oferta_academica',
        privilegios: request.session.privilegios || [],
        materias: materiasOfertadas.rows || [],
        carrera: request.session.carrera || '',
        ciclosEscolares: request.session.ciclosEscolares || [],
        cicloActual: request.params.idCiclo || '',
        username: request.session.username || '',
        mail: request.session.mail || '',
        planes: [],
        planActual: request.params.idPlan || '',
        rol: request.session.rol || '',
    })   
    }).catch((error) => {
        console.log(error);
    });
}

exports.get_agregar = (request, response, next) => {
    //necesito el id del ciclo escolar y el de la materia en la ruta
    Materia.fetchByDegree(request.session.carrera).then((data) => {
    const materias = data[0];
    const planVersiones = data[1];
    response.render('oferta_academica.ejs',{
        titulo: 'oferta_academica',
        privilegios: request.session.privilegios || [],
        materias: materias,
        carrera: request.session.carrera || '',
        ciclosEscolares: request.session.ciclosEscolares || [],
        cicloActual: request.params.idCiclo || '',
        username: request.session.username || '',
        mail: request.session.mail || '',
        planes: planVersiones || [],
        planActual: request.params.idPlan || '',
        rol: request.session.rol || '',
    })    
    })
    
}

exports.post_agregar = (request, response, next) => {

}