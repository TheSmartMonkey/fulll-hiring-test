import { VehiclesFleetType } from 'src/Domain/types/VehiclesFleetType';
import { Logger } from '../../Infra/Logger';

export async function addVehicleToFleetQuery(
  fleetId: VehiclesFleetType['fleetId'],
  vehicleId: VehiclesFleetType['vehicleId'],
): Promise<void> {
  Logger.info('addVehicleToFleetQuery');
}
