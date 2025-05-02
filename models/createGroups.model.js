const db = require('../util/database');
const Oferta = require('../models/oferta.model');
const Profesor = require('../models/profesores.model');

// Función utilitaria para garantizar que los valores de tiempo no sean vacíos
function ensureValidTime(timeValue) {
    if (!timeValue || timeValue === '') {
        return '00:00:00'; // Valor por defecto
    }
    return timeValue;
}

module.exports = class GruposAutomaticos {
    /* se usaran para ver cuales imparte cada profe y 
    finalmente para ver cuantos grupos se crearon 
    contra cuantas materias hay
    */
    static materiasOfertadas = [];
    static materiasPrioritarias = [];
    static materiasMultiplesProfes = [];
    static materiasAsignadas = [];
    static grupos = [];
    static idProfes = [];
    static idCiclo = -1;
    static semana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
    static gruposPrimero = [];
    static gruposSegundo = [];
    static gruposTercero = [];
    static gruposCuarto = [];
    static gruposQuinto = [];
    static gruposSexto = [];
    static gruposSeptimo = [];
    static gruposOctavo = [];
    static gruposNoveno = [];
    /* arreglos con horas de inicio y fin de los grupos 
    para evitar que se asignen clases del mismo semestre
    a la misma hora

    horasEvitarMayor: sirve para generar el query donde
    se obtiene la disponibilidad del profe y que sólo se
    tengan horas posteriores al fin de los grupos ya 
    existentes

    horasEvitarMenor: sirve para generar el query donde
    se obtiene la disponibilidad del profe y que sólo se
    tengan horas previas al inicio de los grupos ya 
    existentes

    */

    static horasEvitarMayor = [ 
        [ [], [], [], [], [] ],
        [ [], [], [], [], [] ],
        [ [], [], [], [], [] ],
        [ [], [], [], [], [] ],
        [ [], [], [], [], [] ],
        [ [], [], [], [], [] ],
        [ [], [], [], [], [] ],
        [ [], [], [], [], [] ],
        [ [], [], [], [], [] ]
    ];
    static horasEvitarMenor = [ 
        [ [], [], [], [], [] ],
        [ [], [], [], [], [] ],
        [ [], [], [], [], [] ],
        [ [], [], [], [], [] ],
        [ [], [], [], [], [] ],
        [ [], [], [], [], [] ],
        [ [], [], [], [], [] ],
        [ [], [], [], [], [] ],
        [ [], [], [], [], [] ]
    ];

    static async rollbackDisponibilidadProfe(idMateriaCiclo) {
        const grupos = await this.fetchGruposByIdMateriaCiclo(idMateriaCiclo);
        const idsCambiar = [];
        let horaActual = '';
        for (let grupo of grupos.rows) {
            console.log('ciclo escolar: ' + grupo.id_ciclo_escolar + ' grupo: '
                + grupo.id_grupo + ' idGrupoHorario: ' + grupo.dia_semana + ' ' 
                + grupo.id_grupo_horario + ' hora inicio: ' +  grupo.hora_inicio 
                + ' hora fin: ' + grupo.hora_fin + ' idProfesor: ' + grupo.id_profesor);
            const mediaHora = await db.query(`SELECT * FROM profesores_disponibilidad 
                WHERE id_ciclo_escolar = $1::integer AND dia_semana = $2::text AND 
                id_profesor = $3::integer ORDER BY dia_semana, hora_inicio;`, 
                [grupo.id_ciclo_escolar, grupo.dia_semana, grupo.id_profesor]);
            console.log('MEDIA HORA: ');
            console.log(mediaHora.rows);
            for (let disponibilidad of mediaHora.rows) {
                if (disponibilidad.hora_inicio === grupo.hora_inicio) {
                    console.log(disponibilidad);
                    idsCambiar.push(disponibilidad.id_profesor_disponibilidad);
                    horaActual = disponibilidad.hora_fin;
                }
                else {
                    if (disponibilidad.hora_inicio !== grupo.hora_fin) {
                        if (horaActual === disponibilidad.hora_inicio) {
                            console.log(disponibilidad);
                            idsCambiar.push(disponibilidad.id_profesor_disponibilidad);
                            horaActual = disponibilidad.hora_fin;
                        }
                    }
                }
            }
            console.log(idsCambiar);
            await db.query('BEGIN;');
            if (idsCambiar.length > 1 ) {
                let update = 'UPDATE profesores_disponibilidad SET disponible = TRUE WHERE id_profesor_disponibilidad = $1::integer';
                let contParametro = 2;
                for (let i = 0; i < idsCambiar.length; i++) {
                    //update += idsCambiar[i];
                    if (i === (idsCambiar.length - 1)) {
                        update += ';'
                    }
                    else {
                        update += ' OR id_profesor_disponibilidad = $';
                        update += contParametro;
                        update += '::integer'
                    }
                    contParametro++;
                }
                console.log(update);
                console.log(idsCambiar)
                await db.query(update, idsCambiar);
                
            }
            else {
                console.log('UPDATE profesores_disponibilidad SET disponible = TRUE WHERE id_profesor_disponibilidad = ' + idsCambiar[0]);
                await db.query(`UPDATE profesores_disponibilidad SET disponible = TRUE WHERE id_profesor_disponibilidad = $1::integer`, idsCambiar[0]);
            }
            await db.query(`DELETE FROM grupos WHERE id_grupo = $1::integer`, [grupo.id_grupo]);
        }
        await db.query('COMMIT;');
    }

    static fetchGruposByIdMateriaCiclo(idMateriaCiclo) {
        return db.query(`SELECT * FROM grupos_ciclos_materias 
        JOIN ciclos_escolares_materias using (id_ciclo_escolar_materia)
        JOIN grupos_horarios using (id_grupo)
        JOIN grupos using (id_grupo)
        WHERE id_ciclo_escolar_materia = $1::integer;`, [idMateriaCiclo]);
    }

    static fetchAll(ciclo) {
        return db.query(`SELECT * FROM grupos_ciclos_materias
        JOIN ciclos_escolares_materias using (id_ciclo_escolar_materia)
        JOIN grupos using (id_grupo)
        JOIN grupos_horarios using (id_grupo)
        JOIN profesores using (id_profesor)
        JOIN planes_materias using (id_plan_materia)
        JOIN materias using (id_materia)
        WHERE id_ciclo_escolar = $1::integer;`, [ciclo]);
    }

    static resultadoAsignacion() {
        console.log('Grupos:')
        console.log(this.grupos);
        console.log('Las materias que fueron asignadas son:')
        console.log(this.materiasAsignadas);
        console.log('Las materias que no pudieron asignarse son:')
        for (let materia of this.materiasOfertadas.rows) {
            if (this.materiasAsignadas.includes(materia.id_materia) === false) {
                console.log(materia.id_materia);
            }
        }
        return this.materiasAsignadas;
    }
    

    static async obtenerGruposSemestre() {
        const gruposSemestre = this.fetchAll(this.idCiclo); //!!!
        if (gruposSemestre.rowCount > 0) {
            for (let grupo of gruposSemestre.rows) {
                if (grupo.bloque_semestre === 1) {
                    this.gruposPrimero.push([grupo.dia_semana, grupo.hora_inicio, grupo.hora_fin]);
                }
                else if (grupo.bloque_semestre === 2) {
                    this.gruposSegundo.push([grupo.dia_semana, grupo.hora_inicio, grupo.hora_fin]);
                }
                else if (grupo.bloque_semestre === 3) {
                    this.gruposTercero.push([grupo.dia_semana, grupo.hora_inicio, grupo.hora_fin]);
                }
                else if (grupo.bloque_semestre === 4) {
                    this.gruposCuarto.push([grupo.dia_semana, grupo.hora_inicio, grupo.hora_fin]);
                }
                else if (grupo.bloque_semestre === 5) {
                    this.gruposQuinto.push([grupo.dia_semana, grupo.hora_inicio, grupo.hora_fin]);
                }
                else if (grupo.bloque_semestre === 6) {
                    this.gruposSexto.push([grupo.dia_semana, grupo.hora_inicio, grupo.hora_fin]);
                }
                else if (grupo.bloque_semestre === 7) {
                    this.gruposSeptimo.push([grupo.dia_semana, grupo.hora_inicio, grupo.hora_fin]);
                }
                else if (grupo.bloque_semestre === 8) {
                    this.gruposOctavo.push([grupo.dia_semana, grupo.hora_inicio, grupo.hora_fin]);
                }
                else if (grupo.bloque_semestre === 9) {
                    this.gruposNoveno.push([grupo.dia_semana, grupo.hora_inicio, grupo.hora_fin]);
                }
            }
            console.log("GRUPOS:");
            console.log(this.gruposPrimero);
            console.log(this.gruposSegundo);
            console.log(this.gruposTercero);
            console.log(this.gruposCuarto);
            console.log(this.gruposQuinto);
            console.log(this.gruposSexto);
            console.log(this.gruposSeptimo);
            console.log(this.gruposOctavo);
            console.log(this.gruposNoveno);

        }
    }

    static async asignarHorarioGrupo(horarioClase, horario, idMateria) {
        let acumHoras = 0;
        let horaFin = '';
        // arreglo donde guardo la hora de inicio y fin de la clase por dia
        const inicioFinDias = [];
        /* arreglo donde guardo los ids de la tabla de disponibilidad
        que voy a cambiar */
        const idsCambiar = [];
        // contador del elemento en el que voy del arreglo inicioFinDias
        let contadorHorarios = 0;

        console.log('Asignando horario al profesor con id ' + horario.rows[0].id_profesor) 

        for (let i = 0; i < horarioClase.length; i++) {
            inicioFinDias.push([horarioClase[i][1]]);

            console.log('El ' + horarioClase[i][1] + ' debe cumplir con ' + horarioClase[i][0] + ' horas')
            acumHoras = 0;

            for (let j = 0; j < horario.rows.length; j++) {

                if (horarioClase[i][1] == horario.rows[j].dia_semana) {
                    if (acumHoras < horarioClase[i][0]) {
                        if (inicioFinDias[contadorHorarios].length == 1) {
                            inicioFinDias[contadorHorarios].push(horario.rows[j].hora_inicio);
                            idsCambiar.push(horario.rows[j].id_profesor_disponibilidad);
                            acumHoras += 0.5;

                            if (horarioClase[i][1] == 'lunes') {
                                this.horasEvitarMenor[0][0].push(horario.rows[j].hora_inicio);
                            }
                            else if (horarioClase[i][1] == 'martes') {
                                this.horasEvitarMenor[0][1].push(horario.rows[j].hora_inicio);
                            }
                            else if (horarioClase[i][1] == 'miercoles') {
                                this.horasEvitarMenor[0][2].push(horario.rows[j].hora_inicio);
                            }
                            else if (horarioClase[i][1] == 'jueves') {
                                this.horasEvitarMenor[0][3].push(horario.rows[j].hora_inicio);
                            }
                            else if (horarioClase[i][1] == 'viernes') {
                                this.horasEvitarMenor[0][4].push(horario.rows[j].hora_inicio);
                            }
                        }
                        else {
                            if (horario.rows[j].hora_inicio == horario.rows[j - 1].hora_fin) {
                                acumHoras += 0.5;
                                horaFin = horario.rows[j].hora_fin;
                                idsCambiar.push(horario.rows[j].id_profesor_disponibilidad);
                            }
                            else {
                                if (horarioClase[i][0] - acumHoras == 0.5) {
                                    inicioFinDias[contadorHorarios].push(horario.rows[j - 1].hora_inicio);
                                    if (horarioClase[i][1] == 'lunes') {
                                        this.horasEvitarMayor[0][0].push(horario.rows[j - 1].hora_inicio);
                                    }
                                    else if (horarioClase[i][1] == 'martes') {
                                        this.horasEvitarMayor[0][1].push(horario.rows[j - 1].hora_inicio);
                                    }
                                    else if (horarioClase[i][1] == 'miercoles') {
                                        this.horasEvitarMayor[0][2].push(horario.rows[j - 1].hora_inicio);
                                    }
                                    else if (horarioClase[i][1] == 'jueves') {
                                        this.horasEvitarMayor[0][3].push(horario.rows[j - 1].hora_inicio);
                                    }
                                    else if (horarioClase[i][1] == 'viernes') {
                                        this.horasEvitarMayor[0][4].push(horario.rows[j - 1].hora_inicio);
                                    }
                                    acumHoras -= 0.5;
                                    contadorHorarios += 1;
                                    inicioFinDias.push([horarioClase[i][1]]);
                                    inicioFinDias[contadorHorarios].push(horario.rows[j].hora_inicio);
                                    if (horarioClase[i][1] == 'lunes') {
                                        this.horasEvitarMenor[0][0].push(horario.rows[j].hora_inicio);
                                    }
                                    else if (horarioClase[i][1] == 'martes') {
                                        this.horasEvitarMenor[0][1].push(horario.rows[j].hora_inicio);
                                    }
                                    else if (horarioClase[i][1] == 'miercoles') {
                                        this.horasEvitarMenor[0][2].push(horario.rows[j].hora_inicio);
                                    }
                                    else if (horarioClase[i][1] == 'jueves') {
                                        this.horasEvitarMenor[0][3].push(horario.rows[j].hora_inicio);
                                    }
                                    else if (horarioClase[i][1] == 'viernes') {
                                        this.horasEvitarMenor[0][4].push(horario.rows[j].hora_inicio);
                                    }
                                    acumHoras += 0.5;
                                    idsCambiar.pop();
                                    idsCambiar.push(horario.rows[j].id_profesor_disponibilidad);
                                }
                                else {
                                    inicioFinDias[contadorHorarios].push(horario.rows[j - 1].hora_fin);
                                    acumHoras += 0.5;
                                    contadorHorarios += 1;
                                    inicioFinDias.push([horarioClase[i][1]]);
                                    inicioFinDias[contadorHorarios].push(horario.rows[j].hora_inicio);
                                    idsCambiar.push(horario.rows[j].id_profesor_disponibilidad);
                                    if (horarioClase[i][1] == 'lunes') {
                                        this.horasEvitarMenor[0][0].push(horario.rows[j].hora_inicio);
                                    }
                                    else if (horarioClase[i][1] == 'martes') {
                                        this.horasEvitarMenor[0][1].push(horario.rows[j].hora_inicio);
                                    }
                                    else if (horarioClase[i][1] == 'miercoles') {
                                        this.horasEvitarMenor[0][2].push(horario.rows[j].hora_inicio);
                                    }
                                    else if (horarioClase[i][1] == 'jueves') {
                                        this.horasEvitarMenor[0][3].push(horario.rows[j].hora_inicio);
                                    }
                                    else if (horarioClase[i][1] == 'viernes') {
                                        this.horasEvitarMenor[0][4].push(horario.rows[j].hora_inicio);
                                    }
                                }
                            }
                                        
                        }
                    }
                }
            }
            inicioFinDias[contadorHorarios].push(horaFin);
            contadorHorarios += 1;
            if (horarioClase[i][1] == 'lunes') {
                this.horasEvitarMayor[0][0].push(horaFin);
            }   
            else if (horarioClase[i][1] == 'martes') {
                this.horasEvitarMayor[0][1].push(horaFin);
            }   
            else if (horarioClase[i][1] == 'miercoles') {
                this.horasEvitarMayor[0][2].push(horaFin);
            }   
            else if (horarioClase[i][1] == 'jueves') {
                this.horasEvitarMayor[0][3].push(horaFin);
            }   
            else if (horarioClase[i][1] == 'viernes') {
                this.horasEvitarMayor[0][4].push(horaFin);
            }   
            
        }
        console.log('NUEVOS ARREGLOS: \n Mayor:');
        console.log(this.horasEvitarMayor);
        console.log('NUEVOS ARREGLOS: \n Menor:');
        console.log(this.horasEvitarMenor);
        console.log(inicioFinDias);
        this.grupos.push(inicioFinDias);
        console.log(idsCambiar);
        for (let id of idsCambiar) {
            await db.query(`UPDATE profesores_disponibilidad SET disponible = FALSE WHERE id_profesor_disponibilidad = $1::integer`, [id]);
        }
        
        for (let diaClase of inicioFinDias) {
            console.log('IDMATERIA: ' + idMateria);
            console.log('PROFESOR: ' + horario.rows[0].id_profesor);
            console.log('DIACLASE[0]: ' +  diaClase[0]);
            console.log('DIACLASE[1]: ' + diaClase[1]);
            console.log('DIACLASE[2]: ' + diaClase[2]);
            
            // Utilizar la función utilitaria para garantizar que los valores de tiempo sean válidos
            const horaInicio = ensureValidTime(diaClase[1]);
            const horaFin = ensureValidTime(diaClase[2]);
            
            await db.query('BEGIN;');
            await db.query(`CALL insertar_grupo_horario($1::integer, $2::text, $3::time, $4::time, $5::integer);`,
                [horario.rows[0].id_profesor, diaClase[0], horaInicio, horaFin, idMateria]);
            await db.query('COMMIT;');
            console.log(`Insertado horario: ${diaClase[0]} ${horaInicio}-${horaFin} para materia ${idMateria} con profesor ${horario.rows[0].id_profesor}`);
        }
    }

    static async asignarMateriaAlgoritmo(idProfesor, materiasPrioridad, materiasExtra) {
        // arreglo donde se guardan las horas que tiene disponible el profe cada dia de la semana
        let horasSemanaProfesor = [];
        // primer query para llenar el arreglo
        const disponibilidadProfesor = await Profesor.obtenerDisponibilidad(0, idProfesor, this.idCiclo);
        const disp = disponibilidadProfesor.rows[0];
        // horas disponibles por dia
        let horasLunes = parseInt(disp.total_horas_lunes);
        let horasMartes = parseInt(disp.total_horas_martes);
        let horasMiercoles = parseInt(disp.total_horas_miercoles);
        let horasJueves = parseInt(disp.total_horas_jueves);
        let horasViernes = parseInt(disp.total_horas_viernes);
        // horas disponibles del profesor a la semana
        let horasTotalesSemana = horasLunes + horasMartes + horasMiercoles + horasJueves + horasViernes;
        // string para generar consulta de disponibilidad de horas del profe dinamicamente
        let consultaHoras = '';
        // arreglo con los valores que se enviaran en la consulta
        let parametrosConsulta = [];

        horasSemanaProfesor.push([horasLunes, 'lunes']);
        horasSemanaProfesor.push([horasMartes, 'martes']);
        horasSemanaProfesor.push([horasMiercoles, 'miercoles']);
        horasSemanaProfesor.push([horasJueves, 'jueves']);
        horasSemanaProfesor.push([horasViernes, 'viernes']);
        horasSemanaProfesor.sort();
        horasSemanaProfesor.reverse();

        // Primero se asignan las que solo puede impartir el profesor
        if (materiasPrioridad.length > 0) {
            for (let i = 1; i < materiasPrioridad.length; i++) {
                // guardo el id de la materia
                const idMateria = materiasPrioridad[i];
                // revisar que no haya sido asignada la materia
                if (this.materiasAsignadas.includes(idMateria) === false) {
                    /* obtengo el semestre al que se dara la materia */
                    const semestre_materia = await db.query(`SELECT m.horas_profesor, cem.bloque_semestre
                    FROM materias m
                    JOIN planes_materias pm using (id_materia)
                    JOIN ciclos_escolares_materias cem using (id_plan_materia)
                    WHERE id_materia = $1::integer AND id_ciclo_escolar = $2::integer
                    GROUP BY id_materia, cem.id_ciclo_escolar_materia;`, [idMateria, this.idCiclo]);
                    const bloque_semestre = semestre_materia.rows[0].bloque_semestre;
                    console.log('SEMESTRE MATERIA: ' + semestre_materia.rows[0].bloque_semestre)
                    // vaciar consulta
                    consultaHoras = '';

                    // si ya existen grupos se revisa si hay del mismo semestre y su horario
                    if (this.grupos.length > 0) {
                        // si ya hay grupos de ese mismo semestre
                        if (this.horasEvitarMayor[bloque_semestre - 1].length > 0) {
                                // string para crear consulta
                                consultaHoras = "SELECT FLOOR(COUNT(*) * 0.5) as total_horas_profesor, (SELECT horas_profesor FROM materias m WHERE id_materia = $1::integer ),";
                                // contador para poner en la consulta: $1::integer, $2::date, etc...
                                let contParametros = 2;
                                // arreglo con los valores que se enviaran en la consulta
                                parametrosConsulta = [];
                                // agregar el id de la materia porque es el primer valor que se manda
                                parametrosConsulta.push(idMateria);
                                // se iteran por dia de la semana
                                for (let dia = 0; dia < 5; dia++) {
                                        // revisar que x dia ya se de una materia
                                        if (this.horasEvitarMayor[bloque_semestre - 1][dia].length > 0) {
                                                if (dia === 0) {
                                                        consultaHoras += "FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'lunes' ";
                                                }
                                                else if (dia === 1) {
                                                        consultaHoras += "FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'martes' ";
                                                }
                                                else if (dia === 2) {
                                                        consultaHoras += "FLOOR(COUNT(*) FILTER (WHERE dia_semana LIKE 'mi%' ";
                                                }
                                                else if (dia === 3) {
                                                        consultaHoras += "FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'jueves' ";
                                                }
                                                else if (dia === 4) {
                                                        consultaHoras += "FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'viernes' ";
                                                }

                                                for (let i = 0; i < this.horasEvitarMayor[bloque_semestre - 1][dia].length; i++) {
                                                        consultaHoras += " AND (hora_inicio < $";
                                                        consultaHoras += contParametros;
                                                        consultaHoras += "::time ";
                                                        contParametros++;
                                                        // consultaHoras += this.horasEvitarMenor[bloque_semestre - 1][dia][i];
                                                        parametrosConsulta.push(this.horasEvitarMenor[bloque_semestre - 1][dia][i]);
                                                        consultaHoras += " OR hora_inicio >= $";
                                                        consultaHoras += contParametros;
                                                        consultaHoras += "::time "
                                                        contParametros++;
                                                        // consultaHoras += this.horasEvitarMayor[bloque_semestre - 1][dia][i];
                                                        parametrosConsulta.push(this.horasEvitarMayor[bloque_semestre - 1][dia][i]);
                                                        consultaHoras += ")";
                                                }
                                                consultaHoras += ") * 0.5) AS total_horas_";
                                                if (dia === 0) {
                                                        consultaHoras += "lunes,";
                                                }
                                                else if (dia === 1) {
                                                        consultaHoras += "martes,";
                                                }
                                                else if (dia === 2) {
                                                        consultaHoras += "miercoles,";
                                                }
                                                else if (dia === 3) {
                                                        consultaHoras += "jueves,";
                                                }
                                                else if (dia === 4) {
                                                        consultaHoras += "viernes";
                                                }

                                        }
                                        else {
                                                if (dia === 0) {
                                                        consultaHoras += "FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'lunes')  * 0.5)  AS total_horas_lunes,";
                                                }
                                                else if (dia === 1) {
                                                        consultaHoras += "FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'martes')  * 0.5)  AS total_horas_martes,";
                                                }
                                                else if (dia === 2) {
                                                        consultaHoras += "FLOOR(COUNT(*) FILTER (WHERE dia_semana LIKE 'mi%') * 0.5) AS total_horas_miercoles,";
                                                }
                                                else if (dia === 3) {
                                                        consultaHoras += "FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'jueves')  * 0.5)  AS total_horas_jueves,";
                                                }
                                                else if (dia === 4) {
                                                        consultaHoras += "FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'viernes')  * 0.5)  AS total_horas_viernes";
                                                }
                                        }
                                }
                                consultaHoras += " FROM profesores_disponibilidad pd WHERE id_profesor = $";
                                consultaHoras += contParametros;
                                contParametros++;
                                consultaHoras += "::integer AND disponible = true AND id_ciclo_escolar = $";
                                consultaHoras += contParametros;
                                consultaHoras += "::integer;"
                                parametrosConsulta.push(idProfesor);
                                parametrosConsulta.push(this.idCiclo);
                                console.log('QUERY: ' + consultaHoras);
                                console.log('PARAMETROS: ');
                                console.log(parametrosConsulta);
                        }
                    }
                    else {
                        consultaHoras = `SELECT
                        FLOOR(COUNT(*) * 0.5) as total_horas_profesor, 
                        (SELECT horas_profesor
                        FROM materias m
                        WHERE id_materia = $1::integer ),
                        FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'lunes') * 0.5) AS total_horas_lunes,
                        FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'martes') * 0.5) AS total_horas_martes,
                        FLOOR(COUNT(*) FILTER (WHERE dia_semana LIKE 'mi%') * 0.5) AS total_horas_miercoles,
                        FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'jueves') * 0.5) AS total_horas_jueves,
                        FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'viernes') * 0.5) AS total_horas_viernes
                        FROM profesores_disponibilidad pd
                        WHERE id_profesor = $2::integer AND disponible = true AND id_ciclo_escolar = $3::integer;`;
                        parametrosConsulta = [idMateria, idProfesor, this.idCiclo];
                    }
                    /* obtengo la disponibilidad de nuevo para obtener 
                    las horas en total que necesita la materia */ 
                    // const disponibilidadProfesor = await Profesor.obtenerDisponibilidad(idMateria, idProfesor, this.idCiclo);

                    
                    const disponibilidadProfesor = await db.query(consultaHoras, parametrosConsulta);
                    const disp = disponibilidadProfesor.rows[0];

                    horasTotalesSemana = disp.total_horas_lunes + disp.total_horas_martes + disp.total_horas_miercoles + disp.total_horas_jueves + disp.total_horas_viernes;

                    console.log(disp);
                    /* acumulador de horas para compararlas con las que 
                    necesita la materia y las que ya fueron asignadas */
                    let horasImparte = 0;
                    let horasFaltantes = disp.horas_profesor;
                    /* arreglo de arreglos que tiene el dia y las horas 
                    en total que se impartira la materia */
                    const horarioClase = [];
                    if (horasTotalesSemana >= disp.horas_profesor) {
                        for (let hora of horasSemanaProfesor) {
                            if (horasImparte < disp.horas_profesor) {
                                if (hora[0] < disp.horas_profesor && hora[0] >= 1) {
                                    if (horasFaltantes >= hora[0]) {
                                        horarioClase.push([hora[0],hora[1]]);
                                        horasImparte += hora[0];
                                        horasFaltantes = horasFaltantes - hora[0];
                                        hora[0] = 0;
                                    }
                                    else {
                                        horarioClase.push([horasFaltantes,hora[1]]);
                                        horasImparte += horasFaltantes;
                                        horasFaltantes = hora[0] - horasFaltantes;
                                        hora[0] = horasFaltantes;
                                    }
                                    horasTotalesSemana = horasTotalesSemana - horasImparte;
                                }
                                else if (hora[0] == disp.horas_profesor && hora[0] >= 1) {
                                    horarioClase.push([disp.horas_profesor, hora[1]]);
                                    hora[0] = 0;
                                    horasImparte = disp.horas_profesor;
                                    horasTotalesSemana = horasTotalesSemana - horasImparte;
                                }
                                else if (hora[0] > disp.horas_profesor && hora[0] >= 1) {
                                    horarioClase.push([disp.horas_profesor, hora[1]]);
                                    hora[0] = (hora[0] - (disp.horas_profesor - horasImparte));
                                    horasImparte = disp.horas_profesor;
                                    horasTotalesSemana = horasTotalesSemana - horasImparte;
                                }
                            }
                        }
                        console.log('horario de la clase: ');
                        console.log(horarioClase)

                        console.log('Nuevo horario del profesor: ');
                        horasSemanaProfesor.sort();
                        horasSemanaProfesor.reverse();
                        console.log(horasSemanaProfesor);

                        this.materiasAsignadas.push(idMateria);
                        for (let materia of this.materiasOfertadas.rows) {
                            if (materia.id_materia === idMateria) {
                                if (this.grupos.length > 0) {
                                    // si ya existen grupos del mismo semestre
                                    if (this.horasEvitarMayor[bloque_semestre - 1].length > 0) {
                                        // se genera una consulta especial para obtener las horas en las que no se imparta otra clase del mismo semestre
                                        consultaHoras = "SELECT id_profesor, hora_inicio, hora_fin, id_profesor_disponibilidad, dia_semana FROM profesores_disponibilidad pd WHERE id_profesor = $1::integer AND disponible = true AND id_ciclo_escolar = $2::integer AND (";
                                        // contador de parametros que se envian a la consulta
                                        let contParametros = 3;
                                        // arreglo que guarda los valores
                                        parametrosConsulta = [];
                                        // se agregan el id del profesor y del ciclo porque siempre son los primeros
                                        parametrosConsulta.push(idProfesor);
                                        parametrosConsulta.push(this.idCiclo);
                                        // se itera el arreglo por dias de la semana
                                        for (let dia = 0; dia < 5; dia++) {
                                            if (dia === 0) {
                                                consultaHoras += " (dia_semana = 'lunes'";
                                            }
                                            else if (dia === 1) {
                                                consultaHoras += " OR (dia_semana = 'martes'";
                                            }
                                            else if (dia === 2) {
                                                consultaHoras += " OR (dia_semana LIKE 'mi%'";
                                            }
                                            else if (dia === 3) {
                                                consultaHoras += " OR (dia_semana = 'jueves'";
                                            }
                                            else if (dia === 4) {
                                                consultaHoras += " OR (dia_semana = 'viernes'";
                                            }
                                            // revisar que x dia ya se de una materia
                                            if (this.horasEvitarMayor[bloque_semestre - 1][dia].length > 0) {
                                                for (let i = 0; i < this.horasEvitarMayor[bloque_semestre - 1][dia].length; i++) {
                                                    consultaHoras += " AND (hora_inicio < $";
                                                    consultaHoras += contParametros;
                                                    consultaHoras += "::time";
                                                    parametrosConsulta.push(this.horasEvitarMenor[bloque_semestre - 1][dia][i]);
                                                    contParametros++;
                                                    consultaHoras += " OR hora_inicio >= $";
                                                    consultaHoras += contParametros;
                                                    consultaHoras += "::time)";
                                                    parametrosConsulta.push(this.horasEvitarMayor[bloque_semestre - 1][dia][i]);
                                                    contParametros++;
                                                }
                                            }
                                            consultaHoras += ")"
                                        }
                                        consultaHoras += ") GROUP BY id_profesor_disponibilidad ORDER BY dia_semana, hora_inicio;";
                                        console.log(consultaHoras);
                                        console.log(parametrosConsulta);
                                        const horarioProfe = await db.query(consultaHoras, parametrosConsulta);
                                        this.asignarHorarioGrupo(horarioClase, horarioProfe, materia.id_ciclo_escolar_materia);
                                    }
                                }
                                else {
                                    const horarioProfe = await Profesor.obtenerHorario(idProfesor, this.idCiclo);
                                    this.asignarHorarioGrupo(horarioClase, horarioProfe, materia.id_ciclo_escolar_materia);
                                }
                            }
                        }
                    }
                    else {
                        console.log('El profesor ya no tiene disponibilidad suficiente');
                    }
                }
                else {
                    console.log('La materia ' + idMateria + ' ya fue asignada')
                }
            }
        }

        /* Finalmente, se asignan las que tambien pueden impartir
        mas profes */
        if (materiasExtra.length > 0) {
            for (let i = 1; i < materiasExtra.length; i++) {
                // guardo el id de la materia
                const idMateria = materiasExtra[i];
                // revisar que no haya sido asignada la materia
                if (this.materiasAsignadas.includes(idMateria) === false) {
                    // obtengo el semestre al que se dara la materia
                    const semestre_materia = await db.query(`SELECT m.horas_profesor, cem.bloque_semestre
                    FROM materias m
                    JOIN planes_materias pm using (id_materia)
                    JOIN ciclos_escolares_materias cem using (id_plan_materia)
                    WHERE id_materia = $1::integer AND id_ciclo_escolar = $2::integer
                    GROUP BY id_materia, cem.id_ciclo_escolar_materia;`, [idMateria, this.idCiclo]);
                    // lo agrego a una variable
                    const bloque_semestre = semestre_materia.rows[0].bloque_semestre;

                    // vaciar consulta
                    consultaHoras = '';

                    // si ya existen grupos se revisa si hay del mismo semestre y su horario
                    if (this.grupos.length > 0) {
                        // si ya hay grupos de ese mismo semestre
                        if (this.horasEvitarMayor[bloque_semestre - 1].length > 0) {
                            // string para crear consulta
                            consultaHoras = "SELECT FLOOR(COUNT(*) * 0.5) as total_horas_profesor, (SELECT horas_profesor FROM materias m WHERE id_materia = $1::integer ),";
                            // contador para poner en la consulta: $1::integer, $2::date, etc...
                            let contParametros = 2;
                            // arreglo con los valores que se enviaran en la consulta
                            parametrosConsulta = [];
                            // agregar el id de la materia porque es el primer valor que se manda
                            parametrosConsulta.push(idMateria);
                            // se iteran por dia de la semana
                            for (let dia = 0; dia < 5; dia++) {
                                // revisar que x dia ya se de una materia
                                if (this.horasEvitarMayor[bloque_semestre - 1][dia].length > 0) {
                                    if (dia === 0) {
                                        consultaHoras += "FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'lunes' ";
                                    }
                                    else if (dia === 1) {
                                        consultaHoras += "FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'martes' ";
                                    }
                                    else if (dia === 2) {
                                        consultaHoras += "FLOOR(COUNT(*) FILTER (WHERE dia_semana LIKE 'mi%' ";
                                    }
                                    else if (dia === 3) {
                                        consultaHoras += "FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'jueves' ";
                                    }
                                    else if (dia === 4) {
                                        consultaHoras += "FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'viernes' ";
                                    }

                                    for (let i = 0; i < this.horasEvitarMayor[bloque_semestre - 1][dia].length; i++) {
                                        // garantizar que no se cuentan las horas en las que se imparte otra clase
                                        consultaHoras += " AND (hora_inicio < $";
                                        consultaHoras += contParametros;                                                    consultaHoras += "::time ";
                                                    contParametros++;
                                                    parametrosConsulta.push(ensureValidTime(this.horasEvitarMenor[bloque_semestre - 1][dia][i]));
                                                    consultaHoras += " OR hora_inicio >= $";
                                                    consultaHoras += contParametros;
                                                    consultaHoras += "::time "
                                                    contParametros++;
                                                    parametrosConsulta.push(ensureValidTime(this.horasEvitarMayor[bloque_semestre - 1][dia][i]));
                                        consultaHoras += ")";
                                    }
                                    consultaHoras += ") * 0.5) AS total_horas_";
                                    if (dia === 0) {
                                        consultaHoras += "lunes,";
                                    }
                                    else if (dia === 1) {
                                        consultaHoras += "martes,";
                                    }
                                    else if (dia === 2) {
                                        consultaHoras += "miercoles,";
                                    }
                                    else if (dia === 3) {
                                        consultaHoras += "jueves,";
                                    }
                                    else if (dia === 4) {
                                        consultaHoras += "viernes";
                                    }

                                }
                                else {
                                    if (dia === 0) {
                                        consultaHoras += "FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'lunes')  * 0.5)  AS total_horas_lunes,";
                                    }
                                    else if (dia === 1) {
                                        consultaHoras += "FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'martes')  * 0.5)  AS total_horas_martes,";
                                    }
                                    else if (dia === 2) {
                                        consultaHoras += "FLOOR(COUNT(*) FILTER (WHERE dia_semana LIKE 'mi%') * 0.5) AS total_horas_miercoles,";
                                    }
                                    else if (dia === 3) {
                                        consultaHoras += "FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'jueves')  * 0.5)  AS total_horas_jueves,";
                                    }
                                    else if (dia === 4) {
                                        consultaHoras += "FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'viernes')  * 0.5)  AS total_horas_viernes";
                                    }
                                }
                            }
                            consultaHoras += " FROM profesores_disponibilidad pd WHERE id_profesor = $";
                            consultaHoras += contParametros;
                            contParametros++;
                            consultaHoras += "::integer AND disponible = true AND id_ciclo_escolar = $";
                            consultaHoras += contParametros;
                            consultaHoras += "::integer;";
                            parametrosConsulta.push(idProfesor);
                            parametrosConsulta.push(this.idCiclo);
                            console.log('QUERY: ' + consultaHoras);
                            console.log('PARAMETROS: ');
                            console.log(parametrosConsulta);
                        }
                    }
                    else {
                        consultaHoras = `SELECT
                        FLOOR(COUNT(*) * 0.5) as total_horas_profesor, 
                        (SELECT horas_profesor
                        FROM materias m
                        WHERE id_materia = $1::integer ),
                        FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'lunes') * 0.5) AS total_horas_lunes,
                        FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'martes') * 0.5) AS total_horas_martes,
                        FLOOR(COUNT(*) FILTER (WHERE dia_semana LIKE 'mi%') * 0.5) AS total_horas_miercoles,
                        FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'jueves') * 0.5) AS total_horas_jueves,
                        FLOOR(COUNT(*) FILTER (WHERE dia_semana = 'viernes') * 0.5) AS total_horas_viernes
                        FROM profesores_disponibilidad pd
                        WHERE id_profesor = $2::integer AND disponible = true AND id_ciclo_escolar = $3::integer;`;
                        parametrosConsulta = [idMateria, idProfesor, this.idCiclo];
                    }
                    
                    const disponibilidadProfesor = await db.query(consultaHoras, parametrosConsulta);
                    horasTotalesSemana = horasLunes + horasMartes + horasMiercoles + horasJueves + horasViernes;
                    const disp = disponibilidadProfesor.rows[0];

                    horasTotalesSemana = disp.total_horas_lunes + disp.total_horas_martes + disp.total_horas_miercoles + disp.total_horas_jueves + disp.total_horas_viernes;
                    
                    console.log(disp);
                    /* acumulador de horas para compararlas con las que 
                    necesita la materia y las que ya fueron asignadas */
                    let horasImparte = 0;
                    let horasFaltantes = disp.horas_profesor;
                    /* arreglo de arreglos que tiene el dia y las horas 
                    en total que se impartira la materia */
                    const horarioClase = [];
                    if (horasTotalesSemana >= disp.horas_profesor) {
                        for (let hora of horasSemanaProfesor) {
                            if (horasImparte < disp.horas_profesor) {
                                if (hora[0] < disp.horas_profesor && hora[0] >= 1) {
                                    if (horasFaltantes >= hora[0]) {
                                        horarioClase.push([hora[0],hora[1]]);
                                        horasImparte += hora[0];
                                        horasFaltantes = horasFaltantes - hora[0];
                                        hora[0] = 0;
                                    }
                                    else {
                                        horarioClase.push([horasFaltantes,hora[1]]);
                                        horasImparte += horasFaltantes;
                                        horasFaltantes = hora[0] - horasFaltantes;
                                        hora[0] = horasFaltantes;
                                    }
                                    horasTotalesSemana = horasTotalesSemana - horasImparte;
                                }
                                else if (hora[0] == disp.horas_profesor && hora[0] >= 1) {
                                    horarioClase.push([disp.horas_profesor, hora[1]]);
                                    hora[0] = 0;
                                    horasImparte = disp.horas_profesor;
                                    horasTotalesSemana = horasTotalesSemana - horasImparte;
                                }
                                else if (hora[0] > disp.horas_profesor && hora[0] >= 1) {
                                    horarioClase.push([disp.horas_profesor, hora[1]]);
                                    hora[0] = (hora[0] - (disp.horas_profesor - horasImparte));
                                    horasImparte = disp.horas_profesor;
                                    horasTotalesSemana = horasTotalesSemana - horasImparte;
                                }
                            }
                        }
                        console.log('horario de la clase: ');
                        console.log(horarioClase)

                        console.log('Nuevo horario del profesor: ');
                        horasSemanaProfesor.sort();
                        horasSemanaProfesor.reverse();
                        console.log(horasSemanaProfesor);

                        this.materiasAsignadas.push(idMateria);
                        const horarioProfe = await Profesor.obtenerHorario(idProfesor, this.idCiclo);
                        for (let materia of this.materiasOfertadas.rows) {
                            if (materia.id_materia === idMateria) {
                                if (this.grupos.length > 0) {
                                    if (this.horasEvitarMayor[bloque_semestre - 1].length > 0) {
                                        consultaHoras = "SELECT id_profesor, hora_inicio, hora_fin, id_profesor_disponibilidad, dia_semana FROM profesores_disponibilidad pd WHERE id_profesor = $1::integer AND disponible = true AND id_ciclo_escolar = $2::integer AND (";
                                        let contParametros = 3;
                                        parametrosConsulta = [];
                                        parametrosConsulta.push(idProfesor);
                                        parametrosConsulta.push(this.idCiclo);

                                        for (let dia = 0; dia < 5; dia++) {
                                            if (dia === 0) {
                                                consultaHoras += " (dia_semana = 'lunes'";
                                            }
                                            else if (dia === 1) {
                                                consultaHoras += " OR (dia_semana = 'martes'";
                                            }
                                            else if (dia === 2) {
                                                consultaHoras += " OR (dia_semana LIKE 'mi%'";
                                            }
                                            else if (dia === 3) {
                                                consultaHoras += " OR (dia_semana = 'jueves'";
                                            }
                                            else if (dia === 4) {
                                                consultaHoras += " OR (dia_semana = 'viernes'";
                                            }
                                            // revisar que x dia ya se de una materia
                                            if (this.horasEvitarMayor[bloque_semestre - 1][dia].length > 0) {
                                                for (let i = 0; i < this.horasEvitarMayor[bloque_semestre - 1][dia].length; i++) {
                                                    consultaHoras += " AND (hora_inicio < $";
                                                    consultaHoras += contParametros;
                                                    consultaHoras += "::time";
                                                    parametrosConsulta.push(this.horasEvitarMenor[bloque_semestre - 1][dia][i]);
                                                    contParametros++;
                                                    consultaHoras += " OR hora_inicio >= $";
                                                    consultaHoras += contParametros;
                                                    consultaHoras += "::time)";
                                                    parametrosConsulta.push(this.horasEvitarMayor[bloque_semestre - 1][dia][i]);
                                                    contParametros++;
                                                }
                                            }
                                            consultaHoras += ")"
                                            
                                        }
                                        consultaHoras += ") GROUP BY id_profesor_disponibilidad ORDER BY dia_semana, hora_inicio;";
                                        console.log(consultaHoras);
                                        console.log(parametrosConsulta);
                                        const horarioProfe = await db.query(consultaHoras, parametrosConsulta);
                                        this.asignarHorarioGrupo(horarioClase, horarioProfe, materia.id_ciclo_escolar_materia);
                                    }
                                }
                                else {
                                    const horarioProfe = await Profesor.obtenerHorario(idProfesor, this.idCiclo);
                                    this.asignarHorarioGrupo(horarioClase, horarioProfe, materia.id_ciclo_escolar_materia);
                                }
                            }
                        }
                        
                    }
                    else {
                        console.log('El profesor ya no tiene disponibilidad suficiente');
                    }
                }
                else {
                    console.log('La materia ' + idMateria + ' ya fue asignada')
                }
            }
        }
        this.resultadoAsignacion();
    }

    static async iterarProfes() {

        let profeMateriasPrioritarias = []; 
        let profeMateriasMultiplesProfes = [];

        for (let profeId of this.idProfes) {
            profeMateriasPrioritarias = [];
            profeMateriasMultiplesProfes = []

            if (this.materiasPrioritarias.length > 0) {
                for (let arregloProfe of this.materiasPrioritarias) {
                    if (arregloProfe[0] === profeId) {
                        profeMateriasPrioritarias = arregloProfe;
                    }
                }
            }

            if (this.materiasMultiplesProfes.length > 0) {
                for (let arregloProfe of this.materiasMultiplesProfes) {
                    if (arregloProfe[0] === profeId) {
                        profeMateriasMultiplesProfes = arregloProfe;
                    }
                }
            }
            this.asignarMateriaAlgoritmo(profeId, profeMateriasPrioritarias, profeMateriasMultiplesProfes);
        }
    }

    static async getProfes(idCicloIn, carrera) {
        this.idCiclo = idCicloIn

        this.obtenerGruposSemestre();

        // agregar materias ofertadas
        this.materiasOfertadas = await Oferta.fetchAll(this.idCiclo, carrera);
        // ver si el profe ya existe en el arreglo materiasPrioritarias
        let nuevoProfePrioridad = true;
        // ver si el profe ya existe en el arreglo materiasMultiplesProfes
        let nuevoProfe = true;
    
        if (this.materiasOfertadas.rowCount > 0) {
            for (let materiaOfertada of this.materiasOfertadas.rows) {
                // query para obtener las materias que imparten los profesores
                const profesMaterias = await db.query(`SELECT a.id_profesor, b.total_horas_profesor FROM (
                SELECT id_profesor, id_ciclo_escolar_materia FROM profesores_materias 
                WHERE id_ciclo_escolar_materia = $1::integer) a
                INNER JOIN (SELECT id_profesor, COUNT(*) * 0.5 as total_horas_profesor
                FROM profesores_disponibilidad pd
                WHERE disponible = true AND id_ciclo_escolar = $2::integer GROUP BY id_profesor) b on
                a.id_profesor = b.id_profesor;`, [materiaOfertada.id_ciclo_escolar_materia, this.idCiclo]);
                // arreglo[0] = id de materia oferta arreglo[1] = id de ciclo escolar
                if (profesMaterias.rowCount > 0) {
                    const numeroProfes = profesMaterias.rowCount;
                    if (numeroProfes === 1) {
                        nuevoProfePrioridad = true;
                        /* ver si ya hay profes en el arreglo para buscar al profe actual
                        y si existe, agregarle la materia */
                        if (this.materiasPrioritarias.length > 0) {
                            for (let materia of this.materiasPrioritarias) {
                                // checar si el id es el mismo
                                if (materia[0] === (profesMaterias.rows[0].id_profesor)) {
                                    materia.push(materiaOfertada.id_materia);
                                    nuevoProfePrioridad = false;
                                }
                            }
                        }
                        // si el profe no está en el arreglo se agrega junto con la materia
                        if (nuevoProfePrioridad === true) {
                            this.idProfes.push(profesMaterias.rows[0].id_profesor);
                            this.materiasPrioritarias.push([profesMaterias.rows[0].id_profesor, materiaOfertada.id_materia])
                        }
                    }
                    else {
                        for (let profe of profesMaterias.rows) {
                            nuevoProfe = true;
                            /* ver si ya hay profes en el arreglo para buscar al profe actual
                            y si existe, agregarle la materia */
                            if (this.materiasMultiplesProfes.length > 0) {
                                for (let materiaProfe of this.materiasMultiplesProfes) {
                                    if (materiaProfe[0] === profe.id_profesor) {
                                        materiaProfe.push(materiaOfertada.id_materia);
                                        nuevoProfe = false;
                                    }
                                }
                                // si el profe no está en el arreglo se agrega junto con la materia
                                if (nuevoProfe === true) {
                                    if (this.idProfes.includes(profe.id_profesor) === false){
                                        this.idProfes.push(profe.id_profesor);  
                                    }
                                    
                                    this.materiasMultiplesProfes.push([profe.id_profesor, materiaOfertada.id_materia]);
                                }
                            }
                            else {
                                this.materiasMultiplesProfes.push([profe.id_profesor, materiaOfertada.id_materia]);
                            }
                        }
                    }
                }
            }
        }
        this.idProfes = this.idProfes.sort();
        this.materiasPrioritarias = this.materiasPrioritarias.sort();
        this.materiasMultiplesProfes = this.materiasMultiplesProfes.sort();
        console.log('Profesores: ');
        console.log(this.idProfes)
        console.log('Materias que tienen multiples profes asignados: ')
        console.log(this.materiasMultiplesProfes);
        console.log('\nMaterias que solo tienen un profe asignado: ')
        console.log(this.materiasPrioritarias);

        this.iterarProfes();
        console.log('grupos: ')
        console.log(this.grupos);
    }
}