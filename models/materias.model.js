const db = require('../util/database');
const {getAllCourses, getAllDegrees} = require('../util/admin.api.client');

module.exports = class Grupo{
    static async getAllCourses() {
        return await getAllCourses();
    }

    static async getAllDegrees() {
        return await getAllDegrees();
    }

    static async syncMaterias() {

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
    static async fetchPlanesByDegree(carrera) {
        return this.getAllDegrees().then((planes) => {
            /* Carrera:
            id: plan.id
            nombre: plan.name
            estatus: plan.status

            Plan de Estudio:
            id: plan.plans[0].id
            version: plan.plans[0].version
            estatus: plan.plans[0].status
        */
        const arregloPlanes = [];
        let plansLength = 0;
        for (let plan of planes) {
            if (plan.name == carrera) {
                plansLength = plan.plans.length;
                if (plansLength > 0) {
                    for (let i = 0; i < plansLength; i++) {
                        if (plan.plans[i].status == 'active') {
                            arregloPlanes.push(plan.plans[i]);
                        }
                    }
                }
            }
        }

        return arregloPlanes;
        }).catch((error) => {
            console.log(error);
        })
    }
}

