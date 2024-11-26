import { VehicleType } from '../../Domain/types/VehicleType';
import { connectToDatabase, disconnectFromDatabase } from '../../Infra/Database/Connect';
import { fakeVehicle } from '../../Infra/Fake';
import { generateUuid } from '../../Infra/Helpers';
import { deleteAllVehicleFleetsQuery } from './VehicleFleetQuery';
import { deleteAllVehiclesQuery, getAllVehiclesQuery, parkVehicleInFleetQuery, registerVehicleQuery } from './VehicleQuery';

describe('Vehicle Integration Tests', () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  beforeEach(async () => {
    await deleteAllVehiclesQuery();
    await deleteAllVehicleFleetsQuery();
  });

  afterAll(async () => {
    await disconnectFromDatabase();
  });

  it('should register a vehicle in the fleet', async () => {
    // Given
    const fleetId = generateUuid();
    const vehicle: VehicleType = fakeVehicle();

    // When
    await registerVehicleQuery(fleetId, vehicle);
    const vehicles = await getAllVehiclesQuery();

    // Then
    expect(vehicles).toHaveLength(1);
  });

  it('should park a vehicle in the fleet', async () => {
    // Given
    const fleetId = generateUuid();
    const vehicle: VehicleType = fakeVehicle();

    // When
    await registerVehicleQuery(fleetId, vehicle);
    const parkedVehicle = await parkVehicleInFleetQuery(vehicle);
    const vehicles = await getAllVehiclesQuery();

    // Then
    expect(vehicles[0].latitude).toEqual(parkedVehicle.latitude);
    expect(vehicles[0].longitude).toEqual(parkedVehicle.longitude);
  });
});
