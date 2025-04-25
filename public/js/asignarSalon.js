window.salonSeleccionado = {};

document.addEventListener('DOMContentLoaded', function () {
  const savedSelections = localStorage.getItem('salonSeleccionado');
  if (savedSelections) {
    try {
      window.salonSeleccionado = JSON.parse(savedSelections);
      console.log('Selecciones recuperadas del localStorage:', window.salonSeleccionado);
    } catch (error) {
      console.error('Error al recuperar selecciones:', error);
      window.salonSeleccionado = {};
    }
  }
});

function seleccionarSalon(idCicloMateria, idSalon, descripcionSalon) {
  console.log('Seleccionando salón:', { idCicloMateria, idSalon, descripcionSalon });

  window.salonSeleccionado[idCicloMateria] = idSalon;
  localStorage.setItem('salonSeleccionado', JSON.stringify(window.salonSeleccionado));

  const texto = document.getElementById('salonSeleccionado_' + idCicloMateria);
  if (texto) {
    texto.textContent = 'Seleccionado: ' + descripcionSalon;
  }

  const input = document.getElementById('inputSalon_' + idCicloMateria);
  if (input) {
    input.value = idSalon;
  }
}

// 🔄 FUNCIONALIDAD COMPLETA
async function guardarSalonSeleccionado(idCicloMateria, idMateria, idProfesor) {
  const idSalon = window.salonSeleccionado[idCicloMateria];
  const cicloActual = parseInt(localStorage.getItem('cicloActual'));
  const csrfToken = document.querySelector('input[name="_csrf"]')?.value || '';

  if (!idSalon && idSalon !== 0) {
    alert('Debes seleccionar un salón antes de guardar.');
    return;
  }

  if (isNaN(cicloActual)) {
    alert('Ciclo escolar no válido.');
    return;
  }

  // Aquí puedes pedir los datos de horario desde inputs
  const dia = document.querySelector(`#dia_${idCicloMateria}`)?.value;
  const horaInicio = document.querySelector(`#horaInicio_${idCicloMateria}`)?.value;
  const horaFin = document.querySelector(`#horaFin_${idCicloMateria}`)?.value;

  if (!dia || !horaInicio || !horaFin) {
    alert('Debes completar el día y horario.');
    return;
  }

  try {
    // Paso 1: verificar o crear grupo
    const responseGrupo = await fetch('/grupos/asignar-salon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken
      },
      body: JSON.stringify({
        id_materia: idMateria,
        id_salon: idSalon,
        id_ciclo_escolar: cicloActual,
        id_profesor: idProfesor
      })
    });

    const dataGrupo = await responseGrupo.json();

    if (!dataGrupo.id_grupo) {
      alert('Error al crear o recuperar el grupo.');
      return;
    }

    // Paso 2: asignar horario al grupo creado/verificado
    const responseHorario = await fetch('/grupos/asignar-horario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken
      },
      body: JSON.stringify({
        id_grupo: dataGrupo.id_grupo,
        dia,
        hora_inicio: horaInicio,
        hora_fin: horaFin,
        id_salon: idSalon
      })
    });

    const dataHorario = await responseHorario.json();
    alert(dataHorario.mensaje || 'Horario asignado correctamente');

    const modalElement = document.getElementById('modalSalones' + idCicloMateria);
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }

  } catch (err) {
    console.error('Error en asignación completa:', err);
    alert('Hubo un error al asignar salón y horario.');
  }
}