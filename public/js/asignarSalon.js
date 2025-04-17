window.salonSeleccionado = {};

function seleccionarSalon(idMateria, idSalon, descripcionSalon) {
  window.salonSeleccionado[idMateria] = idSalon;

  const texto = document.getElementById('salonSeleccionado_' + idMateria);
  if (texto) {
    texto.textContent = 'Seleccionado: ' + descripcionSalon;
  }
}

function guardarSalonSeleccionado(idMateria) {
  const idSalon = window.salonSeleccionado[idMateria];

  if (!idSalon) {
    alert('Primero selecciona un salón.');
    return;
  }

  const cicloActual = localStorage.getItem('cicloActual');
  if (!cicloActual) {
    alert('No se encontró el ciclo escolar actual.');
    return;
  }

  fetch('/grupos/asignar-salon', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
    },
    body: JSON.stringify({
      id_materia: idMateria,
      id_salon: idSalon,
      id_ciclo_escolar: cicloActual
    }),
  })
    .then(response => response.json())
    .then(data => {
      alert(data.mensaje || 'Salón asignado correctamente');

      const modalElement = document.getElementById('modalSalones' + idMateria);
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    })
    .catch(err => {
      console.error('Error al guardar salón:', err);
      alert('Hubo un error al asignar el salón');
    });
}