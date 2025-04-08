const Materia = require('../models/materias.model');

exports.get_oferta = (request, response, next) => {
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

exports.get_agregar = (request, response, next) => {
    //necesito el id del ciclo escolar y el de la materia en la ruta
    
}

exports.post_agregar = (request, response, next) => {

}