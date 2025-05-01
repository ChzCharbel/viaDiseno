let materiasActualizadas = [];

//document.getElementById("fname").onchange = function(idMateria) {myFunction(idMateria)};

function cambiarBloqueSemestre(idMateria) {
    const selectMateria = document.getElementById("semestreSelect" + idMateria);
    const inputMaterias = document.getElementById("idMateriasActualizar");
    const inputSemestres = document.getElementById("bloqueSemestres");
    let materiaText = '';
    let semestreText = '';

    let nuevaMateria = true;
    if (materiasActualizadas.length > 0) {
        for (let arreglo of materiasActualizadas) {
            if (arreglo[0] == idMateria) {
                nuevaMateria = false;
                arreglo[1] = selectMateria.value;
            }
        }
        if (nuevaMateria == true) {
            materiasActualizadas.push([idMateria, selectMateria.value]);
        }
    }
    else {
        materiasActualizadas.push([idMateria, selectMateria.value]);
    }
    for (let arreglos of materiasActualizadas) {
        materiaText += arreglos[0];
        materiaText += ',';
        semestreText += arreglos[1];
        semestreText += ',';
    }
    inputMaterias.value = materiaText;
    inputSemestres.value = semestreText;
    console.log(materiasActualizadas);
}