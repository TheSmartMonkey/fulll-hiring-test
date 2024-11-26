import { UserType } from '../Domain/types/UserType';
import { VehiclesFleetType } from '../Domain/types/VehiclesFleetType';
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

export function fakeVehicleFleet(params?: Partial<VehiclesFleetType>): VehiclesFleetType {
  return {
    fleetId: generateUuid(),
    vehicleId: generateUuid(),
    ...params,
  };
}

export function fakeUser(params?: Partial<UserType>): UserType {
  return {
    userId: generateUuid(),
    fleetId: generateUuid(),
    name: 'John Doe',
    ...params,
  };
}
