const Materia = require('../models/materias.model');
const Oferta = require('../models/oferta.model');

exports.get_oferta = (request, response, next) => {
    Oferta.fetchAll(request.params.idCiclo, request.session.carrera).then((materiasOfertadas) => {
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
    Promise.all([
        Materia.sincronizarDesdeAPI(),
        Materia.fetchPlanesByDegree(request.session.carrera),
        Materia.fetchByDegree(request.session.carrera),
        ]).then(([data, planVersiones, materias]) => {
            console.log(data);
            response.render('oferta_agregar.ejs',{
                titulo: 'oferta_academica_agregar',
                privilegios: request.session.privilegios || [],
                csrfToken: request.csrfToken(),
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
    }).catch((error) => {
        console.log(error);
    });
}

exports.post_agregar = (request, response, next) => {
    console.log('Id de las materias del ciclo ' + request.params.idCiclo + ': ')
    console.log(request.body.idMateriasAgregar);
    const idMaterias = [];
    stringIds = request.body.idMateriasAgregar.split(',');
    for (let id of stringIds) {
        if (id != '') {
            idMaterias.push(id);
        }
    }
    const miOferta = new Oferta(request.params.idCiclo, idMaterias);
    miOferta.save();
}