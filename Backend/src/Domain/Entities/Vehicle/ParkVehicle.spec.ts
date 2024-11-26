/**
 * @group unit
 */
import { UUID } from 'crypto';
import * as queryVehicle from '../../../App/Queries/VehicleQuery';
import { fakeVehicle } from '../../../Infra/Fake';
import { generateUuid } from '../../../Infra/Helpers';
import { LocationType } from '../../types/LocationType';
import { VehicleType } from '../../types/VehicleType';
import * as locationEntity from '../LocationEntity';
import { parkVehicleInFleet } from './VehicleEntity';

describe('Park a vehicle', () => {
  let vehicle: VehicleType;
  let location: LocationType;
  let fleetId: UUID;
  let spyVehicle: jest.SpyInstance;
  let spySameLocation: jest.SpyInstance;

  beforeEach(() => {
    location = { latitude: 20, longitude: 20 };
    fleetId = generateUuid();
    vehicle = fakeVehicle({ latitude: location.latitude, longitude: location.longitude });
    spyVehicle = jest.spyOn(queryVehicle, 'parkVehicleInFleetQuery').mockImplementation(() => Promise.resolve(location));
    spySameLocation = jest.spyOn(locationEntity, 'isVehicleInSameLocation').mockImplementation(() => Promise.resolve(false));
  });

  test('Should successfully park a vehicle', async () => {
    // Given
    // When
    const parkedVehicleLocation = await parkVehicleInFleet(fleetId, vehicle);

    // Then
    expect(spyVehicle).toHaveBeenCalledWith(vehicle);
    expect(spySameLocation).toHaveBeenCalledWith(fleetId, vehicle);
    expect(parkedVehicleLocation).toEqual(location);
  });

  test("Shouldn't park my vehicle to the same location two times in a row", async () => {
    // Given
    const vehicle2 = fakeVehicle({ latitude: location.latitude, longitude: location.longitude });

    // When
    const parkedVehicleLocation = await parkVehicleInFleet(fleetId, vehicle);
    jest.spyOn(locationEntity, 'isVehicleInSameLocation').mockImplementation(() => Promise.resolve(true));

    // Then
    expect(spyVehicle).toHaveBeenCalledWith(vehicle);
    expect(parkedVehicleLocation).toEqual(location);
    await expect(parkVehicleInFleet(fleetId, vehicle2)).rejects.toThrow('Vehicle is already parked at this location');
  });
});
