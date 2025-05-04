require('dotenv').config();
const express = require("express");
const app = express();

const {
  getUserById,
  getUserGroups,
  getAcademicHistory,
} = require("./util/admin.api.client");

app.set("views", "views");
app.set("view engine", "ejs");

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const session = require("express-session");
app.use(
  session({
    secret: "string secreto",
    resave: false,
    saveUninitialized: false,
  })
);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const multer = require("multer");

const csrf = require("csurf");
const csrfProtection = csrf();

app.use((req, res, next) => {
  if (req.path.startsWith("/disponible")) {
    return next();
  }
  csrfProtection(req, res, next); 
});

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken ? req.csrfToken() : "";
  next();
});

// Rutas importadas
const usersRoutes = require("./routes/users.routes");
const enlistaRoutes = require("./routes/enlista.routes");
const alumnosRoutes = require("./routes/alumnos.routes");
const principalRoutes = require("./routes/principal.routes");

const inicioRoutes = require("./routes/inicio.routes");
const maestrosRoutes = require("./routes/maestros.routes");
const materiasRoutes = require("./routes/materias.routes");
//const planesRoutes = require("./routes/planes.routes");
const ofertaRoutes = require("./routes/oferta.routes");
const solicitudesRoutes = require("./routes/solicitudes.routes");
const disponibleRoutes = require("./routes/disponible.routes");
const cicloRoutes = require('./routes/ciclo.routes');
const creacionGruposRoutes = require('./routes/creacion.grupos.routes')

const gruposRoutes = require("./routes/grupos.routes");
const horarioRoutes = require("./routes/horario.routes");
app.use("/grupos", creacionGruposRoutes);
app.use("/grupos", gruposRoutes);
app.use("/horario", horarioRoutes);



app.use("/users", usersRoutes);
app.use("/enlista", enlistaRoutes);
app.use("/alumnos", alumnosRoutes);
app.use(principalRoutes);
app.use("/inicio", inicioRoutes);
app.use("/maestros", maestrosRoutes);
app.use("/materias", materiasRoutes);
//app.use("/planes", planesRoutes);
app.use("/oferta_academica", ofertaRoutes);
app.use("/solicitudes", solicitudesRoutes);
app.use("/disponible", disponibleRoutes);
app.use('/ciclo', cicloRoutes);


app.get("/v1/users/find_one/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching user");
  }
});

app.get("/v1/school_cycles/user_groups_index/:cycle_id/:user_ivd_id", async (req, res) => {
  try {
    const userGroups = await getUserGroups(req.params.cycle_id, req.params.user_ivd_id);
    res.send(userGroups);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching user");
  }
});

app.get("/v1/students/academic_history/:ivd_id", async (req, res) => {
  try {
    const userGroups = await getAcademicHistory(req.params.ivd_id);
    res.send(userGroups);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching user");
  }
});

app.get("/", (req, res) => {
  res.redirect("/users/login");
});


app.use((req, res, next) => {
  res.status(404).render('error', { 
    pageTitle: 'Page Not Found', 
    path: '/404',
    isAuthenticated: req.session.isLoggedIn,
    user: req.session.user || null
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});