import { UserType } from '../Domain/types/UserType';
import { VehiclesFleetType } from '../Domain/types/VehiclesFleetType';
import { VehicleType } from '../Domain/types/VehicleType';
import { generateUuid } from './Helpers';

export function fakeVehicle(params?: Partial<VehicleType>): VehicleType {
  return {
    latitude: 20,
    longitude: 20,
    plateNumber: 'ABC-123',
    ...params,
  };
}

export function fakeVehicleFleet(params?: Partial<VehiclesFleetType>): VehiclesFleetType {
  return {
    fleetId: generateUuid(),
    plateNumber: 'ABC-123',
    ...params,
  };
}

export function fakeUser(params?: Partial<UserType>): UserType {
  return {
    userId: generateUuid(),
    fleetId: generateUuid(),
    ...params,
  };
}
