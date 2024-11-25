import { VehicleType } from '../../Domain/types/VehicleType';
import { Logger } from '../../Infra/Logger';

export async function addVehicleToFleetQuery(fleetId: VehicleType['fleetId'], vehicleId: VehicleType['vehicleId']): Promise<void> {
  Logger.info('addVehicleToFleetQuery');
}
