import { fakeVehicule } from 'src/Infra/Fake';
import { generateUuid } from 'src/Infra/Helpers';
import { VehicleType } from '../../types/VehiculeType';
import { hasVehicleInFleet, registerVehicleInFleet } from './VehiculeEntity';

describe('Register a vehicle', () => {
  let vehicle: VehicleType;

  beforeEach(() => {
    vehicle = fakeVehicule();
  });

  test('Should successfully register a vehicle', async () => {
    // Given
    // When
    const registeredVehicle = await registerVehicleInFleet(vehicle);

    // Then
    expect(registeredVehicle).toBeTruthy();
  });

  test("Shouldn't register the same vehicle twice", async () => {
    // Given
    // When
    const registeredVehicle = await registerVehicleInFleet(vehicle);

    // Then
    expect(registeredVehicle).toBeTruthy();
    expect(registerVehicleInFleet(vehicle)).rejects.toThrow('Vehicle already registered');
  });

  test('Should allow same vehicle to belong to more than one fleet', async () => {
    // Given
    const vehiculeWithAnotherFleet = { ...vehicle, fleetId: generateUuid() };

    // When
    await registerVehicleInFleet(vehicle);
    await registerVehicleInFleet(vehiculeWithAnotherFleet);
    const hasVehicle = await hasVehicleInFleet(vehicle.fleetId, vehicle.vehicleId);
    const anotherHasVehicle = await hasVehicleInFleet(vehiculeWithAnotherFleet.fleetId, vehiculeWithAnotherFleet.vehicleId);

    // Then
    expect(hasVehicle).toBeTruthy();
    expect(anotherHasVehicle).toBeTruthy();
  });
});
