import {
  getVehicleByVehicleIdAndFleetIdQuery,
  isVehicleRegisteredQuery,
  parkVehicleInFleetQuery,
  registerVehicleQuery,
} from '../../../App/Queries/VehicleQuery';
import { Logger } from '../../../Infra/Logger';
import { LocationType } from '../../types/LocationType';
import { VehicleType } from '../../types/VehicleType';

export async function registerVehicleInFleet(vehicle: VehicleType): Promise<boolean> {
  Logger.info('registerVehicleInFleet');
  const vehicleInFleet = await isVehicleRegisteredQuery(vehicle.fleetId, vehicle.vehicleId);
  if (vehicleInFleet) {
    throw new Error('Vehicle is already registered');
  }
  await registerVehicleQuery(vehicle);
  return true;
}

export async function hasVehicleInFleet(fleetId: VehicleType['fleetId'], vehicleId: VehicleType['vehicleId']): Promise<boolean> {
  Logger.info('hasVehicleInFleet');
  const vehicle = await getVehicleByVehicleIdAndFleetIdQuery(fleetId, vehicleId);
  return vehicle !== undefined;
}

export async function parkVehicleInFleet(vehicle: VehicleType): Promise<LocationType> {
  Logger.info('parkVehicleInFleet');
  const vehicleInFleet = await getVehicleByVehicleIdAndFleetIdQuery(vehicle.fleetId, vehicle.vehicleId);
  if (vehicleInFleet.latitude === vehicle.latitude && vehicleInFleet.longitude === vehicle.longitude) {
    throw new Error('Vehicle is already parked at this location');
  }
  return parkVehicleInFleetQuery(vehicle);
}
