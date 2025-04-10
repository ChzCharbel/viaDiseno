const Pool = require("pg-pool");

// Revisa si estamos en produccion o desarrollo
const isProduction = process.env.NODE_ENV === 'production';

let poolConfig;

// Configura la conexion a la base de datos dependiendo del entorno
if (isProduction) {
  // Heroku usa DATABASE_URL para la configuracion de la base de datos
  if (process.env.DATABASE_URL) {
    // Parsea la URL de la base de datos para obtener los detalles de la conexión
    const url = new URL(process.env.DATABASE_URL);
    poolConfig = {
      user: url.username,
      password: url.password,
      host: url.hostname,
      port: url.port,
      database: url.pathname.split('/')[1],
      ssl: { rejectUnauthorized: false }
    };
    console.log('Usando configuracion de base de datos de Heroku');
  } else {
    // Usa variables de entorno para la configuracion de la base de datos
    // en caso de que no se use Heroku
    poolConfig = {
      host: process.env.POSTGRESQL_HOST,
      user: process.env.POSTGRESQL_USER,
      database: process.env.POSTGRESQL_DB,
      port: process.env.POSTGRESQL_PORT,
      password: process.env.POSTGRESQL_PASSWORD,
      ssl: { rejectUnauthorized: false }
    };
    console.log('Usando configuracion de base de datos local');
  }
} else {
  // Configuracion de desarrollo
  poolConfig = {
    host: process.env.DEV_POSTRESQL_HOST || process.env.POSTRESQL_HOST || 'localhost',
    user: process.env.DEV_POSTGRESQL_USER || process.env.POSTGRESQL_USER || 'postgres',
    database: process.env.DEV_POSTGRESQL_DB || process.env.POSTGRESQL_DB || 'prueba',
    port: process.env.DEV_POSTGRESQL_PORT || process.env.POSTGRESQL_PORT || 5432,
    password: process.env.DEV_POSTGRESQL_PASSWORD || process.env.POSTGRESQL_PASSWORD || '1234',
    ssl: process.env.DEV_POSTGRESQL_SSL === 'true' ? { rejectUnauthorized: false } : undefined
  };
  console.log('Usando configuracion de base de datos de desarrollo');
}

// Crea la conexion a la base de datos
// usando la configuracion definida arriba
const pool = new Pool(poolConfig);

module.exports = pool;
