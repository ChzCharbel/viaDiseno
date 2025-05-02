const crearGrupos = require('../models/createGroups.model');
const Oferta = require('../models/oferta.model');
const Materia = require('../models/materias.model');
const Salon = require('../models/salones.model');

exports.get_opciones = (request, response, next) => {
    try {
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
    } catch (error) {
        console.error('Error en get_opciones:', error);
        response.status(500).send('Error al cargar opciones de grupos. Por favor, intente nuevamente.');
    }
}

exports.get_creados = (request, response, next) => {
    try {
        Oferta.fetchAll(request.params.idCiclo, request.session.carrera).then((ofertaAcademica) => {
            crearGrupos.fetchAll(request.params.idCiclo).then((grupos) => {
                Materia.getMateriasConProfesorPorCiclo(request.params.idCiclo).then((profesMaterias) => {
                    try {
                        response.render('grupos_creados.ejs', {
                            titulo: "crear_grupos",
                            privilegios: request.session.privilegios || [],
                            carrera: request.session.carrera || "",
                            profesores: request.session.profesores || [],
                            grupos: grupos.rows || [],
                            ofertaAcademica: ofertaAcademica.rows || [],
                            profesoresMaterias: profesMaterias || [],
                            ciclosEscolares: request.session.ciclosEscolares || [],
                            cicloActual: request.params.idCiclo || "",
                            username: request.session.username || "",
                            mail: request.session.mail || "",
                            rol: request.session.rol || "",
                            csrfToken: request.csrfToken ? request.csrfToken() : "",
                        });
                    } catch (renderError) {
                        console.error('Error al renderizar vista:', renderError);
                        response.status(500).send('Error al cargar la página de grupos');
                    }
                }).catch((error) => {
                    console.error('Error al obtener profesores-materias:', error);
                    response.status(500).send('Error al cargar datos de profesores-materias');
                });
            }).catch((error) => {
                console.error('Error al obtener grupos:', error);
                response.status(500).send('Error al cargar datos de grupos');
            });
        }).catch((error) => {
            console.error('Error al obtener oferta académica:', error);
            response.status(500).send('Error al cargar datos de oferta académica');
        });
    } catch (error) {
        console.error('Error general en get_creados:', error);
        response.status(500).send('Error al procesar la solicitud');
    }
}

exports.get_crear = (request, response, next) => {
    console.log('Creando grupos...');
    try {
        crearGrupos.inicializar();
        crearGrupos.getProfes(request.params.idCiclo, request.session.carrera).then(() => {
            response.redirect('/grupos/creados/' + request.params.idCiclo);
        }).catch((error) => {
            console.error('Error al crear grupos:', error);
            response.status(500).send('Error al crear grupos. Por favor, intente nuevamente.');
        });
    } catch (error) {
        console.error('Error general en get_crear:', error);
        response.status(500).send('Error al procesar la solicitud de creación de grupos');
    }
}

exports.get_rechazar = (request, response, next) => {
    try {
        crearGrupos.rollbackDisponibilidadProfe(request.params.idCicloMateria).then(() => {
            response.redirect('/grupos/creados/' + request.params.idCiclo);
        }).catch((error) => {
            console.error('Error al rechazar grupo:', error);
            response.status(500).send('Error al rechazar grupo. Por favor, intente nuevamente.');
        });
    } catch (error) {
        console.error('Error general en get_rechazar:', error);
        response.status(500).send('Error al procesar la solicitud de rechazo de grupo');
    }
}

exports.get_confirmar = (request, response, next) => {
    // inicializar el objeto
    crearGrupos.inicializar();
    response.redirect('/materias/' + request.params.idCiclo);
}

exports.get_asignadas_automaticamente = (request, response, next) => {
    crearGrupos.fetchAll(request.params.idCiclo).then((grupos) => {
        Salon.fetchAll().then((salones) => {
        response.render('materias_asignadas_autom.ejs', {
            titulo: 'materias_asignadas_autom' || '',
            materias: grupos.rows || [],
            salones: salones.rows || [],
            privilegios: request.session.privilegios || [],
            csrfToken: request.csrfToken(),
            carrera: request.session.carrera || '',
            ciclosEscolares: request.session.ciclosEscolares || [],
            cicloActual: request.params.idCiclo || '',
            username: request.session.username || '',
            mail: request.session.mail || '',
            rol: request.session.rol || '',
        });
        }).catch((error) => {
            console.log(error);
        })
    }).catch((error) => {
        console.log(error);
    })
}