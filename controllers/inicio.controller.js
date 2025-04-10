exports.get_inscripciones_guardadas = (req, res, next) => {
    const idCiclo = req.params.idCiclo;

    CicloEscolar.fetchOne(idCiclo)
        .then(result => {
            if (result.rows.length > 0) {
                const ciclo = result.rows[0]; 

                res.render('inscripcionGuardada.ejs', {
                    ciclo: ciclo,
                    username: req.user?.nombre || 'Usuario'
                });
            } else {
                res.status(404).send('Ciclo escolar no encontrado');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error al obtener los datos del ciclo');
        });
};