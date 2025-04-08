module.exports = (request, response, next) => {
    for (let privilegio of request.session.privilegios) {
        if (privilegio.nombre == 'Registrar disponibilidad de profesores') {
            return next();
        }
    }
    return response.status(403).send('Error 403');
}