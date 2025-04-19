let materiasPorAgregar = [];
window.setTimeout(function() {
    const alerta = document.getElementById("alertasOA");
    if (alerta.innerText == (
        "Ocurrió un error al intentar guardar la oferta, inténtelo de nuevo" ||
        "La oferta ha sido guardada exitosamente")) {
        $("#alertasOA").slideUp(1000, function() {
    $("#alertasOA").slideDown(1000);
    alerta.className = "col-9 offset-2 alert alert-info fw-semibold mb-4";
    alerta.innerText = "Nota: guarda la oferta académica por semestre";
    });
    }
}, 3000);

function puedeCambiar(tabSemestre) {
    if (materiasPorAgregar.length > 0) {
        let semestreActual = materiasPorAgregar[0].semestre;
        if (semestreActual != tabSemestre) {
            let confirmacion = window.confirm("Si cambias de semestre se eliminará tu selección. ¿Deseas continuar?");
            if (confirmacion == true) {
                for (let materia of materiasPorAgregar) {
                    const boton = document.getElementById("boton" + materia.id_materia);
                    const icono = document.getElementById("iconoBoton" + materia.id_materia);
                    if (boton.getAttribute('funcion') == 'eliminar') {
                        // cambiar la funcion del boton a agregar
                        boton.setAttribute('funcion', 'agregar');
                        // cambiar el icono del boton por + y de color verde
                        boton.className = "btn btn-success btn-sm edit-btn";
                        icono.className = "bi bi-plus-lg";
                    }
                }
                // "vaciar" arreglo
                materiasPorAgregar.length = 0;
                // animacion de alerta
                $("#alertasOA").fadeOut(500, function(){
                    const alerta = document.getElementById("alertasOA");
                    alerta.className = "col-9 offset-2 alert alert-warning fw-semibold mb-4";
                    alerta.innerText = "Envía la oferta del semestre actual antes de cambiar a otro";
                    // animacion de alerta
                    $("#alertasOA").fadeIn(1500, function(){
                        $("#alertasOA").fadeOut(15000, function(){
                        alerta.className = "col-9 offset-2 alert alert-info fw-semibold mb-4";
                        alerta.innerText = "Nota: guarda la oferta académica por semestre";
                        $("#alertasOA").fadeIn(1000);
                        });
                    });
                });
            }
        }
    }
}

function agregar(stringMateria) {
    const materia = JSON.parse(stringMateria);
    const idMateria = materia.id_materia;
    const boton = document.getElementById("boton" + idMateria);
    const icono = document.getElementById("iconoBoton" + idMateria);
    const botonEnviar = document.getElementById("botonEnviarOA");
    // se checa si el boton es + o -
    if (boton.getAttribute('funcion') == 'agregar'){
        // variable para ver si la materia esta en el arreglo
        let nueva = true;
        for (let materias of materiasPorAgregar) {
            if (materias.id_materia == materia.id_materia) {
                nueva = false;
            }
        }
        if (nueva == true) {
            materiasPorAgregar.push(materia);
            // animacion de alerta
            $("#alertasOA").fadeOut(1000, function(){
            const alerta = document.getElementById("alertasOA");
            alerta.className = "col-9 offset-2 alert alert-success fw-semibold mb-4";
            alerta.innerText = `Materia agregada: ${materia.materia}`;
            // animacion de alerta
            $("#alertasOA").fadeIn(1500, function(){
                $("#alertasOA").fadeOut(4000, function(){
                alerta.className = "col-9 offset-2 alert alert-info fw-semibold mb-4";
                alerta.innerText = "Nota: guarda la oferta por semestre";
                $("#alertasOA").fadeIn(1000);
                });
            });
            });
            // se cambia la funcion a eliminar
            boton.setAttribute('funcion', 'eliminar');
            // cambiar el icono del boton por - y de color rojo
            boton.className = "btn btn-primary btn-sm edit-btn";
            icono.className = "bi bi-dash-lg";
        }
    }
    else if (boton.getAttribute('funcion') == 'eliminar'){
        // recorrer las materias y eliminar la seleccionada
        for (let i = 0; i < materiasPorAgregar.length; i++) {
            if (materiasPorAgregar[i].id_materia == idMateria) {
                materiasPorAgregar.splice(i, 1);
            }
        }
        // animacion de alerta
        $("#alertasOA").fadeOut(1000, function(){
            const alerta = document.getElementById("alertasOA");
            alerta.className = "col-9 offset-2 alert alert-danger fw-semibold mb-4";
            alerta.innerText = `Materia eliminada: ${materia.materia}`;
            // animacion de alerta
            $("#alertasOA").fadeIn(1500, function(){
                $("#alertasOA").fadeOut(4000, function(){
                alerta.className = "col-9 offset-2 alert alert-info fw-semibold mb-4";
                alerta.innerText = "Nota: guarda la oferta académica por semestre";
                $("#alertasOA").fadeIn(1000);
                });
            });
        });
        // cambiar la funcion del boton a agregar
        boton.setAttribute('funcion', 'agregar');
        // cambiar el icono del boton por + y de color verde
        boton.className = "btn btn-success btn-sm edit-btn";
        icono.className = "bi bi-plus-lg";
    }

    if (materiasPorAgregar.length == 0) {
        botonEnviar.className = "btn btn-primary visually-hidden";
    }
    else {
        botonEnviar.className = "btn btn-primary";
    } 
    // checar que funcione (se va a eliminar despues)
    console.log(materiasPorAgregar);
}

function enviarSeleccion() {
    // contador para numero de materia en la tabla
    let i = 1;
    const tablaBody = document.getElementById("bodyTablaSelected");
    const inputIds = document.getElementById("idMateriasAgregar");
    // input con los ids de planes_materias para el post
    let ids = inputIds.getAttribute('value');
    let filaTabla = ''; 
    let encabezado = '';
    let texto = '';
    let tablaDatos = '';
    for (let materias of materiasPorAgregar) {
        ids += materias.id_plan_materia;
        ids += ',';
        // numero del registro
        filaTabla = document.createElement("tr");
        filaTabla.className = "text-center";
        encabezado = document.createElement("th");
        texto = document.createTextNode(i)
        encabezado.appendChild(texto);
        filaTabla.appendChild(encabezado);
        // nombre de la materia
        tablaDatos = document.createElement("td");
        texto = document.createTextNode(materias.materia);
        tablaDatos.appendChild(texto);
        filaTabla.appendChild(tablaDatos);
        // creditos de la materia
        tablaDatos = document.createElement("td");
        texto = document.createTextNode(materias.creditos); 
        tablaDatos.appendChild(texto);
        filaTabla.appendChild(tablaDatos);
        // horas por semana de la materia
        tablaDatos = document.createElement("td");
        texto = document.createTextNode(materias.horas_profesor);
        tablaDatos.appendChild(texto);
        filaTabla.appendChild(tablaDatos);
        tablaBody.appendChild(filaTabla);

        i++;
    }
    // cambiar el valor del input a los ids de las materias
    inputIds.setAttribute('value',ids);
    // vaciar el arreglo
    materiasPorAgregar.length = 0;
}