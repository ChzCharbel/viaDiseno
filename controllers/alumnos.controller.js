const Alumno = require('../models/alumnos.model');

exports.get_horario_alumnos_regulares = (request, response, next) => {
    response.render('horario_alumnos_regulares.ejs', {
        titulo: 'alumnos_regulares',
        privilegios: request.session.privilegios || [],
        carrera: request.session.carrera || '',
        ciclosEscolares: request.session.ciclosEscolares || [],
            cicloActual: request.params.idCiclo || '',
        username: request.session.username || '',
        mail: request.session.mail || '',
        grupos: [],
        rol: request.session.rol || '',
    });
};


exports.get_alumnos = (request, response, next) => {
    console.log(request.session.matricula);
    console.log(request.session.privilegios);
    Alumno.fetchAll().then((alumnos) => {
        console.log(alumnos.rows);
        response.render('alumnos', {
            titulo: 'alumnos',
            privilegios: request.session.privilegios || [],
            alumnos: alumnos.rows,
            carrera: request.session.carrera || '',
            ciclosEscolares: request.session.ciclosEscolares || [],
            cicloActual: request.params.idCiclo || '',
            username: request.session.username || '',
            mail: request.session.mail || '',
            grupos: [],
            rol: request.session.rol || '',
        });

    }).catch((error) => {
        console.log(error);
        response.render('error.ejs');
    })
    
}; 

exports.get_buscar = (request, response, next) => {
    Alumno.find(request.params.nombre)
        .then((alumno) => {
            response.status(200).json({alumno:alumno.rows});
        }).catch((error) => {
            response.status(500).json({message: "Alumno no encontrado"});
        });
}

exports.get_horario_alumnos_irregulares = (request, response, next) => {
    response.render('horario_alumnos_irregulares.ejs', {
        titulo: 'alumnos_irregulares',
        carrera: request.session.carrera || '',
        ciclosEscolares: request.session.ciclosEscolares || [],
        cicloActual: request.params.idCiclo || '',
        privilegios: request.session.privilegios || [],
        username: request.session.username || '',
        mail: request.session.mail || '',
        grupos: [],
        rol: request.session.rol || '',
    });
};