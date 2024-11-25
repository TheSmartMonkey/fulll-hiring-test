import { LocationType } from 'src/Domain/types/LocationType';
import { VehicleType } from 'src/Domain/types/VehiculeType';
import { fakeVehicule } from 'src/Infra/Fake';
import { parkVehicleInFleet } from './VehiculeEntity';

describe('Park a vehicle', () => {
  let vehicle: VehicleType;
  let location: LocationType;

  beforeEach(() => {
    vehicle = fakeVehicule();
    location = { latitude: 20, longitude: 20 };
  });

  test('Should successfully park a vehicle', async () => {
    // Given
    // When
    const parkedVehicleLocation = await parkVehicleInFleet(vehicle);

    // Then
    expect(parkedVehicleLocation).toEqual(location);
  });

  test("Shouldn't park a vehicle in the same location twice", async () => {
    // Given
    const vehicle2 = fakeVehicule();

    // When
    const parkedVehicleLocation = await parkVehicleInFleet(vehicle);

    // Then
    expect(parkedVehicleLocation).toEqual(location);
    expect(parkVehicleInFleet(vehicle2)).rejects.toThrow('Vehicle is already parked at this location');
  });
});
