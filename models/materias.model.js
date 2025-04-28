const db = require('../util/database');
const {getAllCourses, getAllDegrees} = require('../util/admin.api.client');

module.exports = class Grupo{
    static async getAllCourses() {
        return await getAllCourses();
    }

    static async getAllDegrees() {
        return await getAllDegrees();
    }

    /* Devuelve las materias que no se encuentran en la 
    oferta del ciclo escolar actual */
    static async fetchAll(idCiclo) {
        try {
            const planesMaterias = await db.query(`SELECT * FROM planes_materias
                JOIN planes_estudios using (id_plan_estudio)
                JOIN materias using (id_materia);`)
            const materiasNoOfertadas = [];
            for (let materia of planesMaterias.rows) {
                const materiaExistente = await db.query(`
                    SELECT * FROM ciclos_escolares_materias
                    JOIN planes_materias using (id_plan_materia)
                    JOIN materias using (id_materia)
                    WHERE id_materia = $1::integer AND id_ciclo_escolar = $2::integer;`, [materia.id_materia, idCiclo]);
                if (materiaExistente.rowCount  == 0) {
                    materiasNoOfertadas.push(materia);
                }
            }
            return materiasNoOfertadas;
        }
        catch (error) {
            console.error("Error al obtener materias:", error);
            throw error;
        }
    }
 
    /* Filtra las materias por la carrera
     que reciba como parametro */
     static async fetchByDegree(carrera) {
         return this.getAllCourses().then((materias) => {
             const arregloMaterias = [];
             for (let materia of materias) {
                 if (materia.plans[0].degree.name == carrera) {
                     arregloMaterias.push(materia);
                 }
             }
 
             return arregloMaterias;
         }).catch((error) => {
             console.log(error);
         });
     }

     /* Filtra los planes de estudio por carrera */
    static fetchPlanesByDegree(carrera) {
        return db.query(`SELECT * FROM planes_estudios WHERE
        id_carrera = (SELECT id_carrera FROM carreras WHERE carrera = 
        $1::text);`, [carrera]);
    }
 
     static async sincronizarDesdeAPI() {
         try {
         const materias = await getAllCourses();
         for (let materia of materias) {
             if (materia.plans[0].degree.status == 'active') {
                 const estatus = materia.plans[0].degree.status;
                 const { id, name, credits, hours_professor} = materia;
                 await db.query(`
                    CALL sincronizar_materias($1::integer, $2::text, $3::integer, $4::integer);
                 `, [id, name, parseInt(credits), hours_professor]);
             }
         }
 
         console.log("Materias sincronizadas exitosamente.");
         return { mensaje: "Sincronización completada", total: materias.length };
         } catch (error) {
             console.error("Error al sincronizar materias:", error);
             throw error;
         }
     }
 
     static async sincronizarCarrerasDesdeAPI() {
        try {
            const carreras = await getAllDegrees();
            for (let carrera of carreras) {
                if (carrera.status == 'active') {
                    const {id, name} = carrera;
                    await db.query(`
                        CALL sincronizar_carreras($1::integer,$2::text);
                    `, [id, name]);
                }
            }
            console.log("Carreras sincronizadas exitosamente.");
            return { mensaje: "Sincronización completada", total: carreras.length };
        }
        catch (error) {
            console.error("Error al sincronizar carreras:", error);
            throw error;
        }
    }

    static async sincronizarPlanesDesdeAPI() {
        try {
            const planes = await getAllDegrees();
            for (let carrera of planes) {
                for (let plan of carrera.plans) {
                    if (plan.status == 'active') {
                        const name = carrera.name + ' ' + plan.version;
                        const id = plan.id;
                        const nombreCarrera = carrera.name;
                        await db.query(`
                        CALL sincronizar_planes($1::integer,$2::text, 
                        $3::text);
                    `, [id, name, nombreCarrera]);
                    }
                }
            }
        
            console.log("Planes sincronizadas exitosamente.");
            return { mensaje: "Sincronización completada", total: planes.length };
        }
        catch (error) {
            console.error("Error al sincronizar planes:", error);
            throw error;
        }
    }
    
    static async sincronizarPlanesMaterias() {
        try {
            const materiasAPI = await getAllCourses();
            for (let materia of materiasAPI) {
                if (materia.plans[0].degree.status == 'active') {
                    const estatus = materia.plans[0].status;
                    const planId = materia.plans[0].id;
                    const semestre = materia.plans_courses[0].semester;
                    await db.query(`
                        CALL sincronizar_planes_materias($1::integer, $2::integer, $3::integer, $4::text);
                    `, [materia.id, planId, semestre, estatus]);
                }
            }
            console.log("Planes con materias sincronizadss exitosamente.");
            return { mensaje: "Sincronización completada", total: materiasAPI.length };
        }
        catch (error) {
            console.error("Error al sincronizar planes con materias:", error);
            throw error;
        }
    }
    static async getMateriasConProfesorPorCiclo(idCicloEscolar) {
        try {
          const resultado = await db.query(`
            SELECT DISTINCT ON (m.id_materia, p.id_profesor)
              m.materia AS nombre_materia,
              p.profesor AS profesor,
              pm.id_profesor_materia,
              p.id_profesor,
              m.id_materia,
              cem.id_ciclo_escolar_materia,
              g.id_grupo AS id
            FROM profesores_materias pm
            JOIN profesores p ON p.id_profesor = pm.id_profesor
            JOIN ciclos_escolares_materias cem ON cem.id_ciclo_escolar_materia = pm.id_ciclo_escolar_materia
            JOIN planes_materias plm ON plm.id_plan_materia = cem.id_plan_materia
            JOIN materias m ON m.id_materia = plm.id_materia
            LEFT JOIN grupos_ciclos_materias gcm ON gcm.id_ciclo_escolar_materia = cem.id_ciclo_escolar_materia
            LEFT JOIN grupos g ON gcm.id_grupo = g.id_grupo
            WHERE cem.id_ciclo_escolar = $1
            ORDER BY m.id_materia, p.id_profesor, g.id_grupo NULLS LAST
          `, [idCicloEscolar]);
      
          return resultado.rows;
        } catch (error) {
          console.error("Error al obtener materias con profesor:", error);
          return [];
        }
      }                 

    }