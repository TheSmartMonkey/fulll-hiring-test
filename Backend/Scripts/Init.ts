import { connectToDatabase } from '../src/Infra/Database/Connect';

async function initializeDatabase() {
  try {
    const db = await connectToDatabase();

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        userId VARCHAR(255) PRIMARY KEY,
        fleetId VARCHAR(255) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS vehicles (
        plateNumber VARCHAR(255) PRIMARY KEY,
        latitude DOUBLE NOT NULL,
        longitude DOUBLE NOT NULL
      );

      CREATE TABLE IF NOT EXISTS vehicles_fleet (
        fleetId VARCHAR(255) NOT NULL,
        plateNumber VARCHAR(255) NOT NULL,
        PRIMARY KEY (fleetId, plateNumber)
      );
    `);

    console.log('Database and trigger initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDatabase();
