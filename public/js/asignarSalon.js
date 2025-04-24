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

    function guardarSalonSeleccionado(idCicloMateria, idMateria) {
      console.log('Ejecutando guardarSalonSeleccionado()');
      console.log('idCicloMateria:', idCicloMateria);
      console.log('idMateria:', idMateria);
    
      const idSalon = window.salonSeleccionado[idCicloMateria];
      if (!idSalon && idSalon !== 0) {
        alert('Debes seleccionar un salón antes de guardar.');
        return;
      }
    
      const cicloActual = parseInt(localStorage.getItem('cicloActual'));
      if (isNaN(cicloActual)) {
        alert('Ciclo escolar no válido.');
        return;
      }
    
      const csrfToken = document.querySelector('input[name=\"_csrf\"]')?.value || '';
    
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
          const modalElement = document.getElementById('modalSalones' + idCicloMateria);
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
    