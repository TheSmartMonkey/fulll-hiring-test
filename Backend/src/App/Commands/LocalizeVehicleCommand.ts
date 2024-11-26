import { UUID } from 'crypto';
import { parkVehicleInFleet } from '../../Domain/Entities/Vehicle/VehicleEntity';
import { VehicleType } from '../../Domain/types/VehicleType';
import { Logger } from '../../Infra/Logger';

export async function localizeVehicleCommand(fleetId: UUID, vehiclePlateNumber: string, lat: string, lng: string): Promise<void> {
  try {
    const vehicle: VehicleType = { plateNumber: vehiclePlateNumber, latitude: parseFloat(lat), longitude: parseFloat(lng) };
    await parkVehicleInFleet(fleetId, vehicle);
    Logger.info(`Vehicle ${vehiclePlateNumber} parked in fleet ${fleetId}`);
  } catch (error) {
    Logger.error('Internal error', error as Error);
  }
}
