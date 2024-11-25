import * as query from '../../../App/Queries/VehicleQuery';
import { fakeVehicle } from '../../../Infra/Fake';
import { LocationType } from '../../types/LocationType';
import { VehicleType } from '../../types/VehicleType';
import { parkVehicleInFleet } from './VehicleEntity';

describe('Park a vehicle', () => {
  let vehicle: VehicleType;
  let location: LocationType;
  let spy: jest.SpyInstance;

  beforeEach(() => {
    location = { latitude: 20, longitude: 20 };
    vehicle = fakeVehicle({ latitude: location.latitude, longitude: location.longitude });
    spy = jest.spyOn(query, 'parkVehicleInFleetQuery').mockImplementation(() => Promise.resolve(location));
  });

  test('Should successfully park a vehicle', async () => {
    // Given
    // When
    const parkedVehicleLocation = await parkVehicleInFleet(vehicle);

    // Then
    expect(spy).toHaveBeenCalledWith(vehicle);
    expect(parkedVehicleLocation).toEqual(location);
  });

  test("Shouldn't park my vehicle to the same location two times in a row", async () => {
    // Given
    const vehicle2 = fakeVehicle({ latitude: location.latitude, longitude: location.longitude });

    // When
    const parkedVehicleLocation = await parkVehicleInFleet(vehicle);
    jest.spyOn(query, 'getVehicleByVehicleIdAndFleetIdQuery').mockImplementation(() => Promise.resolve(vehicle));

    // Then
    expect(spy).toHaveBeenCalledWith(vehicle);
    expect(parkedVehicleLocation).toEqual(location);
    expect(parkVehicleInFleet(vehicle2)).rejects.toThrow('Vehicle is already parked at this location');
  });
});
