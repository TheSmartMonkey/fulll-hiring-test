import { VehiclesFleetType } from 'src/Domain/types/VehiclesFleetType';
import { UserType } from '../../Domain/types/UserType';
import { connectToDatabase } from '../../Infra/Database/Connect';

export async function getAllUsersQuery(): Promise<UserType[]> {
  const db = await connectToDatabase();
  const users = await db.all('SELECT * FROM users');
  return users;
}

export async function createUserQuery(user: UserType): Promise<UserType> {
  const db = await connectToDatabase();
  await db.run('INSERT INTO users (userId, fleetId) VALUES (?, ?)', user.userId, user.fleetId);
  return user;
}

export async function deleteAllUsersQuery(): Promise<void> {
  const db = await connectToDatabase();
  await db.run('DELETE FROM users');
}

export async function doesUserFleetExistQuery(fleetId: VehiclesFleetType['fleetId']): Promise<boolean> {
  const db = await connectToDatabase();
  const userFleet = await db.get('SELECT * FROM users WHERE fleetId = ?', fleetId);
  return userFleet !== undefined;
}
