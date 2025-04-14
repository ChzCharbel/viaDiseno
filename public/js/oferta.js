let materiasPorAgregar = [];

function agregar(stringMateria) {
    const materia = JSON.parse(stringMateria);
    const idMateria = materia.id;
    const boton = document.getElementById("boton" + idMateria);
    const icono = document.getElementById("iconoBoton" + idMateria);
    const botonEnviar = document.getElementById("botonEnviarOA");
    // se checa si el boton es + o -
    if (boton.getAttribute('funcion') == 'agregar'){
        // variable para ver si la materia esta en el arreglo
        let nueva = true;
        for (let materias of materiasPorAgregar) {
            if (materias.id == materia.id) {
                nueva = false;
            }
        }
        if (nueva == true) {
            materiasPorAgregar.push(materia);
            // animacion de alerta
            $("#alertasOA").fadeOut(1000, function(){
            const alerta = document.getElementById("alertasOA");
            alerta.className = "col-9 offset-2 alert alert-success fw-semibold mb-4";
            alerta.innerText = `Materia agregada: ${materia.name}`
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
            boton.className = "btn btn-primary btn-sm edit-btn"
            icono.className = "bi bi-dash-lg";
        }
    }
    else if (boton.getAttribute('funcion') == 'eliminar'){
        // recorrer las materias y eliminar la seleccionada
        for (let i = 0; i < materiasPorAgregar.length; i++) {
            if (materiasPorAgregar[i].id == idMateria) {
                materiasPorAgregar.splice(i, 1)
            }
        }
        // animacion de alerta
        $("#alertasOA").fadeOut(1000, function(){
            const alerta = document.getElementById("alertasOA");
            alerta.className = "col-9 offset-2 alert alert-danger fw-semibold mb-4";
            alerta.innerText = `Materia eliminada: ${materia.name}`
            // animacion de alerta
            $("#alertasOA").fadeIn(1500, function(){
                $("#alertasOA").fadeOut(4000, function(){
                alerta.className = "col-9 offset-2 alert alert-info fw-semibold mb-4";
                alerta.innerText = "Nota: guarda la oferta por semestre";
                $("#alertasOA").fadeIn(1000);
                });
            });
            });
        // cambiar la funcion del boton a agregar
        boton.setAttribute('funcion', 'agregar');
        // cambiar el icono del boton por + y de color verde
        boton.className = "btn btn-success btn-sm edit-btn"
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
    // input con los ids de las materias para el post
    let ids = inputIds.getAttribute('value');
    let filaTabla = ''; 
    let encabezado = '';
    let texto = '';
    let tablaDatos = '';
    for (let materias of materiasPorAgregar) {
        ids += materias.id;
        ids += ',';
        // numero del registro
        filaTabla = document.createElement("tr");
        encabezado = document.createElement("th");
        texto = document.createTextNode(i)
        encabezado.appendChild(texto);
        filaTabla.appendChild(encabezado);
        // nombre de la materia
        tablaDatos = document.createElement("td");
        texto = document.createTextNode(materias.name);
        tablaDatos.appendChild(texto);
        filaTabla.appendChild(tablaDatos);
        // creditos de la materia
        tablaDatos = document.createElement("td");
        texto = document.createTextNode(materias.credits); 
        tablaDatos.appendChild(texto);
        filaTabla.appendChild(tablaDatos);
        // horas por semana de la materia
        tablaDatos = document.createElement("td");
        texto = document.createTextNode(materias.hours_professor);
        tablaDatos.appendChild(texto);
        filaTabla.appendChild(tablaDatos);
        tablaBody.appendChild(filaTabla);

        i++;
    }
    // cambiar el valor del input a los ids de las materias
    inputIds.setAttribute('value',ids);
}