import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

const DB_FILE = './db.sqlite';
let dbSingleton: Database<sqlite3.Database, sqlite3.Statement>;

export async function connectToDatabase() {
  if (dbSingleton) {
    return dbSingleton;
  }
  dbSingleton = await open({
    filename: DB_FILE,
    driver: sqlite3.Database,
  });

  return dbSingleton;
}

export async function disconnectFromDatabase() {
  if (dbSingleton) {
    await dbSingleton.close();
  }
}