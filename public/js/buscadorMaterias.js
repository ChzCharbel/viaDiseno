document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('inputBuscarMateria');
    const form = document.getElementById('formBuscarMateria');
    const filas = document.querySelectorAll('tbody tr');
  
    function filtrarMaterias() {
      const texto = input.value.toLowerCase().trim();
  
      filas.forEach(fila => {
        const nombreMateria = fila.querySelectorAll('td')[1]?.textContent.toLowerCase() || '';
        fila.style.display = nombreMateria.includes(texto) ? '' : 'none';
      });
    }
  
    form.addEventListener('submit', filtrarMaterias);
    input.addEventListener('input', filtrarMaterias);
  });  