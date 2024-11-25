import { LocationType } from '../../Domain/types/LocationType';
import { VehicleType } from '../../Domain/types/VehicleType';
import { generateUuid } from '../../Infra/Helpers';
import { Logger } from '../../Infra/Logger';
import { addVehicleToFleetQuery } from './VehiculeFleetQuery';

export async function registerVehicleQuery(partialVehicle: Omit<VehicleType, 'vehicleId' | 'fleetId'>): Promise<boolean> {
  Logger.info('registerVehicleQuery');
  const vehicleWithFleetId = { ...partialVehicle, vehicleId: generateUuid(), fleetId: generateUuid() };
  await addVehicleToFleetQuery(vehicleWithFleetId.fleetId, vehicleWithFleetId.vehicleId);
  return true;
}

export async function getVehicleByVehicleIdAndFleetIdQuery(
  fleetId: VehicleType['fleetId'],
  vehicleId: VehicleType['vehicleId'],
): Promise<VehicleType> {
  Logger.info('getVehicleByVehicleIdAndFleetIdQuery');
  return {
    vehicleId,
    fleetId,
    plateNumber: '',
    latitude: 0,
    longitude: 0,
  };
}

export async function isVehicleRegisteredQuery(fleetId: VehicleType['fleetId'], vehicleId: VehicleType['vehicleId']): Promise<boolean> {
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
