exports.get_planes = (request, response, next) => {
    console.log('usuario: ' + request.session.username);
    response.render('plan.ejs', {
        titulo: 'planes',
        privilegios: request.session.privilegios || [],
        carrera: request.session.carrera || '',
        ciclosEscolares: request.session.ciclosEscolares || [],
        cicloActual: request.params.idCiclo || '',
        username: request.session.username || '',
        mail: request.session.mail || '',
        rol: request.session.rol || '',
    });
};