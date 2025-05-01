const OfertaAcademica = require('../models/oferta.model');
const Materia = require('../models/materias.model');
const Oferta = require('../models/oferta.model');

exports.get_oferta = (request, response, next) => {
    Promise.all([
        Materia.sincronizarCarrerasDesdeAPI(),
    ]).then(([dataCarreras]) => {
        Materia.sincronizarPlanesDesdeAPI().then((dataPlanes) => {
            Oferta.fetchAll(request.params.idCiclo, request.session.carrera).then((materiasOfertadas) => {
            console.log(dataCarreras + '\n' + dataPlanes);
            response.render('oferta_academica.ejs',{
            titulo: 'oferta_academica',
            privilegios: request.session.privilegios || [],
            materias: materiasOfertadas.rows || [],
            carrera: request.session.carrera || '',
            ciclosEscolares: request.session.ciclosEscolares || [],
            cicloActual: request.params.idCiclo || '',
            username: request.session.username || '',
            mail: request.session.mail || '',
            editar: false,
            planes: [],
            planActual: request.params.idPlan || '',
            rol: request.session.rol || '',
            });
            }).catch((error) => {
                console.log(error);
            })
        }).catch((error) => {
            console.log(error);
        });
        
    }).catch((error) => {
        console.log(error);
    })
}

exports.get_editar = (request, response, next) => {
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
        editar: true,
        planes: [],
        planActual: request.params.idPlan || '',
        rol: request.session.rol || '',
    });
    }).catch((error) => {
        console.log(error);
    })
}

exports.post_editar = (request, response, next) => {
    const bloqueSemestres = request.body.bloqueSemestres;
    const materiasActualizar = request.body.idMateriasActualizar;
    const arregloSemestres = bloqueSemestres.split(',');
    const arregloMateriasActualizar = materiasActualizar.split(',');
    arregloSemestres.pop();
    arregloMateriasActualizar.pop();
    console.log(arregloMateriasActualizar);
    console.log(arregloSemestres);
    Oferta.editarSemestre(arregloMateriasActualizar, arregloSemestres);
    response.redirect('/oferta_academica/' + request.params.idCiclo + '/plan_version')
}

exports.get_agregar = (request, response, next) => {
    Promise.all([
        Materia.sincronizarDesdeAPI(),
        Materia.fetchPlanesByDegree(request.session.carrera),
        //Materia.fetchByDegree(request.session.carrera),
        ]).then(([data, planVersiones]) => {
            Materia.sincronizarPlanesMaterias().then((dataPlanesMaterias) => {
                console.log(data);
                console.log(dataPlanesMaterias);
                Materia.fetchAll(request.params.idCiclo).then((materias) => {
                    console.log(materias.length);
                    response.render('oferta_agregar.ejs',{
                    titulo: 'oferta_academica_agregar',
                    info: request.session.info || '',
                    error: request.session.error || '',
                    privilegios: request.session.privilegios || [],
                    csrfToken: request.csrfToken(),
                    materias: materias,
                    carrera: request.session.carrera || '',
                    ciclosEscolares: request.session.ciclosEscolares || [],
                    cicloActual: request.params.idCiclo || '',
                    username: request.session.username || '',
                    mail: request.session.mail || '',
                    planes: planVersiones.rows || [],
                    planActual: request.params.idPlan || '',
                    rol: request.session.rol || '',
                    })
                }).catch((error) => {
                    console.log(error);
                })
                
            }).catch((error) => {
                console.log(error);
            });
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
    miOferta.save().then(() => {
        request.session.info = `La oferta ha sido guardada exitosamente`;
        const rutaRedirect = '/oferta_academica/' + request.params.idCiclo + '/' + request.params.idPlan + '/agregar';
        response.redirect(rutaRedirect);
    }).catch((error) => {
        request.session.error = `Ocurrió un error al intentar guardar la oferta, inténtelo de nuevo`
        console.log(error);
    });
}

exports.delete_materia = (request, response, next) => {
    const idPlanMateria = request.params.idPlanMateria;
    
    OfertaAcademica.eliminarMateriaPorId(idPlanMateria)
      .then(() => {
        console.log('Eliminación exitosa');
        response.status(200).json({ mensaje: 'Materia eliminada correctamente' });
      })
      .catch((error) => { console.log(error);
        console.error('Error al eliminar la materia',error);
        response.status(500).json({ mensaje: 'Error al eliminar la materia' });
      });
  };