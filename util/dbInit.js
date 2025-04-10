/**
 * Database Initialization Script
 * This file handles database initialization, schema creation, and seeding initial data
 */
const fs = require('fs');
const path = require('path');
const pool = require('./database');

// SQL files for database initialization
const TABLES_SQL_FILE = 'crearTablas.sql';
const INSERTS_SQL_FILE = 'inserts.sql';

/**
 * Executes an SQL file against the database
 * @param {string} fileName - Name of the SQL file in the sql directory
 * @returns {Promise} - A promise that resolves when the SQL execution is complete
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
 * Initialize the database by creating tables and seeding initial data
 * @returns {Promise} - A promise that resolves when initialization is complete
 */
const initializeDatabase = async () => {
  try {
    console.log('Starting database initialization...');
    
    // Test database connection
    await testConnection();
      // Create tables
    await executeSQL(TABLES_SQL_FILE);
    
    // Seed initial data
    await executeSQL(INSERTS_SQL_FILE);
    
    console.log('Database initialization completed successfully.');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};

/**
 * Test the database connection
 * @returns {Promise} - A promise that resolves when connection test is successful
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
 * Runs a custom query against the database
 * @param {string} queryText - The SQL query text
 * @param {Array} params - Query parameters (for parameterized queries)
 * @returns {Promise} - A promise that resolves with the query results
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
  pool, // Export the pool for direct access if needed
};

// Allow running this file directly from command line (node util/dbInit.js)
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
