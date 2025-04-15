document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('buscarProfesor');
    const filasTabla = document.querySelectorAll('#profesores_lista tbody tr');
  
    function filtrarProfesores() {
      const texto = input.value.toLowerCase().trim();
  
      filasTabla.forEach(fila => {
        const nombreProfesor = fila.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const matriculaProfesor = fila.querySelector('td:nth-child(1)').textContent.toLowerCase();
        
        // Mostrar fila si el nombre o la matrícula contiene el texto de búsqueda
        if (nombreProfesor.includes(texto) || matriculaProfesor.includes(texto)) {
          fila.style.display = '';
        } else {
          fila.style.display = 'none';
        }
      });
    }
  
    input.addEventListener('input', filtrarProfesores);
  });