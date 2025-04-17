const db = require("../util/database");
const bcrypt = require("bcryptjs");
const {
  getUserById,
  getUserGroups,
  getAcademicHistory,
  getAllUsers,
} = require("../util/admin.api.client");

module.exports = class Usuario {
  constructor(mi_id, mi_correo, mi_password, mi_rol, mi_username,
    mi_carrera, mi_estatus, mi_regular, mi_semestre) {
    this.id = mi_id;
    this.password = mi_password;
    this.correo = mi_correo;
    this.role = mi_rol;
    this.username = mi_username;
    this.carrera = mi_carrera;
    this.estatus = mi_estatus;
    this.regular = mi_regular;
    this.semestre = mi_semestre;
  }

  static isUser(idIVD) {
    getUserById(idIVD)
      .then((usuarioIVD) => {
        if (
          usuarioIVD.status != "success" ||
          usuarioIVD.data.status != "active"
        ) {
          return false;
        } else {
          return true;
        }
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  static async getDegree(userType, id) {
    const usuariosBuscados = await getAllUsers(userType);
    for (let usuario of usuariosBuscados) {
      if (usuario.ivd_id == id) {
        console.log("nombre: " + usuario.name);
        console.log("carrera dentro del model: " + usuario.degree_name);
        const carrera = usuario.degree_name;
        return carrera;
      }
    }
  }

  /* Funcion que devuelve el nombre completo (name + first_surname + second_surname) 
    correo institucional, rol y carrera del usuario conectandose al API de ViaDiseno
    a traves de la funcion getAllUsers().
    No se usa getUserById() debido a que no devuelve la carrera.
    */
  static async getAtributos(userType, id) {
    const usuarios = await getAllUsers(userType);
    for (let usuario of usuarios) {
      if (usuario.ivd_id == id) {
        console.log("nombre: " + usuario.name);
        console.log("carrera dentro del model: " + usuario.degree_name);
        const rolUsuario = usuario.role.name;
        const nombre = usuario.name + " " + usuario.first_surname + " " +
          usuario.second_surname;
          
        if (rolUsuario == 'student') {
          
          return [nombre, usuario.email, usuario.role.name, usuario.degree_name, 
            usuario.regular, usuario.semester, usuario.status];
        }
        else if (rolUsuario == 'admin') {
          return [nombre, usuario.email, usuario.role.name, 
            'Diseño de la Moda e Industria del Vestido', 
            usuario.status, '', ''];
        }
      }
    }
  }

  static getRole(idIVD) {
    getUserById(idIVD)
      .then((usuarioIVD) => {
        if (this.isUser() == true) {
          console.log(usuarioIVD.data.role.name);
          return usuarioIVD.data.role.name;
        }
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  static getUsername(idIVD) {
    getUserById(idIVD)
      .then((usuarioIVD) => {
        if (this.isUser() == true) {
          console.log(
            usuarioIVD.data.name +
              " " +
              usuarioIVD.data.first_surname +
              " " +
              usuarioIVD.data.second_surname
          );
          const nombre =
            usuarioIVD.data.name +
            " " +
            usuarioIVD.data.first_surname +
            " " +
            usuarioIVD.data.second_surname;
          return nombre;
        }
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  save() {
    return bcrypt
      .hash(this.password, 12)
      .then((password_cifrado) => {
        if (this.role == 'admin') {
          return db.query(`CALL registrar_admin($1::text, 
            $2::text, $3::text, $4::text, 
            $5::text, 
            $6::text);`, [this.id, this.username, password_cifrado, this.correo,
              this.carrera, this.estatus
            ]);
        }
        else if (this.role == 'student') {
          return db.query(`CALL registrar_alumno($1::text, $2::text, $3::text, 
            $4::text, $5::text, $6::boolean, $7::text, $8::text)`, [this.id, 
              this.username, this.correo, password_cifrado, this.carrera, this.regular,
            this.semestre, this.estatus]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static fetchAll() {
    return db.query(`Select * from usuarios;`);
  }

  /* De acuerdo al rol se ejecuta la función que le corresponda para obtener los atributos de su tabla */
  static async fetchOne(matricula) {
    const rolUsuario = await db.query(`SELECT rol FROM usuarios WHERE id_ivd = $1::text`, [matricula]);
    if (rolUsuario.rows[0].rol) {
      console.log(rolUsuario.rows[0].rol);
      if (rolUsuario.rows[0].rol == 'student') {
        return db.query(`Select  * from public.consulta_info_alumnos($1::text)`, [matricula]);
      }
      else if (rolUsuario.rows[0].rol == 'admin') {
        return db.query(`Select * from public.consulta_info_admin($1::text)`, [matricula]);
      }
    };
  }

  static fetch(id) {
    if (id) {
      return this.fetchOne(id);
    } else {
      return this.fetchAll();
    }
  }

  static getRol(id) {
    return db.query(
      `SELECT p.nombre FROM accede a, privilegios p WHERE a.nombre_rol = 
                (SELECT rol FROM usuarios WHERE correo_institucional = $1::text) AND a.id_privilegio = p.id_privilegio;`,
      [correo]
    );
  }

  static getPrivilegios(id) {
    return db.query(
      `SELECT p.nombre FROM accede a, privilegios p WHERE a.nombre_rol = 
                (SELECT rol FROM usuarios WHERE id_ivd = $1::text) AND a.id_privilegio = p.id_privilegio;`,
      [id]
    );
  }
};
