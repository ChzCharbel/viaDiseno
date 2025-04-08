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
app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken ? req.csrfToken() : "";
  next();
});

const usersRoutes = require("./routes/users.routes");
app.use("/users", usersRoutes);

app.get("/v1/users/find_one/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching user");
  }
});

app.get(
  "/v1/school_cycles/user_groups_index/:cycle_id/:user_ivd_id",
  async (req, res) => {
    try {
      const userGroups = await getUserGroups(
        req.params.cycle_id,
        req.params.user_ivd_id
      );
      res.send(userGroups);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching user");
    }
  }
);

app.get("/v1/students/academic_history/:ivd_id", async (req, res) => {
  try {
    const userGroups = await getAcademicHistory(req.params.ivd_id);
    res.send(userGroups);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching user");
  }
});

const enlistaRoutes = require("./routes/enlista.routes");
app.use("/enlista", enlistaRoutes);

const alumnosRoutes = require("./routes/alumnos.routes");
app.use("/alumnos", alumnosRoutes);

const inicioRoutes = require("./routes/inicio.routes");
app.use("/inicio", inicioRoutes);

const maestrosRoutes = require("./routes/maestros.routes");
app.use("/maestros", maestrosRoutes);

const materiasRoutes = require("./routes/materias.routes");
app.use("/materias", materiasRoutes);

const planesRoutes = require("./routes/planes.routes");
app.use("/planes", planesRoutes);

const ofertaRoutes = require("./routes/oferta.routes");
app.use("/oferta_academica", ofertaRoutes);

const disponibilidadRoutes = require("./routes/maestros.routes");
app.use(express.json());
app.use(disponibilidadRoutes);

app.listen(3000);
