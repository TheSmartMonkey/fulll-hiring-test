import { getVehicleByVehicleIdAndFleetIdQuery, isVehicleRegisteredInFleetQuery } from 'src/App/Queries/VehicleFleetQuery';
import { VehiclesFleetType } from 'src/Domain/types/VehiclesFleetType';
import { parkVehicleInFleetQuery, registerVehicleQuery } from '../../../App/Queries/VehicleQuery';
import { Logger } from '../../../Infra/Logger';
import { LocationType } from '../../types/LocationType';
import { VehicleType } from '../../types/VehicleType';

export async function registerVehicleInFleet(fleetId: VehiclesFleetType['fleetId'], vehicle: VehicleType): Promise<boolean> {
  Logger.info('registerVehicleInFleet');
  const vehicleInFleet = await isVehicleRegisteredInFleetQuery(fleetId, vehicle.vehicleId);
  if (vehicleInFleet) {
    throw new Error('Vehicle is already registered');
  }
  await registerVehicleQuery(fleetId, vehicle);
  return true;
}

export async function hasVehicleInFleet(
  fleetId: VehiclesFleetType['fleetId'],
  vehicleId: VehiclesFleetType['vehicleId'],
): Promise<boolean> {
  Logger.info('hasVehicleInFleet');
  const vehicle = await getVehicleByVehicleIdAndFleetIdQuery(fleetId, vehicleId);
  return vehicle !== undefined;
}

export async function parkVehicleInFleet(fleetId: VehiclesFleetType['fleetId'], vehicle: VehicleType): Promise<LocationType> {
  Logger.info('parkVehicleInFleet');
  const vehicleInFleet = await getVehicleByVehicleIdAndFleetIdQuery(fleetId, vehicle.vehicleId);
  if (vehicleInFleet.latitude === vehicle.latitude && vehicleInFleet.longitude === vehicle.longitude) {
    throw new Error('Vehicle is already parked at this location');
  }
  return parkVehicleInFleetQuery(vehicle);
}
