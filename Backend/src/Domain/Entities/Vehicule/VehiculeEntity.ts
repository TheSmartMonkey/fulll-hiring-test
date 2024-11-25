import { LocationType } from 'src/Domain/types/LocationType';
import { VehicleType } from 'src/Domain/types/VehiculeType';
import { Logger } from '../../../Infra/Logger';

export async function registerVehicleInFleet(vehicle: VehicleType): Promise<boolean> {
  Logger.info('registerVehicle');
  return true;
}

export async function hasVehicleInFleet(fleetId: VehicleType['fleetId'], vehicleId: VehicleType['vehicleId']): Promise<boolean> {
  return true;
}

export async function parkVehicleInFleet(vehicle: VehicleType): Promise<LocationType> {
  Logger.info('parkVehicle');
  return {
    latitude: vehicle.latitude,
    longitude: vehicle.longitude,
  };
}
