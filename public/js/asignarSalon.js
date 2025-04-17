window.salonSeleccionado = {};

document.addEventListener('DOMContentLoaded', function() {
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

function seleccionarSalon(idMateria, idSalon, descripcionSalon) {
  console.log('Seleccionando salón:', { idMateria, idSalon, descripcionSalon });

  window.salonSeleccionado[idMateria] = idSalon;
  localStorage.setItem('salonSeleccionado', JSON.stringify(window.salonSeleccionado));

  const texto = document.getElementById('salonSeleccionado_' + idMateria);
  if (texto) {
    texto.textContent = 'Seleccionado: ' + descripcionSalon;
  }
  
  const modal = document.getElementById('modalSalones' + idMateria);
  if (modal) {
    const botones = modal.querySelectorAll('.modal-body .btn');
    botones.forEach(btn => {
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-light');
    });
    

    console.log('Buscando botón para salón ID:', idSalon);
    let encontrado = false;
    botones.forEach(btn => {
      const btnSalonId = btn.getAttribute('data-salon-id');
      console.log('Botón con salon ID:', btnSalonId);
      if (btnSalonId === idSalon) {
        console.log('¡Botón encontrado! Activando...');
        btn.classList.remove('btn-light');
        btn.classList.add('btn-primary');
        encontrado = true;
      }
    });
  }
}

function guardarSalonSeleccionado(idMateria) {
  console.log('Guardando salón para la materia:', idMateria);
  console.log('Estado actual de salonSeleccionado:', window.salonSeleccionado);
  
  let idSalon = null;
  
  if (window.salonSeleccionado && window.salonSeleccionado[idMateria]) {
    idSalon = window.salonSeleccionado[idMateria];
  }
  
  console.log('ID del salón seleccionado (final):', idSalon);

  if (!idSalon && idSalon !== 0) {
    alert('Debes seleccionar un salón antes de guardar.');
    return;
  }

  const cicloActual = localStorage.getItem('cicloActual');
  if (!cicloActual) {
    alert('No se encontró el ciclo escolar actual.');
    return;
  }
  const csrfToken = document.getElementById('csrfToken_' + idMateria)?.value || '';
  console.log('CSRF Token obtenido:', csrfToken);

  fetch('/grupos/asignar-salon', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'CSRF-Token': csrfToken
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