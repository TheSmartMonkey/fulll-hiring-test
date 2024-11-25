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

  test('Should allow same vehicle to belong to more than one fleet', async () => {
    // Given
    const vehicleWithAnotherFleet = { ...vehicle, fleetId: generateUuid() };

    // When
    await registerVehicleInFleet(vehicle);
    await registerVehicleInFleet(vehicleWithAnotherFleet);
    const hasVehicle = await hasVehicleInFleet(vehicle.fleetId, vehicle.vehicleId);
    const anotherHasVehicle = await hasVehicleInFleet(vehicleWithAnotherFleet.fleetId, vehicleWithAnotherFleet.vehicleId);

    // Then
    expect(spy).toHaveBeenCalledWith(vehicle);
    expect(spy).toHaveBeenCalledWith(vehicleWithAnotherFleet);
    expect(hasVehicle).toBeTruthy();
    expect(anotherHasVehicle).toBeTruthy();
  });
});
