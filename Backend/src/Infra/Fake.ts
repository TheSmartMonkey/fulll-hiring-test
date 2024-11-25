import { VehicleType } from '../Domain/types/VehicleType';
import { generateUuid } from './Helpers';

export function fakeVehicle(params?: Partial<VehicleType>): VehicleType {
  return {
    vehicleId: generateUuid(),
    latitude: 20,
    longitude: 20,
    plateNumber: 'ABC-123',
    ...params,
  };
}
