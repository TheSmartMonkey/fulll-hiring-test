import { Logger } from '../../Infra/Logger';
import { getAllUsersQuery } from '../Queries/UserQuery';
import { getAllVehicleFleetsQuery } from '../Queries/VehicleFleetQuery';
import { getAllVehiclesQuery } from '../Queries/VehicleQuery';

export async function scanDatabaseCommand(): Promise<void> {
  try {
    const users = await getAllUsersQuery();
    const vehicles = await getAllVehiclesQuery();
    const vehiclesFleet = await getAllVehicleFleetsQuery();
    Logger.info(`Users: ${JSON.stringify(users)}`);
    Logger.info(`Vehicles: ${JSON.stringify(vehicles)}`);
    Logger.info(`Vehicles fleet: ${JSON.stringify(vehiclesFleet)}`);
  } catch (error) {
    Logger.error('Internal error', error as Error);
  }
}
