import { UserType } from 'src/Domain/types/UserType';
import { VehicleType } from 'src/Domain/types/VehicleType';
import { VehiclesFleetType } from '../../Domain/types/VehiclesFleetType';
import { connectToDatabase } from '../../Infra/Database/Connect';
import { Logger } from '../../Infra/Logger';

export async function addVehicleToFleetQuery(
  fleetId: VehiclesFleetType['fleetId'],
  vehicleId: VehiclesFleetType['vehicleId'],
): Promise<void> {
  Logger.info('addVehicleToFleetQuery');
  const db = await connectToDatabase();

  const existingEntry = await isVehicleInFleetQuery(fleetId, vehicleId);
  if (existingEntry) {
    throw new Error('Vehicle is already in the fleet');
  }

  await db.run('INSERT INTO vehicles_fleet (fleetId, vehicleId) VALUES (?, ?)', fleetId, vehicleId);
}

export async function getVehicleByVehicleIdAndFleetIdQuery(
  fleetId: VehiclesFleetType['fleetId'],
  vehicleId: VehiclesFleetType['vehicleId'],
): Promise<VehicleType> {
  Logger.info('getVehicleByVehicleIdAndFleetIdQuery');
  const db = await connectToDatabase();
  const vehicle = await db.get(
    'SELECT * FROM vehicles_fleet JOIN vehicles ON vehicles_fleet.vehicleId = vehicles.vehicleId WHERE fleetId = ? AND vehicles_fleet.vehicleId = ?',
    fleetId,
    vehicleId,
  );
  return vehicle;
}

export async function isVehicleRegisteredInFleetQuery(
  fleetId: VehiclesFleetType['fleetId'],
  vehicleId: VehicleType['vehicleId'],
): Promise<boolean> {
  Logger.info('isVehicleRegisteredQuery');
  const db = await connectToDatabase();
  const vehicle = await db.get('SELECT * FROM vehicles_fleet WHERE vehicleId = ? AND fleetId = ?', vehicleId, fleetId);
  return vehicle !== undefined;
}

export async function getAllVehicleFleetsQuery(): Promise<VehiclesFleetType[]> {
  const db = await connectToDatabase();
  const vehicleFleets = await db.all('SELECT * FROM vehicles_fleet');
  return vehicleFleets;
}

export async function deleteAllVehicleFleetsQuery(): Promise<void> {
  const db = await connectToDatabase();
  await db.run('DELETE FROM vehicles_fleet');
}

async function isVehicleInFleetQuery(fleetId: VehiclesFleetType['fleetId'], vehicleId: VehiclesFleetType['vehicleId']): Promise<boolean> {
  const db = await connectToDatabase();
  const existingEntry = await db.get('SELECT 1 FROM vehicles_fleet WHERE fleetId = ? AND vehicleId = ?', fleetId, vehicleId);
  return existingEntry !== undefined;
}
