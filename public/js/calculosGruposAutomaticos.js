// acumulador de horas
let horasTotalClase = 0;

// Contar horas totales del grupo a la semana
function stringToTime(horaInicio, horaFin, idCicloMateria) {
    // celda de la tabla de los grupos
    const celda = document.getElementById("celda" + idCicloMateria);
    /* celda de la tabla donde se comparan los grupos con las materias de la oferta 
    academica */
    const celdaComparacion = document.getElementById("celdaComparacion" + idCicloMateria);
    /* para que se pueda convertir la hora, se agrega un dia predeterminado 
    ya que lo unico que nos importa es la diferencia de horas */
    // hora de inicio
    const hora1 = 'January 1, 2025' + ' ' + horaInicio;
    const date1 = new Date(hora1);
    // hora de fin
    const hora2 = 'January 1, 2025' + ' ' + horaFin ;
    const date2 = new Date(hora2);
    /* se restan las horas y se obtiene el valor absoluto para evitar 
    errores, despues se divide entre 3600000 porque el resultado esta en
    milisegundos */
    const horaClase = (Math.abs(date2.valueOf() - date1.valueOf())) / 3600000;
    // se suman las horas al acumulador
    horasTotalClase += horaClase;
    // se cambia el valor de las celdas a las horas totales
    celda.innerText = horasTotalClase;
    celdaComparacion.innerText = horasTotalClase;
    return horaClase;
}