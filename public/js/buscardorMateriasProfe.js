window.filtrarMaterias = function () {
    console.log("filtrarMaterias fue llamada");

    const input = document.getElementById('buscadorMaterias');
    const filter = input.value.toLowerCase();
    const items = document.querySelectorAll('#listaMaterias .materia-item');

    items.forEach(item => {
      const label = item.querySelector('label');
      const texto = label.textContent.toLowerCase();
      item.style.display = texto.includes(filter) ? '' : 'none';
    });
  };