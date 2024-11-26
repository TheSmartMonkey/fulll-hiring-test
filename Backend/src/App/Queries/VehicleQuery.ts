import { LocationType } from 'src/Domain/types/LocationType';
import { VehiclesFleetType } from 'src/Domain/types/VehiclesFleetType';
import { VehicleType } from '../../Domain/types/VehicleType';
import { connectToDatabase } from '../../Infra/Database/Connect';
import { Logger } from '../../Infra/Logger';
import { addVehicleToFleetQuery } from './VehicleFleetQuery';

export async function registerVehicleQuery(fleetId: VehiclesFleetType['fleetId'], partialVehicle: VehicleType): Promise<boolean> {
  Logger.info('registerVehicleQuery');
  const db = await connectToDatabase();
  await db.run(
    'INSERT INTO vehicles (vehicleId, plateNumber, latitude, longitude) VALUES (?, ?, ?, ?)',
    partialVehicle.vehicleId,
    partialVehicle.plateNumber,
    partialVehicle.latitude,
    partialVehicle.longitude,
  );
  await addVehicleToFleetQuery(fleetId, partialVehicle.vehicleId);

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
    'UPDATE vehicles SET latitude = ?, longitude = ? WHERE vehicleId = ?',
    vehicle.latitude,
    vehicle.longitude,
    vehicle.vehicleId,
  );
  return {
    latitude: vehicle.latitude,
    longitude: vehicle.longitude,
  };
}
