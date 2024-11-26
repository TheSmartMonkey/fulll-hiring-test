import { VehicleType } from '../../Domain/types/VehicleType';
import { VehiclesFleetType } from '../../Domain/types/VehiclesFleetType';
import { connectToDatabase } from '../../Infra/Database/Connect';
import { Logger } from '../../Infra/Logger';

export async function addVehicleToFleetQuery(fleetId: VehiclesFleetType['fleetId'], vehicle: VehicleType): Promise<void> {
  Logger.info('addVehicleToFleetQuery');
  const db = await connectToDatabase();

  const existingEntry = await isVehicleInFleetQuery(fleetId, vehicle.plateNumber);
  if (existingEntry) {
    throw new Error('Vehicle is already in the fleet');
  }

  await db.run('INSERT INTO vehicles_fleet (fleetId, plateNumber) VALUES (?, ?)', fleetId, vehicle.plateNumber);
}

export async function getVehicleByVehiclePlateNumberAndFleetIdQuery(
  fleetId: VehiclesFleetType['fleetId'],
  vehiclePlateNumber: VehicleType['plateNumber'],
): Promise<VehicleType> {
  Logger.info('getVehicleByVehiclePlateNumberAndFleetIdQuery');
  const db = await connectToDatabase();
  const vehicle = await db.get(
    'SELECT * FROM vehicles_fleet JOIN vehicles ON vehicles_fleet.plateNumber = vehicles.plateNumber WHERE fleetId = ? AND vehicles_fleet.plateNumber = ?',
    fleetId,
    vehiclePlateNumber,
  );
  if (!vehicle) {
    throw new Error('Vehicle not found');
  }
  return vehicle;
}

export async function isVehicleRegisteredInFleetQuery(
  fleetId: VehiclesFleetType['fleetId'],
  vehiclePlateNumber: VehicleType['plateNumber'],
): Promise<boolean> {
  Logger.info('isVehicleRegisteredQuery');
  const db = await connectToDatabase();
  const vehicle = await db.get('SELECT * FROM vehicles_fleet WHERE plateNumber = ? AND fleetId = ?', vehiclePlateNumber, fleetId);
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

async function isVehicleInFleetQuery(
  fleetId: VehiclesFleetType['fleetId'],
  vehiclePlateNumber: VehicleType['plateNumber'],
): Promise<boolean> {
  const db = await connectToDatabase();
  const existingEntry = await db.get('SELECT 1 FROM vehicles_fleet WHERE fleetId = ? AND plateNumber = ?', fleetId, vehiclePlateNumber);
  return existingEntry !== undefined;
}
