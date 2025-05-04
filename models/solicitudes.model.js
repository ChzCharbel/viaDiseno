const db = require("../util/database");


const obtenerIdMateriaPorCicloEscolarMateria = async (idCicloEscolarMateria) => {
  try {
    const result = await db.query(`
      SELECT pm.id_materia
      FROM ciclos_escolares_materias cem
      JOIN planes_materias pm ON cem.id_plan_materia = pm.id_plan_materia
      WHERE cem.id_ciclo_escolar_materia = $1
    `, [idCicloEscolarMateria]);

    if (result.rows.length > 0) {
      return result.rows[0].id_materia;
    } else {
      throw new Error("No se encontró el id_materia relacionado.");
    }
  } catch (error) {
    console.error("Error en obtenerIdMateriaPorCicloEscolarMateria:", error);
    throw error;
  }
};


module.exports = class SolicitaCambio {
  static fetchAll(idCiclo) {
    return db.query(
      `SELECT * FROM solicitudes_cambio sc JOIN usuarios u using(id_ivd) JOIN alumnos a using(id_ivd) 
      WHERE id_ciclo_escolar = $1::integer;`, [idCiclo]
    );
  }

  static fetchOne(matricula, idCiclo) {
    return db.query(
      `SELECT * FROM solicitudes_cambio sc JOIN usuarios u using(id_ivd) JOIN alumnos a using(id_ivd) 
      WHERE sc.id_ivd = $1::text AND id_ciclo_escolar = $2::integer;`,
      [matricula, idCiclo]
    );
  }

  

  static async crearSolicitud({ id_ivd, id_ciclo_escolar, id_materia, tipo, descripcion, mensaje }) {
    const query = `
      INSERT INTO solicitudes_cambio
      (id_ivd, id_ciclo_escolar, id_materia, tipo, descripcion, mensaje, fecha_solicitud, aprobado, resuelto)
      VALUES ($1, $2, $3, $4, $5, $6, CURRENT_DATE, null, false)
    `;
    const values = [id_ivd, id_ciclo_escolar, id_materia, tipo, descripcion, mensaje];
    return db.query(query, values);
  }
  
  

  static actualizarEstatus(idSolicitud, aprobado, fechaResolucion) {
    return db.query(
      `UPDATE solicitudes_cambio
       SET aprobado = $1, fecha_resolucion = $2, resuelto = TRUE
       WHERE id_solicitud = $3;`,
      [aprobado, fechaResolucion, idSolicitud]
    );
  }

  static verificarEmpalme(horaInicioGrupo, horaFinGrupo, horaInicioNuevo, horaFinNuevo) {
    /* para que se pueda convertir la hora, se agrega un dia predeterminado 
    ya que lo unico que nos importa es la diferencia de horas */
    // hora de inicio grupo actual
    const hora1 = 'January 1, 2025' + ' ' + horaInicioGrupo;
    const date1 = new Date(hora1);
    // hora de fin grupo actual
    const hora2 = 'January 1, 2025' + ' ' + horaFinGrupo ;
    const date2 = new Date(hora2);
    // hora de inicio grupo nuevo
    const hora3 = 'January 1, 2025' + ' ' + horaInicioNuevo;
    const date3 = new Date(hora3);
    // hora de fin grupo nuevo
    const hora4 = 'January 1, 2025' + ' ' + horaFinNuevo ;
    const date4 = new Date(hora4);
    return (date3 >= date1 && date3 < date2);
  }

  static async agregarMateria(solicitud) {
    // grupo de la materia a la que se quiere cambiar el alumno
    const grupoQuery = await db.query(`SELECT * FROM grupos_ciclos_materias gcm
      JOIN ciclos_escolares_materias cem using (id_ciclo_escolar_materia)
      JOIN planes_materias pm using (id_plan_materia)
      JOIN grupos using (id_grupo)
      JOIN grupos_horarios using (id_grupo)
      WHERE id_materia = $1::integer;`, [solicitud.id_materia]);
    const grupoMateriaSolicitada = grupoQuery.rows;
    // revisar que todavia haya lugares disponibles en el grupo
    if (grupoMateriaSolicitada[0].cupo_disponible > 0) {
      // grupos a los que ya esta asignado el alumno
      const enlistaQuery = await db.query(`SELECT DISTINCT on (id_grupo_horario) 
        id_grupo_horario, *
        FROM grupos_horarios
        JOIN enlista using (id_grupo)
        JOIN grupos using (id_grupo)
        JOIN grupos_ciclos_materias gcm using (id_grupo)
        JOIN ciclos_escolares_materias cem using (id_ciclo_escolar_materia)
        JOIN planes_materias pm using (id_plan_materia)
        JOIN materias using (id_materia)
        WHERE id_ivd = $1::text;`, [solicitud.id_ivd]);
      if (enlistaQuery.rowCount > 0) {
        const gruposAlumno = enlistaQuery.rows;
        // ver si la materia solicitada se imparte mas de un dia a la semana
        if (grupoMateriaSolicitada.length > 1) {
          for (let horario of grupoMateriaSolicitada) {
            const dia = horario.dia_semana;
            for (let grupo of gruposAlumno) {
              if (grupo.dia_semana == dia) {
                // ver que no se empalme la nueva materia con el grupo inscrito
                if (this.verificarEmpalme(grupo.hora_inicio, grupo.hora_fin, horario.hora_inicio, horario.hora_fin) === true) {
                  throw new Error('El grupo al que se desea cambiar el alumno se empalma con la materia ' + grupo.materia);
                }
              }
            }
          }
        }
        else {
          const dia = grupoMateriaSolicitada[0].dia_semana;
          console.log(dia);
          for (let grupo of gruposAlumno) {
            if (grupo.dia_semana == dia) {
              console.log('ver que no se empalme en ' + dia);
              // ver que no se empalme la nueva materia con el grupo inscrito
              if (this.verificarEmpalme(grupo.hora_inicio, grupo.hora_fin, grupoMateriaSolicitada[0].hora_inicio, grupoMateriaSolicitada[0].hora_fin) === true) {
                throw new Error('El grupo al que se desea cambiar el alumno se empalma con la materia ' + grupo.materia);
              }
            }
          }
        }
            
      }
    return db.query(`INSERT INTO enlista (id_grupo, id_ivd) VALUES ($1::integer, $2::text)`, [grupoMateriaSolicitada.id_grupo, solicitud.id_ivd]);
    }
    else {
      throw new Error("El grupo al que se desea cambiar el alumno ya no tiene cupo disponible.");
    }
  }

  static async eliminarMateria(solicitud) {
    const grupoQuery = await db.query(`SELECT * FROM grupos_ciclos_materias gcm
      JOIN ciclos_escolares_materias cem using (id_ciclo_escolar_materia)
      JOIN planes_materias pm using (id_plan_materia)
      JOIN enlista using (id_grupo)
      WHERE id_ivd = $1::text AND id_materia = $2::integer;`, [solicitud.id_ivd, solicitud.id_materia]);
    return db.query(`DELETE FROM enlista WHERE id_grupo = $1::integer AND id_ivd = $2::text`, [grupoQuery.rows[0].id_grupo, solicitud.id_ivd]);
  }

  static async actualizarEstatusConRespuesta(idSolicitud, aprobado, respuesta) {
    
    if (aprobado == true) {
      // obtener informacion de la solicitud
      const solicitudQuery = await db.query(`SELECT * FROM solicitudes_cambio WHERE id_solicitud = $1::integer`, [idSolicitud]);
      const solicitud = solicitudQuery.rows[0];
      if (solicitud.tipo == 'agregar') {
        console.log('Se quiere agregar una materia')
        await this.agregarMateria(solicitud);
      }
      else if (solicitud.tipo == 'eliminar') {
        await this.eliminarMateria(solicitud);
      }
    }

    return db.query(
      `UPDATE solicitudes_cambio
       SET aprobado = $1, mensaje = $2, fecha_resolucion = NOW(), resuelto = TRUE
       WHERE id_solicitud = $3;`,
      [aprobado, respuesta, idSolicitud]
    );
  }
  
};
module.exports.obtenerIdMateriaPorCicloEscolarMateria = obtenerIdMateriaPorCicloEscolarMateria;





