document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('buscarProfesor');
    const botones = document.querySelectorAll('#profesores_botones button');
  
    function filtrarProfesores() {
      const texto = input.value.toLowerCase().trim();
  
      botones.forEach(boton => {
        const nombre = boton.textContent.toLowerCase();
        boton.style.display = nombre.includes(texto) ? '' : 'none';
      });
    }
  
    input.addEventListener('input', filtrarProfesores);
  });  