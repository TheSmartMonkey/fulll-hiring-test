import { connectToDatabase } from '../src/Infra/Database/Connect';

async function initializeDatabase() {
  try {
    const db = await connectToDatabase();

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        userId VARCHAR(36) PRIMARY KEY,
        name VARCHAR(64) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS fleets (
        fleetId VARCHAR(36) PRIMARY KEY,
        userId VARCHAR(36) NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS vehicles (
        vehicleId VARCHAR(255) UNIQUE PRIMARY KEY,
        plateNumber VARCHAR(7) UNIQUE NOT NULL,
        latitude DECIMAL(10,7) NOT NULL,
        longitude DECIMAL(10,7) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS vehicles_fleet (
        fleetId VARCHAR(255) NOT NULL,
        vehicleId VARCHAR(255) NOT NULL,
        PRIMARY KEY (fleet_id, vehicle_id),
        FOREIGN KEY (vehicle_id) REFERENCES vehicle(vehicleId) ON DELETE CASCADE
      );
    `);

    console.log('Database and trigger initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDatabase();
