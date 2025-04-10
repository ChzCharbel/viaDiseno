const Pool = require("pg-pool");

// Determine if we're in production mode (like on Heroku)
const isProduction = process.env.NODE_ENV === 'production';

let poolConfig;

// Configure database connection based on environment
if (isProduction) {
  // Production environment (Heroku) uses DATABASE_URL
  if (process.env.DATABASE_URL) {
    // Parse the DATABASE_URL to get connection parameters
    const url = new URL(process.env.DATABASE_URL);
    poolConfig = {
      user: url.username,
      password: url.password,
      host: url.hostname,
      port: url.port,
      database: url.pathname.split('/')[1],
      ssl: { rejectUnauthorized: false } // Required for Heroku PostgreSQL
    };
    console.log('Using production database configuration with DATABASE_URL');
  } else {
    // Fallback to environment variables if DATABASE_URL is not available
    poolConfig = {
      host: process.env.POSTRESQL_HOST,
      user: process.env.POSTGRESQL_USER,
      database: process.env.POSTGRESQL_DB,
      port: process.env.POSTGRESQL_PORT,
      password: process.env.POSTGRESQL_PASSWORD,
      ssl: { rejectUnauthorized: false } // SSL for production
    };
    console.log('Using production database configuration with environment variables');
  }
} else {
  // Development environment configuration
  poolConfig = {
    host: process.env.DEV_POSTRESQL_HOST || process.env.POSTRESQL_HOST || 'localhost',
    user: process.env.DEV_POSTGRESQL_USER || process.env.POSTGRESQL_USER || 'postgres',
    database: process.env.DEV_POSTGRESQL_DB || process.env.POSTGRESQL_DB || 'postgres',
    port: process.env.DEV_POSTGRESQL_PORT || process.env.POSTGRESQL_PORT || 5432,
    password: process.env.DEV_POSTGRESQL_PASSWORD || process.env.POSTGRESQL_PASSWORD || '',
    // In development, SSL is optional based on configuration
    ssl: process.env.DEV_POSTGRESQL_SSL === 'true' ? { rejectUnauthorized: false } : undefined
  };
  console.log('Using development database configuration');
}

// Create the connection pool with the appropriate configuration
const pool = new Pool(poolConfig);

module.exports = pool;
