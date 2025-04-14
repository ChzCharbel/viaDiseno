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
            let agregar = true;
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

    static async fetchPlanes(carrera) {
        
    }
}

