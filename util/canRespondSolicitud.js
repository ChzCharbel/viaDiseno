module.exports = (request, response, next) => {
    for (let privilegio of request.session.privilegios) {
        if (privilegio.nombre == 'Contestar solicitud de cambio') {
            return next();
        }
    }
    return response.status(403).send('Error 403');
}