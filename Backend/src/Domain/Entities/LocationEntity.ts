import { getVehicleByVehiclePlateNumberAndFleetIdQuery } from '../../App/Queries/VehicleFleetQuery';
import { Logger } from '../../Infra/Logger';
import { VehicleType } from '../types/VehicleType';
import { VehiclesFleetType } from '../types/VehiclesFleetType';

export async function isVehicleInSameLocation(fleetId: VehiclesFleetType['fleetId'], vehicle: VehicleType): Promise<boolean> {
  Logger.info('isVehicleInSameLocation');
  const vehicleInFleet = await getVehicleByVehiclePlateNumberAndFleetIdQuery(fleetId, vehicle.plateNumber);
  return vehicleInFleet.latitude === vehicle.latitude && vehicleInFleet.longitude === vehicle.longitude;
}
