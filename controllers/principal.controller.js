const EstadisticasModel = require("../models/principal.model");
const crearGrupos = require('../models/createGroups.model');
const Oferta = require('../models/oferta.model');

exports.get_principal = async (req, res, next) => {
  const idCiclo = req.params.idCicloEscolar;

  try {
    const materiasPorSemestre = await EstadisticasModel.getMateriasPorSemestre(idCiclo);
    const alumnosInscritos = await EstadisticasModel.getAlumnosInscritos();
    const regularesIrregulares = await EstadisticasModel.getRegularesVsIrregulares();
    const ofertaAcademica = await Oferta.fetchAll(req.params.idCiclo, req.session.carrera);
    const grupos = await crearGrupos.fetchAll(req.params.idCiclo);
    
    let inscritos = 0;
    let noInscritos = 0;

    alumnosInscritos.forEach(row => {
      if(row.inscrito) inscritos = parseInt(row.total);
      else noInscritos = parseInt(row.total);
      
    });
   

    res.render("principal.ejs", {
      titulo: "principal",
      cicloActual: idCiclo,
      privilegios: req.session.privilegios || [],
      carrera: req.session.carrera || "",
      username: req.session.username || "",
      rol: req.session.rol || "",
      mail: req.session.mail || "",
      grupos: grupos.rows || [],
      ofertaAcademica: ofertaAcademica.rows || [],
      ciclosEscolares: req.session.ciclosEscolares || [],
      materiasPorSemestre, 
      inscritos,
      noInscritos,
      regularesIrregulares
    });
  } catch (err) {
    console.error("Error al cargar la vista principal:", err);
    res.status(500).send("Error interno del servidor");
  }
};