/**
 * @group unit
 */
import { UUID } from 'crypto';
import * as queryVehicleFleet from '../../../App/Queries/VehicleFleetQuery';
import * as queryVehicle from '../../../App/Queries/VehicleQuery';
import { fakeVehicle } from '../../../Infra/Fake';
import { generateUuid } from '../../../Infra/Helpers';
import { VehicleType } from '../../types/VehicleType';
import { registerVehicleInFleet } from './VehicleEntity';

describe('Register a vehicle', () => {
  let vehicle: VehicleType;
  let fleetId: UUID;
  let spyVehicleFleet: jest.SpyInstance;
  let spyVehicle: jest.SpyInstance;

  beforeEach(() => {
    vehicle = fakeVehicle();
    fleetId = generateUuid();
    spyVehicle = jest.spyOn(queryVehicle, 'registerVehicleQuery').mockImplementation(() => Promise.resolve(true));
    spyVehicleFleet = jest.spyOn(queryVehicleFleet, 'isVehicleRegisteredInFleetQuery').mockImplementation(() => Promise.resolve(false));
  });

  test('Should successfully register a vehicle', async () => {
    // Given
    // When
    const registeredVehicle = await registerVehicleInFleet(fleetId, vehicle);

    // Then
    expect(spyVehicle).toHaveBeenCalledWith(fleetId, vehicle);
    expect(spyVehicleFleet).toHaveBeenCalledWith(fleetId, vehicle.plateNumber);
    expect(registeredVehicle).toBeTruthy();
  });

  test("Shouldn't register the same vehicle twice", async () => {
    // Given
    // When
    const registeredVehicle = await registerVehicleInFleet(fleetId, vehicle);
    spyVehicleFleet.mockImplementation(() => Promise.resolve(true));

    // Then
    expect(spyVehicle).toHaveBeenCalledWith(fleetId, vehicle);
    expect(spyVehicleFleet).toHaveBeenCalledWith(fleetId, vehicle.plateNumber);
    expect(registeredVehicle).toBeTruthy();
    await expect(registerVehicleInFleet(fleetId, vehicle)).rejects.toThrow('Vehicle is already registered');
  });
});
