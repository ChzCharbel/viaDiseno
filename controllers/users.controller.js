const Usuario = require('../models/users.model');
const CicloEscolar = require('../models/ciclos.model');
const {getUserById, getUserGroups, getAcademicHistory} = require('../util/admin.api.client');

exports.get_reset_password = (request, response, next) => {
    response.render('login.ejs',{
        isLoggedIn: request.session.isLoggedIn || false,
        matricula: request.session.matricula || '',
        isNew: true,
        csrfToken: request.csrfToken(),
        privilegios: request.session.privilegios || [],
    })
}

exports.post_reset_password= (request, response, next) => {
    console.log(request.body.matriculaInput);
    let rolIVD = '';
    let userType = '';
    
    getUserById(request.body.matriculaInput).then((usuarioAPI) => {
        console.log(usuarioAPI.data);
        rolIVD = usuarioAPI.data.role.name;
        if (rolIVD == 'admin') {
            userType = 'Users::Administrator';
        }
        else if (rolIVD == 'student') {
            userType = 'Users::Student';
        }
        Usuario.getAtributos(userType, request.body.matriculaInput).then((arreglo) => {
            console.log(arreglo);
            const usuario = new 
            Usuario(request.body.matriculaInput, arreglo[1], request.body.passwordInput, arreglo[2], arreglo[0], arreglo[3]);
            usuario.save().then(() => {
                request.session.info = `Tu usuario se ha creado`;
                response.redirect('/users/login');
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    }).catch((error) => {
        response.send('¡Oops! Parece que los datos son incorrectos');
        console.log(error);
    });
};

exports.get_login = (request, response, next) => {
    response.render('login.ejs',{
        isLoggedIn: request.session.isLoggedIn || false,
        matricula: request.session.matricula || '',
        isNew: false,
        csrfToken: request.csrfToken(),
        privilegios: request.session.privilegios || [],
        carrera: request.session.carrera || '',
        username: request.session.username || '',
    });
};

exports.post_login = (request, response, next) => {
    console.log(request.body.matriculaInput);
    console.log(request.body.passwordInput);
    Usuario.fetchOne(request.body.matriculaInput).then((usuario) => {
        console.log(usuario.rows);
        if(usuario.rows.length > 0) {
            const bcrypt = require('bcryptjs');
            console.log(usuario.rows[0]);
            bcrypt.compare(request.body.passwordInput, usuario.rows[0].password).then((doMatch) => {
                if (doMatch) {
                    Usuario.getPrivilegios(usuario.rows[0].idIVD).then((privilegios) => {
                        console.log(privilegios.rows);
                        request.session.privilegios = privilegios.rows;
                        request.session.isLoggedIn = true;
                        request.session.matricula = request.body.matriculaInput;
                        request.session.user_id = usuario.rows[0].idIVD;
                        request.session.carrera = usuario.rows[0].carrera;
                        request.session.username = usuario.rows[0].nombreUsuario;
                        request.session.mail = usuario.rows[0].correoInstitucional;
                        request.session.rol = usuario.rows[0].rol;
                        console.log('Carrera del usuario: ' + request.session.carrera);
                        
                        return request.session.save((error) => {
                            if (usuario.rows[0].rol == 'admin'){
                                CicloEscolar.fetchAll().then((ciclos) => {
                                    console.log(ciclos.rows);
                                    request.session.ciclosEscolares = ciclos.rows;
                                    response.redirect('/inicio/' + ciclos.rows[0].idCicloEscolar);
                                }).catch((error) => {
                                    console.log(error);
                                })
                            }
                            else {
                                CicloEscolar.fetchAll().then((ciclos) => {
                                    console.log(ciclos.rows);
                                    request.session.ciclosEscolares = ciclos.rows;
                                    request.session.cicloActual = ciclos.rows[ciclos.rows.length - 1].idCicloEscolar;
                                    response.redirect('/enlista/alumno/');
                                }).catch((error) => {
                                    console.log(error);
                                })
                                
                            }
                        });
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    request.session.warning = `Usuario y/o contraseña incorrectos`;
                    console.log(request.session.warning);
                    response.redirect('/users/login');
                }
            }).catch((error) => {
                console.log(error);
            });
        } else {
            request.session.warning = `Usuario y/o contraseña incorrectos`;
            response.redirect('/users/login');
        }
    }).catch((error) => {
        console.log(error);
        console.log('Error fetching user');
    });
};

exports.get_logout = (request, response, next) => {

    request.session.destroy(() => {
        response.redirect('/users/login');
    })
}