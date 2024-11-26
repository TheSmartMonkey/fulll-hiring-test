import * as query from '../../../App/Queries/VehicleQuery';
import { fakeVehicle } from '../../../Infra/Fake';
import { generateUuid } from '../../../Infra/Helpers';
import { VehicleType } from '../../types/VehicleType';
import { hasVehicleInFleet, registerVehicleInFleet } from './VehicleEntity';

describe('Register a vehicle', () => {
  let vehicle: VehicleType;
  let spy: jest.SpyInstance;

  beforeEach(() => {
    vehicle = fakeVehicle();
    spy = jest.spyOn(query, 'registerVehicleQuery').mockImplementation(() => Promise.resolve(true));
    jest.spyOn(query, 'isVehicleRegisteredQuery').mockImplementation(() => Promise.resolve(false));
  });

  test('Should successfully register a vehicle', async () => {
    // Given
    // When
    const registeredVehicle = await registerVehicleInFleet(vehicle);

    // Then
    expect(spy).toHaveBeenCalledWith(vehicle);
    expect(registeredVehicle).toBeTruthy();
  });

  test("Shouldn't register the same vehicle twice", async () => {
    // Given
    // When
    const registeredVehicle = await registerVehicleInFleet(vehicle);
    jest.spyOn(query, 'isVehicleRegisteredQuery').mockImplementation(() => Promise.resolve(true));

    // Then
    expect(spy).toHaveBeenCalledWith(vehicle);
    expect(registeredVehicle).toBeTruthy();
    expect(registerVehicleInFleet(vehicle)).rejects.toThrow('Vehicle is already registered');
  });
});
