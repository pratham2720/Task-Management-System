const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // File location for the DB
  logging: false, // Turn off logging queries to console
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQLite Connected.');
    // Sync models
    await sequelize.sync();
    console.log('Database Synced.');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
