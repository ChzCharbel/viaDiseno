/**
 *  Script de inicializacion de base de datos
 */
const fs = require('fs');
const path = require('path');
const pool = require('./database');

// Archivos SQL para crear tablas e insertar datos
const TABLES_SQL_FILE = 'crearTablas.sql';
const INSERTS_SQL_FILE = 'inserts.sql';
const UPDATE_SQL_FILE = 'update1.sql';

/**
 * Ejecuta un script SQL desde un archivo
 * Devuelve una promesa cuando la ejecucion sql es correcta.
 */
const executeSQL = async (fileName) => {
  try {
    const filePath = path.join(__dirname, '..', 'sql', fileName);
    const sqlScript = fs.readFileSync(filePath, 'utf8');
    
    console.log(`Executing SQL script: ${fileName}`);
    await pool.query(sqlScript);
    console.log(`Successfully executed ${fileName}`);
    return true;
  } catch (error) {
    console.error(`Error executing SQL script ${fileName}:`, error);
    throw error;
  }
};

/**
 * Inicializa la base de datos y carga los datos iniciales
 * Regresa una promesa cuando la inicializacion es correcta.
 */
const initializeDatabase = async () => {
  try {
    console.log('Starting database initialization...');
    
    // Prueba la conexion a la base de datos
    await testConnection();
    
    // Inserta datos iniciales
    await executeSQL(UPDATE_SQL_FILE);
    
    console.log('Database initialization completed successfully.');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};

/**
 * Prueba conexion de base de datos
 * Devuelve una promesa si la conexion es correcta o lanza un error si no lo es
 */
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Database connection successful');
    client.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

/**
 * Corre una consulta SQL en la base de datos
 * Devuelve una promesa con el resultado de la consulta o lanza un error si no se puede ejecutar
 */
const runQuery = async (queryText, params = []) => {
  try {
    const result = await pool.query(queryText, params);
    return result;
  } catch (error) {
    console.error('Query execution failed:', error);
    throw error;
  }
};

module.exports = {
  initializeDatabase,
  testConnection,
  executeSQL,
  runQuery,
  pool, // Exporta el pool para que pueda ser utilizado en otros módulos
};

// Permite ejecutar el script directamente desde la línea de comandos
// (ejemplo: node util/dbInit.js)
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('Database initialization script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database initialization script failed:', error);
      process.exit(1);
    });
}
