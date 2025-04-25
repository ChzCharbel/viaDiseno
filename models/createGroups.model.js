const db = require('../util/database');
const Oferta = require('../models/oferta.model');
const Profesor = require('../models/profesores.model');

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

    static rollbackDisponibilidadProfe(grupos) {
        
    }

    static fetchGruposByIdMateriaCiclo(idMateriaCiclo) {
        return db.query(`SELECT * FROM grupos_ciclos_materias 
        JOIN ciclos_escolares_materias using (id_ciclo_escolar_materia)
        JOIN grupos_horarios using (id_grupo)
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
                                    acumHoras -= 0.5;
                                    contadorHorarios += 1;
                                    inicioFinDias.push([horarioClase[i][1]]);
                                    inicioFinDias[contadorHorarios].push(horario.rows[j].hora_inicio);
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
                                }
                            }
                                        
                        }
                    }
                }
            }
            inicioFinDias[contadorHorarios].push(horaFin);
            contadorHorarios += 1;
        }
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
            await db.query('BEGIN;');
            await db.query(`CALL insertar_grupo_horario($1::integer, $2::text, $3::time, $4::time, $5::integer);`,
                [horario.rows[0].id_profesor, diaClase[0], diaClase[1], diaClase[2], idMateria]);
            await db.query('COMMIT;');
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
        let horasTotalesSemana = parseInt(disp.total_horas_profesor);

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
                    /* obtengo la disponibilidad de nuevo para obtener 
                    las horas en total que necesita la materia */ 
                    const disponibilidadProfesor = await Profesor.obtenerDisponibilidad(idMateria, idProfesor, this.idCiclo);
                    const disp = disponibilidadProfesor.rows[0];
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
                                this.asignarHorarioGrupo(horarioClase, horarioProfe, materia.id_ciclo_escolar_materia);
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
                    /* obtengo la disponibilidad de nuevo para obtener 
                    las horas en total que necesita la materia */
                    const disponibilidadProfesor = await Profesor.obtenerDisponibilidad(idMateria, idProfesor, this.idCiclo);
                    const disp = disponibilidadProfesor.rows[0];
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
                                this.asignarHorarioGrupo(horarioClase, horarioProfe, materia.id_ciclo_escolar_materia);
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