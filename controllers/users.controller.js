const Usuario = require("../models/users.model");
const CicloEscolar = require("../models/ciclos.model");
const {
  getUserById,
  getUserGroups,
  getAcademicHistory,
} = require("../util/admin.api.client");

exports.get_reset_password = (request, response, next) => {
  response.render("login.ejs", {
    isLoggedIn: request.session.isLoggedIn || false,
    matricula: request.session.matricula || "",
    isNew: true,
    isReset: true, 
    csrfToken: request.csrfToken(),
    privilegios: request.session.privilegios || [],
    error: request.session.error || '',
    info: request.session.info || '',
    carrera: request.session.carrera || '',
    username: request.session.username || '',
    mail: request.session.mail || '',
  });
  request.session.error = '';
  request.session.info = '';
};


exports.post_reset_password = (request, response, next) => {
  console.log(request.body.matriculaInput);
  let rolIVD = "";
  let userType = "";

  getUserById(request.body.matriculaInput)
    .then((usuarioAPI) => {
      console.log(usuarioAPI.data);
      rolIVD = usuarioAPI.data.role.name;
      if (rolIVD == "admin") {
        userType = "Users::Administrator";
      } else if (rolIVD == "student") {
        userType = "Users::Student";
      }
      Usuario.getAtributos(userType, request.body.matriculaInput)
        .then((arreglo) => {
          console.log(arreglo);
          const usuario = new Usuario(
            request.body.matriculaInput,
            arreglo[1],
            request.body.passwordInput,
            arreglo[2],
            arreglo[0],
            arreglo[3],
            arreglo[6],
            arreglo[4],
            arreglo[5],
          );
          usuario
            .save()
            .then(() => {
              request.session.info = `Tu usuario se ha creado`;
              response.redirect("/users/login");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      response.send("¡Oops! Parece que los datos son incorrectos");
      console.log(error);
    });
};

exports.get_login = (request, response, next) => {
  response.render("login.ejs", {
    isLoggedIn: request.session.isLoggedIn || false,
    matricula: request.session.matricula || "",
    isNew: false,
    isReset: false,
    csrfToken: request.csrfToken(),
    privilegios: request.session.privilegios || [],
    carrera: request.session.carrera || "",
    username: request.session.username || "",
    mail: request.session.mail || "",
    error: request.session.error || '',
    info: request.session.info || ''
  });
  request.session.error = '';
  request.session.info = '';
};

exports.post_login = (request, response, next) => {
  Usuario.fetchOne(request.body.matriculaInput)
    .then((usuario) => {
      if (usuario.rowCount > 0) {
        const bcrypt = require("bcryptjs");
        bcrypt
          .compare(request.body.passwordInput, usuario.rows[0].password)
          .then((doMatch) => {
            if (doMatch) {
              Usuario.getPrivilegios(usuario.rows[0].id_ivd)
                .then((privilegios) => {
                  request.session.privilegios = privilegios.rows;
                  request.session.isLoggedIn = true;
                  request.session.matricula = request.body.matriculaInput;
                  request.session.user_id = usuario.rows[0].id_ivd;
                  request.session.carrera = usuario.rows[0].carrera;
                  request.session.username = usuario.rows[0].nombre_usuario;
                  request.session.mail = usuario.rows[0].correo_institucional;
                  request.session.rol = usuario.rows[0].rol;

                  return request.session.save((error) => {
                    if (usuario.rows[0].rol == "admin") {
                      CicloEscolar.fetchAll()
                        .then((ciclos) => {
                          request.session.ciclosEscolares = ciclos.rows;
                          request.session.cicloActual =
                            ciclos.rows[
                              ciclos.rows.length - 1
                            ].id_ciclo_escolar;
                          response.redirect(
                            "/principal/" + ciclos.rows[0].id_ciclo_escolar
                          );
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    } else {
                      CicloEscolar.fetchAll()
                        .then((ciclos) => {
                          request.session.ciclosEscolares = ciclos.rows;
                          request.session.cicloActual =
                            ciclos.rows[
                              ciclos.rows.length - 1
                            ].id_ciclo_escolar;
                            const lengthRows = ciclos.rows.length - 1;
                            request.session.nombreCicloActual = 
                            ciclos.rows[lengthRows].ciclo_escolar;
                            console.log('nombre del ciclo:' + ciclos.rows[lengthRows].ciclo_escolar);
                          response.redirect("/enlista/alumno/");
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }
                  });
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              request.session.error = `Usuario y/o contraseña incorrectos`;
              console.log(request.session.warning);
              response.redirect("/users/login");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        request.session.error = `Usuario y/o contraseña incorrectos`;
        response.redirect("/users/login");
      }
    })
    .catch((error) => {
      console.log(error);
      console.log("Error fetching user");
    });
};

exports.get_logout = (request, response, next) => {
  request.session.destroy(() => {
    response.redirect("/users/login");
  });
};
