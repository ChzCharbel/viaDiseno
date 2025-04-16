exports.get_profesores = (req, res, next) => {
    Promise.all([Profesor.fetchAll(), Materia.fetchAll()])
      .then(([profesores, materias]) => {
        
        console.log("Profesores →", profesores.rows);
        console.log("Materias →", materias.rows);
  
        res.render('profesores.ejs', {
          profesores: profesores.rows,
          materiasAdmin: materias.rows,
        });
      })
      .catch(err => {
        console.error('Error:', err);
        res.status(500).send('Error interno.');
      });
  };  