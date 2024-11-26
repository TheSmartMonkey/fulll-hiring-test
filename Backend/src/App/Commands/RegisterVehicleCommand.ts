import { UUID } from 'crypto';
import { registerVehicleInFleet } from '../../Domain/Entities/Vehicle/VehicleEntity';
import { VehicleType } from '../../Domain/types/VehicleType';
import { Logger } from '../../Infra/Logger';

export async function registerVehicleCommand(fleetId: UUID, vehiclePlateNumber: string): Promise<void> {
  try {
    const vehicle: VehicleType = { plateNumber: vehiclePlateNumber, latitude: 0, longitude: 0 };
    await registerVehicleInFleet(fleetId, vehicle);
    Logger.info(`Vehicle ${vehiclePlateNumber} registered to fleet ${fleetId}`);
  } catch (error) {
    Logger.error('Internal error', error as Error);
  }
}
