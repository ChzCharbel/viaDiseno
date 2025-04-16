const Disponible = require("../models/disponible.model");
 
 exports.guardarDisponibilidad = async (req, res) => {
   try {
     const data = req.body;
     await Disponible.guardar(data);
     res.status(200).json({ message: "Horario guardado exitosamente" });
   } catch (error) {
     console.error("Error al guardar disponibilidad:", error);
     res.status(500).json({ message: "Error al guardar horario" });
   }
 };

 exports.obtenerDisponibilidades = async (req, res) => {
  try {
    const idCicloEscolar = req.params.idCiclo || req.session.cicloActual;
    const disponibilidades = await Disponible.obtenerTodasDisponibilidades(idCicloEscolar);
    res.status(200).json(disponibilidades);
  } catch (error) {
    console.error("Error al obtener disponibilidades:", error);
    res.status(500).json({ message: "Error al obtener horarios disponibles" });
  }
};

exports.obtenerDisponibilidadProfesor = async (req, res) => {
  try {

    const idCicloEscolar = req.params.idCiclo || req.session.cicloActual;
    const matriculaProfesor = req.params.matriculaProfesor;
    
    if (!matriculaProfesor) {
      return res.status(400).json({ message: "Matrícula de profesor requerida" });
    }
    
    console.log(`Obteniendo disponibilidad para profesor ${matriculaProfesor} en ciclo ${idCicloEscolar}`);
    
    const disponibilidad = await Disponible.obtenerDisponibilidad(idCicloEscolar, matriculaProfesor);
    
    if (!disponibilidad) {
      console.log(`No se encontró disponibilidad para profesor ${matriculaProfesor}`);
      return res.status(200).json({ 
        lunes: [], martes: [], miercoles: [], jueves: [], viernes: [] 
      });
    }
    
    console.log(`Disponibilidad encontrada para profesor ${matriculaProfesor}:`, disponibilidad);
    res.status(200).json(disponibilidad);
  } catch (error) {
    console.error("Error al obtener disponibilidad del profesor:", error);
    res.status(500).json({ message: "Error al obtener horario del profesor" });
  }
};