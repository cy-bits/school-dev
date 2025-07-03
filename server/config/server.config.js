/**
 * Server Configuration
 * 
 * This file contains all server-side configuration settings.
 * Modify these values to change server behavior.
 */

export const SERVER_CONFIG = {
  // Server settings
  server: {
    port: process.env.PORT || 3001,
    host: process.env.HOST || 'localhost',
    env: process.env.NODE_ENV || 'development'
  },

  // CORS settings
  cors: {
    origin: [
      'http://localhost:5173', // Vite dev server
      'http://localhost:3000', // Alternative React dev port
      'http://localhost:4173'  // Vite preview port
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  },

  // Database settings (for future database integration)
  database: {
    type: 'json', // Currently using JSON file storage
    path: './data/students.json',
    backupPath: './data/backup/',
    autoBackup: true,
    backupInterval: 3600000 // 1 hour in milliseconds
  },

  // API settings
  api: {
    prefix: '/api',
    version: 'v1',
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    }
  },

  // Logging configuration
  logging: {
    level: 'info', // 'error', 'warn', 'info', 'debug'
    enableConsole: true,
    enableFile: false,
    logFile: './logs/server.log'
  }
};

export default SERVER_CONFIG;