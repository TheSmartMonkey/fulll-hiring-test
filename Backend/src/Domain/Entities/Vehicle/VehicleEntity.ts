import { doesUserFleetExistQuery } from '../../../App/Queries/UserQuery';
import { isVehicleRegisteredInFleetQuery } from '../../../App/Queries/VehicleFleetQuery';
import { parkVehicleInFleetQuery, registerVehicleQuery } from '../../../App/Queries/VehicleQuery';
import { VehiclesFleetType } from '../../../Domain/types/VehiclesFleetType';
import { Logger } from '../../../Infra/Logger';
import { LocationType } from '../../types/LocationType';
import { VehicleType } from '../../types/VehicleType';
import { isVehicleInSameLocation } from '../LocationEntity';

export async function registerVehicleInFleet(fleetId: VehiclesFleetType['fleetId'], vehicle: VehicleType): Promise<boolean> {
  Logger.info('registerVehicleInFleet');
  const userFleetExists = await doesUserFleetExistQuery(fleetId);
  if (!userFleetExists) {
    throw new Error('User fleet does not exist');
  }

  const vehicleInFleet = await isVehicleRegisteredInFleetQuery(fleetId, vehicle.plateNumber);
  if (vehicleInFleet) {
    throw new Error('Vehicle is already registered');
  }
  return registerVehicleQuery(fleetId, vehicle);
}

export async function parkVehicleInFleet(fleetId: VehiclesFleetType['fleetId'], vehicle: VehicleType): Promise<LocationType> {
  Logger.info('parkVehicleInFleet');
  const vehicleInSameLocation = await isVehicleInSameLocation(fleetId, vehicle);
  if (vehicleInSameLocation) {
    throw new Error('Vehicle is already parked at this location');
  }
  return parkVehicleInFleetQuery(vehicle);
}
