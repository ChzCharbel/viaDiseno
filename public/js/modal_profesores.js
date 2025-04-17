// Objeto para almacenar la disponibilidad de cada profesor
let availability = {};

let profesores = [];

// Función para cargar los horarios de un profesor específico
async function cargarHorarioProfesor(matriculaProf) {
  try {
    const cicloActual = document.getElementById('cicloActualId')?.value || 
                        localStorage.getItem('cicloActual'); 
    
    console.log(`Cargando horario para profesor: ${matriculaProf}, ciclo: ${cicloActual}`);
    
    // Solicitar la disponibilidad específica del profesor
    const url = `/disponible/obtener/${cicloActual}/${matriculaProf}`;
    console.log("Consultando URL:", url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error al obtener el horario del profesor ${matriculaProf}: ${response.status} ${response.statusText}`);
    }
    
    const disponibilidad = await response.json();
    console.log("Disponibilidad cargada:", disponibilidad);
    
    // Guardar la disponibilidad en el objeto global
    availability[matriculaProf] = disponibilidad;
    
    // Marcar los checkboxes correspondientes para este profesor
    marcarHorarioProfesor(matriculaProf, disponibilidad);
    
  } catch (error) {
    console.error(`Error al cargar horario del profesor ${matriculaProf}:`, error);
  }
}

// Función para marcar los checkboxes de un profesor específico
function marcarHorarioProfesor(matriculaProf, disponibilidad) {
  const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  
  console.log(`Marcando horarios para profesor ${matriculaProf}`);
  console.log("Disponibilidad recibida:", disponibilidad);
  
  if (Array.isArray(disponibilidad)) {
    console.error("La disponibilidad es un array, se esperaba un objeto");
    return;
  }
  
  if (!disponibilidad) {
    console.log("No hay disponibilidad guardada para este profesor");
    return;
  }

  limpiarCheckboxesProfesor(matriculaProf);
  
  dias.forEach(dia => {
    // Verificar si este día tiene horas guardadas
    if (disponibilidad[dia] && Array.isArray(disponibilidad[dia])) {
      console.log(`Día ${dia} tiene ${disponibilidad[dia].length} medias horas guardadas`);
      // Para cada hora guardada en ese día
      disponibilidad[dia].forEach(horaGuardada => {
        if (typeof horaGuardada !== 'string') {
          console.error(`Formato de hora inválido para ${dia}: ${horaGuardada}`);
          return;
        }
        
        let horaLimpia = horaGuardada.replace(/[\[\]\"]/g, '').trim();
          
        let horaParts = horaLimpia.split(':');
        if (horaParts[0].length === 1) {
          horaLimpia = '0' + horaLimpia;
        }

        let horaFormatted = horaLimpia;
        if (horaLimpia.startsWith('0')) {
          horaFormatted = horaLimpia.substring(1);
        }
        const horaFormateada = horaFormatted.replace(':', '-');
          
        const checkboxId = `${dia}-${horaFormateada}-${matriculaProf}`;
        console.log(`Buscando checkbox con ID: ${checkboxId}`);
          
        const checkbox = document.getElementById(checkboxId);
          
        if (checkbox) {
          checkbox.checked = true;
          console.log(`Marcando checkbox ${checkboxId}`);
        } else {
          console.log(`No se encontró el checkbox ${checkboxId}. Intentando otras variantes...`);
            
          // Intentar varias posibilidades de formato
          const posiblesIds = [
            `${dia}-${horaFormateada}`, // Sin matrícula
            `${dia}-${horaLimpia.replace(':', '-')}`, // Con formato completo (ej: 07-00)
            `${dia}-${horaFormateada}-${matriculaProf}`.toLowerCase(), // En minúsculas
            `${dia}-${horaParts[0]}-${horaParts[1]}`, // Formato diferente (ej: lunes-7-00)
            `${dia}-${parseInt(horaParts[0])}-${horaParts[1]}`, // Sin ceros iniciales
            `${dia}-${horaParts[0].padStart(2, '0')}-${horaParts[1]}` // Con ceros iniciales
          ];
            
          let encontrado = false;
          for (const id of posiblesIds) {
            const checkboxAlt = document.getElementById(id);
            if (checkboxAlt) {
              checkboxAlt.checked = true;
              console.log(`Marcando checkbox con ID alternativo: ${id}`);
              encontrado = true;
              break;
            }
          }
            
          if (!encontrado) {
            console.log(`No se encontró checkbox para ${dia} ${horaGuardada} después de probar múltiples formatos`);
          }
        }
      });
    } else {
      console.log(`No hay horas guardadas para el día ${dia}`);
    }
  });
}

// Función para limpiar todos los checkboxes de un profesor antes de marcar los nuevos
function limpiarCheckboxesProfesor(matriculaProf) {
  const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  const horas = [
    '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00',
    '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'
  ];
  
  console.log(`Limpiando checkboxes para profesor ${matriculaProf}`);
  
  horas.forEach(hora => {
    const horaFormatted = hora.replace(':', '-');
    dias.forEach(dia => {
      const checkboxId = `${dia}-${horaFormatted}-${matriculaProf}`;
      const checkbox = document.getElementById(checkboxId);
      if (checkbox) {
        checkbox.checked = false;
      }
    });
  });
}

// Configurar los event listeners para los modales cuando la página se carga
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM completamente cargado");
  
  // Obtener la lista de profesores del elemento en el DOM
  const contenedor = document.getElementById("profContainer");
  if (contenedor && contenedor.dataset.profesores) {
    try {
      profesores = JSON.parse(contenedor.dataset.profesores);
      console.log(`${profesores.length} profesores cargados correctamente`);
    } catch (e) {
      console.error("Error al parsear profesores:", e);
    }
  } else {
    console.error("No se encontró el contenedor de profesores o no contiene datos");
  }
  // Configurar cada modal de profesor
  profesores.forEach(profesor => {
    // Intentar con ambas convenciones de nombres para asegurar compatibilidad
    const matriculaId = profesor.matricula_profesor;
    const nombreProf = profesor.nombre_profesor;
    
    let profModal = document.getElementById("profModal" + matriculaId);
    if (profModal) {
      console.log(`Configurando modal para profesor: ${nombreProf} (${matriculaId})`);
        // Cuando se abre el modal      
      profModal.addEventListener("show.bs.modal", function (event) {
        console.log(`Abriendo modal para profesor: ${nombreProf} (${matriculaId})`);
        
        // Obtener matrícula del profesor desde el elemento del modal
        const profId = matriculaId;
        
        // Cargar los horarios guardados para este profesor específico
        cargarHorarioProfesor(profId);
      });
    } else {
      console.warn(`No se encontró el modal para el profesor ${nombreProf} (${matriculaId})`);
    }
  });
});
  
function guardarHorario(matriculaProfesor) {
  // Verificar que la matrícula del profesor se pasó como argumento
  if (!matriculaProfesor) {
    console.error("Error: No se proporcionó la matrícula del profesor");
    alert("Error al guardar horario: datos del profesor incompletos");
    return;
  }
  console.log("Guardando horario para profesor con matrícula:", matriculaProfesor);
    
  const idCicloEscolar = document.getElementById('cicloActualId')?.value || 
                          localStorage.getItem('cicloActual');
  
  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes"];
  const horas = [
    "7:00", "7:30", "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00",
    "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"
  ];
  
  const disponibilidades = [];
  
  horas.forEach(hora => {
    const horaFormatted = hora.replace(":", "-");
    dias.forEach(dia => {
      const checkboxId = `${dia}-${horaFormatted}-${matriculaProfesor}`;
      const checkbox = document.getElementById(checkboxId);
        
      if (checkbox && checkbox.checked) {
        // Creamos un objeto de disponibilidad individual para cada celda marcada
        disponibilidades.push({
          matriculaProfesor: matriculaProfesor,
          idCicloEscolar: idCicloEscolar,
          diaSemana: dia,
          horaInicio: hora,
          horaFin: calcularHoraFin(hora), // Función auxiliar que definimos abajo
          disponible: true
        });
      }
    });
  });
  
  console.log("Enviando disponibilidades:", disponibilidades);
    
  // Enviar las disponibilidades una por una
  const promesasGuardado = disponibilidades.map(disp => 
    fetch("/disponible/guardar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(disp),
    })
  );
    
  // Esperar a que todas las promesas se resuelvan
  Promise.all(promesasGuardado)
    .then(responses => {
      // Verificar si todas las respuestas fueron exitosas
      const todasExitosas = responses.every(res => res.ok);
      if (todasExitosas) {
        console.log("Todas las disponibilidades guardadas correctamente");
        alert("Horario guardado correctamente");
      } else {
        console.error("Algunas disponibilidades no pudieron guardarse");
        alert("Hubo errores al guardar el horario");
      }
    })
    .catch(err => {
      console.error("Error al guardar horarios:", err);
      alert("Error al guardar horario");
    });
}

function calcularHoraFin(horaInicio) {
  const [horas, minutos] = horaInicio.split(':').map(Number);
  let nuevosMinutos = minutos + 30;
  let nuevasHoras = horas;
    
  if (nuevosMinutos >= 60) {
    nuevosMinutos -= 60;
    nuevasHoras += 1;
  }
    
  return `${nuevasHoras}:${nuevosMinutos.toString().padStart(2, '0')}`;
}

const contenedor = document.getElementById("profContainer");
const allProfesores = JSON.parse(contenedor.dataset.profesores);