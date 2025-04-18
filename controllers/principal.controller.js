exports.get_principal = (req, res, next) => {
    const idCiclo = req.params.idCicloEscolar;
  
    res.render("principal.ejs", {
      titulo: "principal",
      cicloActual: idCiclo,
      privilegios: req.session.privilegios || [],
      carrera: req.session.carrera || "",
      username: req.session.username || "",
      rol: req.session.rol || "",
      mail: req.session.mail || "",
      ciclosEscolares: req.session.ciclosEscolares || [] 
    });
  };
  