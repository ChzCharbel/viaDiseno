document.addEventListener("DOMContentLoaded", function () {
    let materiasList = [];
    let profesoresList = [];

    // Obtener materias y profesores desde el servidor
    fetch("/grupos/datos")
        .then(response => response.json())
        .then(data => {
            materiasList = data.materias;
            profesoresList = data.profesores;
        })
        .catch(error => console.error("Error cargando datos:", error));

    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", function () {
            document.getElementById("grupoId").value = this.getAttribute("data-id");
            document.getElementById("salon").value = this.getAttribute("data-salon");

            let selectedMateria = this.getAttribute("data-materia");
            let selectedProfesor = this.getAttribute("data-profesor");

            let diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes"];
            let horariosSeleccionados = {};
            diasSemana.forEach(dia => {
                horariosSeleccionados[dia] = this.getAttribute(`data-${dia}`);
            });

            // Llenar select de Materias
            let materiaSelect = document.getElementById("materiaSelect");
            materiaSelect.innerHTML = "";
            materiasList.forEach(materia => {
                let option = document.createElement("option");
                option.value = materia.id;
                option.textContent = materia.name;
                if (materia.name === selectedMateria) option.selected = true;
                materiaSelect.appendChild(option);
            });

            // Llenar select de Profesores
            let profesorSelect = document.getElementById("profesorSelect");
            profesorSelect.innerHTML = "";
            profesoresList.forEach(profesor => {
                let option = document.createElement("option");
                option.value = profesor.id;
                option.textContent = profesor.name;
                if (profesor.name === selectedProfesor) option.selected = true;
                profesorSelect.appendChild(option);
            });

            // Actualizar horarios para cada día
            actualizarHorarios(profesorSelect.value, horariosSeleccionados);

            // Evento para actualizar horarios cuando cambie el profesor
            profesorSelect.addEventListener("change", function () {
                actualizarHorarios(this.value);
            });
        });
    });

    function actualizarHorarios(profesorId, horariosSeleccionados = {}) {
        let diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes"];

        diasSemana.forEach(dia => {
            let horarioSelect = document.getElementById(`${dia}Select`);
            horarioSelect.innerHTML = "";

            fetch(`/profesores/${profesorId}/horarios`)
                .then(response => response.json())
                .then(horarios => {
                    horarios.forEach(horario => {
                        let option = document.createElement("option");
                        option.value = horario;
                        option.textContent = horario;
                        if (horario === horariosSeleccionados[dia]) option.selected = true;
                        horarioSelect.appendChild(option);
                    });
                })
                .catch(error => console.error("Error obteniendo horarios:", error));
        });
    }

    document.getElementById("editForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let id = document.getElementById("grupoId").value;
        let updatedData = {
            idMateria: document.getElementById("materiaSelect").value,
            matriculaProfesor: document.getElementById("profesorSelect").value,
            idSalon: document.getElementById("salon").value,
            Lunes: document.getElementById("lunesSelect").value,
            Martes: document.getElementById("martesSelect").value,
            Miercoles: document.getElementById("miercolesSelect").value,
            Jueves: document.getElementById("juevesSelect").value,
            Viernes: document.getElementById("viernesSelect").value
        };

        fetch(`/grupos/editar/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Grupo actualizado con éxito");
                    location.reload();
                } else {
                    alert("Error al actualizar el grupo");
                }
            })
            .catch(error => console.error("Error:", error));
    });
});
