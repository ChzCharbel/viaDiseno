module.exports = (request, response, next) => {
    for (let privilegio of request.session.privilegios) {
        if (privilegio.nombre == 'Consultar todos los grupos') {
            return next();
        }
    }
    return response.status(403).send('Error 403');
}