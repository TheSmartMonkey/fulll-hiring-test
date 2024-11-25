import { LocationType } from 'src/Domain/types/LocationType';
import { VehiclesFleetType } from 'src/Domain/types/VehiclesFleetType';
import { VehicleType } from '../../Domain/types/VehicleType';
import { connectToDatabase } from '../../Infra/Database/Connect';
import { generateUuid } from '../../Infra/Helpers';
import { Logger } from '../../Infra/Logger';
import { addVehicleToFleetQuery } from './VehiculeFleetQuery';

export async function registerVehicleQuery(
  fleetId: VehiclesFleetType['fleetId'],
  partialVehicle: Omit<VehicleType, 'vehicleId'>,
): Promise<boolean> {
  Logger.info('registerVehicleQuery');
  const vehicleWithFleetId = { ...partialVehicle, vehicleId: generateUuid() };
  const db = await connectToDatabase();
  await db.run(
    'INSERT INTO vehicles (vehicleId, plateNumber, latitude, longitude) VALUES (?, ?, ?, ?)',
    vehicleWithFleetId.vehicleId,
    vehicleWithFleetId.plateNumber,
    vehicleWithFleetId.latitude,
    vehicleWithFleetId.longitude,
  );
  await addVehicleToFleetQuery(fleetId, vehicleWithFleetId.vehicleId);

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

export async function getVehicleByVehicleIdAndFleetIdQuery(
  fleetId: VehiclesFleetType['fleetId'],
  vehicleId: VehiclesFleetType['vehicleId'],
): Promise<VehicleType> {
  Logger.info('getVehicleByVehicleIdAndFleetIdQuery');
  return {
    vehicleId,
    plateNumber: '',
    latitude: 0,
    longitude: 0,
  };
}

export async function isVehicleRegisteredQuery(
  fleetId: VehiclesFleetType['fleetId'],
  vehicleId: VehicleType['vehicleId'],
): Promise<boolean> {
  Logger.info('isVehicleRegisteredQuery');
  return true;
}

export async function parkVehicleInFleetQuery(vehicle: VehicleType): Promise<LocationType> {
  Logger.info('parkVehicleInFleetQuery');
  return {
    latitude: vehicle.latitude,
    longitude: vehicle.longitude,
  };
}
