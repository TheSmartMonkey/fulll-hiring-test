import { LocationType } from '../../Domain/types/LocationType';
import { VehiclesFleetType } from '../../Domain/types/VehiclesFleetType';
import { VehicleType } from '../../Domain/types/VehicleType';
import { connectToDatabase } from '../../Infra/Database/Connect';
import { Logger } from '../../Infra/Logger';
import { addVehicleToFleetQuery } from './VehicleFleetQuery';

export async function registerVehicleQuery(fleetId: VehiclesFleetType['fleetId'], vehicle: VehicleType): Promise<boolean> {
  Logger.info('registerVehicleQuery');
  const db = await connectToDatabase();
  await db.run(
    'INSERT INTO vehicles (plateNumber, latitude, longitude) VALUES (?, ?, ?)',
    vehicle.plateNumber,
    vehicle.latitude,
    vehicle.longitude,
  );
  await addVehicleToFleetQuery(fleetId, vehicle);

  return true;
}

export async function deleteAllVehiclesQuery(): Promise<void> {
  const db = await connectToDatabase();
  await db.run('DELETE FROM vehicles');
}

export async function getAllVehiclesQuery(): Promise<VehicleType[]> {
  const db = await connectToDatabase();
  const vehicles = await db.all('SELECT * FROM vehicles');
  return vehicles;
}

export async function parkVehicleInFleetQuery(vehicle: VehicleType): Promise<LocationType> {
  Logger.info('parkVehicleInFleetQuery');
  const db = await connectToDatabase();
  await db.run(
    'UPDATE vehicles SET latitude = ?, longitude = ? WHERE plateNumber = ?',
    vehicle.latitude,
    vehicle.longitude,
    vehicle.plateNumber,
  );
  return {
    latitude: vehicle.latitude,
    longitude: vehicle.longitude,
  };
}
