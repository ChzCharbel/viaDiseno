const Alumno = require('../models/alumnos.model');
const Enlista = require('../models/enlista.model');


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
    Promise.all([
        Alumno.sincronizarDesdeAPI(),
    ]).then(([data]) => {
        console.log(data);
        Alumno.fetchAll().then((alumnos) => {
            // Si es una petición AJAX, devolver JSON
        if (request.xhr || request.headers['x-requested-with'] === 'XMLHttpRequest') {
            return response.status(200).json({ alumnos: alumnos.rows });
        }
        
        // Si no es AJAX, renderizar la vista normal
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
        })
        
    }).catch((error) => {
        console.log(error);
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

exports.get_horario = (request, response, next) => {
    Promise.all([
        Enlista.obtenerGruposDeAlumno(request.params.idIVD),
        Alumno.fetchOne(request.params.idIVD),
    ]).then(([gruposAlumno, alumno]) => {
        response.render('horario_alumno.ejs', {
            titulo: 'alumnos',
            privilegios: request.session.privilegios || [],
            alumno: alumno.rows || [],
            editar: false,
            carrera: request.session.carrera || '',
            ciclosEscolares: request.session.ciclosEscolares || [],
            cicloActual: request.params.idCiclo || '',
            username: request.session.username || '',
            mail: request.session.mail || '',
            grupos: gruposAlumno,
            rol: request.session.rol || '',
        })
    }).catch((error) => {
        console.log(error);
    })
}

exports.get_editar_horario = (request, response, next) => {
    Promise.all([
        Enlista.obtenerGruposDeAlumno(request.params.idIVD),
        Alumno.fetchOne(request.params.idIVD),
    ]).then(([gruposAlumno, alumno]) => {
        console.log(gruposAlumno)
        response.render('horario_alumno.ejs', {
            titulo: 'alumnos',
            privilegios: request.session.privilegios || [],
            alumno: alumno.rows || [],
            editar: true,
            carrera: request.session.carrera || '',
            ciclosEscolares: request.session.ciclosEscolares || [],
            cicloActual: request.params.idCiclo || '',
            username: request.session.username || '',
            mail: request.session.mail || '',
            grupos: gruposAlumno,
            rol: request.session.rol || '',
        })
    }).catch((error) => {
        console.log(error);
    })
}

exports.get_eliminar_grupo = (request, response, next) => {
    Alumno.eliminarMateria(request.params.idIVD, request.params.idMateria, request.params.idCiclo).then((data) => {
        response.redirect('/alumnos/' + request.params.idCiclo + '/horario/' + request.params.idIVD + '/editar');
    }).catch((error) => {
        console.log(error);
    });
}