const db = require('../util/database');
const Pool = require('pg-pool');
const {getAllCourses} = require('../util/admin.api.client');

const pool = new Pool();

module.exports = class Grupo{
    static async getAllCourses() {
        return await getAllCourses();
    }

    /* Filtra las materias por la carrera
    que reciba como parametro y las devuelve
    junto con los IDs de los planes que existan
    de las mismas */
    static async fetchByDegree(carrera) {
        return this.getAllCourses().then((materias) => {
            const arregloMaterias = [];
            const planes = [];
            const arr = [];
            for (let materia of materias) {
                if (materia.plans[0].degree.name == carrera) {
                    arregloMaterias.push(materia); 
                    if (planes.length != 0) {
                        if (planes.includes(materia.plans[0].id) == false){
                            planes.push(materia.plans[0].id); 
                        }
                    } else {
                        planes.push(materia.plans[0].id);  
                    }
                }
            }
            arr.push(arregloMaterias);
            arr.push(planes);
            return arr;
        }).catch((error) => {
            console.log(error);
        });
    }
}

