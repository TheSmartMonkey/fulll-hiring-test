import { VehicleType } from '../../Domain/types/VehicleType';
import { connectToDatabase, disconnectFromDatabase } from '../../Infra/Database/Connect';
import { fakeVehicle } from '../../Infra/Fake';
import { generateUuid } from '../../Infra/Helpers';
import { deleteAllVehiclesQuery, getAllVehiclesQuery, registerVehicleQuery } from './VehicleQuery';

describe('Vehicle Integration Tests', () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  beforeEach(async () => {
    await deleteAllVehiclesQuery();
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
});
