// Objeto para almacenar la disponibilidad de cada profesor
let availability = {};

// Se inicializará cuando se cargue el DOM
let profesores = [];

// Función para cargar los horarios de un profesor específico
async function cargarHorarioProfesor(matriculaProf) {
  try {
    // Obtener el ciclo escolar actual
    const cicloActual = document.getElementById('cicloActualId')?.value || 
                        localStorage.getItem('cicloActual') || "FebJun21"; // Usa el mismo valor por defecto que en guardarHorario1
    
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
  
  // Si disponibilidad es un array en lugar de un objeto, puede ser que la API
  // esté devolviendo datos en un formato inesperado
  if (Array.isArray(disponibilidad)) {
    console.error("La disponibilidad es un array, se esperaba un objeto");
    return;
  }
  
  // Si no hay disponibilidad, no hay nada que marcar
  if (!disponibilidad) {
    console.log("No hay disponibilidad guardada para este profesor");
    return;
  }
  
  dias.forEach(dia => {
    // Verificar si este día tiene horas guardadas
    if (disponibilidad[dia] && Array.isArray(disponibilidad[dia])) {
      console.log(`Día ${dia} tiene ${disponibilidad[dia].length} horas guardadas`);
        // Para cada hora guardada en ese día
      disponibilidad[dia].forEach(horaGuardada => {
        if (typeof horaGuardada !== 'string') {
          console.error(`Formato de hora inválido para ${dia}: ${horaGuardada}`);
          return;
        }
        
        // Limpiar el formato de hora para eliminar posibles errores
        // Puede venir como '13:00', '[13:00]', '"13:00"', etc.
        let horaLimpia = horaGuardada.replace(/[\[\]\"]/g, '').trim();
        
        // Formatear la hora para el ID del checkbox (7:00 -> 7-00)
        const horaFormateada = horaLimpia.replace(':', '-');
        const checkboxId = `${dia}-${horaFormateada}-${matriculaProf}`;
        console.log(`Buscando checkbox con ID: ${checkboxId}`);
        
        const checkbox = document.getElementById(checkboxId);
        
        // Si existe el checkbox, marcarlo como seleccionado
        if (checkbox) {
          checkbox.checked = true;
          console.log(`Marcando checkbox ${checkboxId}`);
        } else {
          console.log(`No se encontró el checkbox ${checkboxId}. Intentando otras variantes...`);
          
          // Intentar varias posibilidades de formato
          const posiblesIds = [
            `${dia}-${horaFormateada}`, // Sin matrícula
            `${dia}-${horaLimpia}`, // Sin reemplazar el : por -
            `${dia}-${horaFormateada}-${matriculaProf}`.toLowerCase(), // En minúsculas
            `${dia}-${horaLimpia.split(':')[0]}-${horaLimpia.split(':')[1]}` // Formato diferente (ej: jueves-13-00)
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
    let profModal = document.getElementById("profModal" + profesor.matriculaProfesor);
    if (profModal) {
      console.log(`Configurando modal para profesor: ${profesor.nombreProfesor} (${profesor.matriculaProfesor})`);
      
      // Cuando se abre el modal
      profModal.addEventListener("show.bs.modal", function (event) {
        console.log(`Abriendo modal para profesor: ${profesor.nombreProfesor} (${profesor.matriculaProfesor})`);
        
        // Obtener matrícula del profesor desde el elemento del modal
        const profId = profesor.matriculaProfesor;
        
        // Cargar los horarios guardados para este profesor específico
        cargarHorarioProfesor(profId);
      });
    } else {
      console.warn(`No se encontró el modal para el profesor ${profesor.nombreProfesor} (${profesor.matriculaProfesor})`);
    }
  });
});
const profModal = document.getElementById("profModalIVD012902");

function guardarHorario2() {
  console.log("Guardar horario profesor");
  document.getElementById("demo").innerHTML = "Hello World";
}

// Cuando el modal se va a mostrar
/* profModal.addEventListener("show.bs.modal", function (event) {
  console.log('PROFESss: ' + profesores[0].matriculaProfesor + ' ' + profesores[0].nombreProfesor);
  const button = event.relatedTarget; // Botón que abrió el modal
  const profName = button.getAttribute("data-prof-name"); // Nombre del profesor
  const profMatricula = button.getAttribute("data-prof-id"); // Matricula del profesor
  console.log('matricula:' +  profMatricula);
  console.log('nombre:' +  profName);
  document.getElementById("profName").textContent = profName; // Mostrar nombre en el modal

  // Días y horarios disponibles
  const days = ["lunes", "martes", "miercoles", "jueves", "viernes"];
  const times = [
    "7-00",
    "8-00",
    "9-00",
    "10-00",
    "11-00",
    "12-00",
    "13-00",
    "14-00",
    "15-00",
  ];

  // Obtener la disponibilidad del profesor (o un objeto vacío si no existe)
  const profAvailability = availability[profName] || {};

  // Configurar los checkboxes según la disponibilidad del profesor
  days.forEach((day) => {
    times.forEach((time) => {
      const checkboxId = `${day}-${time}`;
      const checkbox = document.getElementById(checkboxId);
      if (checkbox) {
        // Marcar el checkbox si el horario está en la disponibilidad del profesor
        checkbox.checked =
          profAvailability[day] && profAvailability[day].includes(time);
      }
    });
  });
}); */

// Cuando se presiona "Aceptar"
/* function guardarHorario1() {
    const profName = document.getElementById("profName").textContent; // Nombre del profesor
    const profAvailability = {}; // Objeto para almacenar la nueva disponibilidad

    // Días y horarios disponibles
    const days = ["lunes", "martes", "miercoles", "jueves", "viernes"];
    const times = [
      "7-00",
      "8-00",
      "9-00",
      "10-00",
      "11-00",
      "12-00",
      "13-00",
      "14-00",
      "15-00",
    ];

    // Recolectar los horarios seleccionados
    days.forEach((day) => {
      profAvailability[day] = []; // Inicializar array para el día
      times.forEach((time) => {
        const checkboxId = `${day}-${time}`;
        const checkbox = document.getElementById(checkboxId);
        if (checkbox && checkbox.checked) {
          profAvailability[day].push(time); // Añadir horario seleccionado
        }
      });
      // Si no hay horarios seleccionados para el día, eliminar la entrada
      if (profAvailability[day].length === 0) {
        delete profAvailability[day];
      }
    });

    // Actualizar la disponibilidad solo para este profesor
    availability[profName] = profAvailability;
    console.log(
      `Disponibilidad actualizada para ${profName}:`,
      availability[profName]
    );
    console.log(availability[profName][0]);
    
  }; */
  
  
  function guardarHorario1() {
    const profesorId = document.getElementById("profId").textContent.trim();
    const cicloEscolar = "FebJun21"; //  hacerlo dinámico 
  
    const dias = ["lunes", "martes", "miercoles", "jueves", "viernes"];
    const horas = [
      "7:00", "7:30", "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00",
      "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"
    ];
  
    const disponibilidad = {
      idCicloEscolar: cicloEscolar,
      matriculaProfesor: profesorId,
      lunes: [],
      martes: [],
      miercoles: [],
      jueves: [],
      viernes: []
    };
  
    horas.forEach(hora => {
      const horaFormatted = hora.replace(":", "-");
      dias.forEach(dia => {
        const checkboxId = `${dia}-${horaFormatted}-${profesorId}`;
        const checkbox = document.getElementById(checkboxId);
        if (checkbox && checkbox.checked) {
          disponibilidad[dia].push(hora);
        }
      });
    });
  
    fetch("/disponible/guardar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(disponibilidad),
    })
      .then(res => res.json())
      .then(data => {
        console.log("Disponibilidad guardada:", data);
        alert("Horario guardado correctamente");
      })
      .catch(err => {
        console.error("Error al guardar horario:", err);
        alert("Error al guardar horario");
      });
  }

  const contenedor = document.getElementById("profContainer");
  const allProfesores = JSON.parse(contenedor.dataset.profesores);