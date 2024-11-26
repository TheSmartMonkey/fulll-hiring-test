/**
 * @group unit
 */
import { UUID } from 'crypto';
import * as queryUser from '../../../App/Queries/UserQuery';
import * as queryVehicleFleet from '../../../App/Queries/VehicleFleetQuery';
import * as queryVehicle from '../../../App/Queries/VehicleQuery';
import { fakeVehicle } from '../../../Infra/Fake';
import { generateUuid } from '../../../Infra/Helpers';
import { VehicleType } from '../../types/VehicleType';
import { registerVehicleInFleet } from './VehicleEntity';

describe('Register a vehicle', () => {
  let vehicle: VehicleType;
  let fleetId: UUID;
  let spyVehicle: jest.SpyInstance;
  let spyVehicleRegistered: jest.SpyInstance;
  let spyUserFleetExists: jest.SpyInstance;

  beforeEach(() => {
    vehicle = fakeVehicle();
    fleetId = generateUuid();
    spyVehicle = jest.spyOn(queryVehicle, 'registerVehicleQuery').mockImplementation(() => Promise.resolve(true));
    spyVehicleRegistered = jest
      .spyOn(queryVehicleFleet, 'isVehicleRegisteredInFleetQuery')
      .mockImplementation(() => Promise.resolve(false));
    spyUserFleetExists = jest.spyOn(queryUser, 'doesUserFleetExistQuery').mockImplementation(() => Promise.resolve(true));
  });

  test('Should successfully register a vehicle', async () => {
    // Given
    // When
    const registeredVehicle = await registerVehicleInFleet(fleetId, vehicle);

    // Then
    expect(spyVehicle).toHaveBeenCalledWith(fleetId, vehicle);
    expect(spyVehicleRegistered).toHaveBeenCalledWith(fleetId, vehicle.plateNumber);
    expect(spyUserFleetExists).toHaveBeenCalledWith(fleetId);
    expect(registeredVehicle).toBeTruthy();
  });

  test("Shouldn't register the same vehicle twice", async () => {
    // Given
    // When
    const registeredVehicle = await registerVehicleInFleet(fleetId, vehicle);
    spyVehicleRegistered.mockImplementation(() => Promise.resolve(true));

    // Then
    expect(spyVehicle).toHaveBeenCalledWith(fleetId, vehicle);
    expect(spyVehicleRegistered).toHaveBeenCalledWith(fleetId, vehicle.plateNumber);
    expect(spyUserFleetExists).toHaveBeenCalledWith(fleetId);
    expect(registeredVehicle).toBeTruthy();
    await expect(registerVehicleInFleet(fleetId, vehicle)).rejects.toThrow('Vehicle is already registered');
  });

  test("Shouldn't register a vehicle in a non-existing fleet", async () => {
    // Given
    spyUserFleetExists = jest.spyOn(queryUser, 'doesUserFleetExistQuery').mockImplementation(() => Promise.resolve(false));

    // When
    // Then
    await expect(registerVehicleInFleet(fleetId, vehicle)).rejects.toThrow('User fleet does not exist');
    expect(spyVehicle).not.toHaveBeenCalled();
    expect(spyUserFleetExists).toHaveBeenCalledWith(fleetId);
  });
});
