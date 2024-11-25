import { VehicleType } from '../Domain/types/VehiculeType';
import { generateUuid } from './Helpers';

export function fakeVehicule(params?: Partial<VehicleType>): VehicleType {
  return {
    fleetId: generateUuid(),
    vehicleId: generateUuid(),
    latitude: 20,
    longitude: 20,
    plateNumber: 'ABC-123',
    ...params,
  };
}
