/**
 * @group integration
 */
import { VehicleType } from '../../Domain/types/VehicleType';
import { connectToDatabase, disconnectFromDatabase } from '../../Infra/Database/Connect';
import { fakeVehicle } from '../../Infra/Fake';
import { generateUuid } from '../../Infra/Helpers';
import {
  addVehicleToFleetQuery,
  deleteAllVehicleFleetsQuery,
  getAllVehicleFleetsQuery,
  getVehicleByVehiclePlateNumberAndFleetIdQuery,
  isVehicleRegisteredInFleetQuery,
} from './VehicleFleetQuery';
import { deleteAllVehiclesQuery, getAllVehiclesQuery, registerVehicleQuery } from './VehicleQuery';

describe('Vehicle Fleet Integration Tests', () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  beforeEach(async () => {
    await deleteAllVehicleFleetsQuery();
    await deleteAllVehiclesQuery();
  });

  afterAll(async () => {
    await disconnectFromDatabase();
  });

  describe('registerVehicleQuery', () => {
    it('Should register a vehicle in the fleet', async () => {
      // Given
      const fleetId = generateUuid();
      const vehicle: VehicleType = fakeVehicle();

      // When
      await registerVehicleQuery(fleetId, vehicle);
      const vehicles = await getAllVehiclesQuery();

      // Then
      expect(vehicles).toHaveLength(1);
      expect(vehicles[0]).toEqual(expect.objectContaining(vehicle));
    });

    it('Should register a vehicle in 2 fleets', async () => {
      // Given
      const fleetId = generateUuid();
      const anotherFleetId = generateUuid();
      const vehicle: VehicleType = fakeVehicle();

      // When
      await registerVehicleQuery(fleetId, vehicle);
      await registerVehicleQuery(anotherFleetId, vehicle);
      const vehicles = await getAllVehiclesQuery();
      const vehicleFleets = await getAllVehicleFleetsQuery();

      // Then
      expect(vehicles).toHaveLength(1);
      expect(vehicles[0]).toEqual(expect.objectContaining(vehicle));
      expect(vehicleFleets).toHaveLength(2);
      expect(vehicleFleets).toEqual(
        expect.arrayContaining([expect.objectContaining({ fleetId }), expect.objectContaining({ fleetId: anotherFleetId })]),
      );
    });
  });

  describe('addVehicleToFleetQuery', () => {
    it('Should add a vehicle in the fleet', async () => {
      // Given
      const fleetId = generateUuid();
      const vehicle: VehicleType = fakeVehicle();

      // When
      await addVehicleToFleetQuery(fleetId, vehicle);
      const vehicleFleets = await getAllVehicleFleetsQuery();

      // Then
      expect(vehicleFleets).toHaveLength(1);
    });

    it('Should not add a vehicle in the fleet if the vehicle is already in the fleet', async () => {
      // Given
      const fleetId = generateUuid();
      const vehicle: VehicleType = fakeVehicle();

      // When
      await addVehicleToFleetQuery(fleetId, vehicle);

      // Then
      await expect(addVehicleToFleetQuery(fleetId, vehicle)).rejects.toThrow('Vehicle is already in the fleet');
    });

    it('Should allow same vehicle to belong to more than one fleet', async () => {
      // Given
      const fleetId = generateUuid();
      const anotherFleetId = generateUuid();
      const vehicle = fakeVehicle();

      // When
      await addVehicleToFleetQuery(fleetId, vehicle);
      await addVehicleToFleetQuery(anotherFleetId, vehicle);
      const vehicleFleets = await getAllVehicleFleetsQuery();

      // Then
      expect(vehicleFleets).toHaveLength(2);
    });
  });

  it('Should get a vehicle by plateNumber and fleetId', async () => {
    // Given
    const fleetId = generateUuid();
    const vehicle = fakeVehicle();

    // When
    await registerVehicleQuery(fleetId, vehicle);
    const vehicleInFleet = await getVehicleByVehiclePlateNumberAndFleetIdQuery(fleetId, vehicle.plateNumber);

    // Then
    expect(vehicleInFleet).toEqual(expect.objectContaining({ ...vehicle, fleetId }));
  });

  it('Should not get a vehicle by plateNumber and fleetId if the vehicle is not registered in the fleet', async () => {
    // Given
    const fleetId = generateUuid();
    const vehicle = fakeVehicle();

    // When
    // Then
    await expect(getVehicleByVehiclePlateNumberAndFleetIdQuery(fleetId, vehicle.plateNumber)).rejects.toThrow('Vehicle not found');
  });

  it('Should check if a vehicle is registered in the fleet', async () => {
    // Given
    const fleetId = generateUuid();
    const vehicle = fakeVehicle();

    // When
    await registerVehicleQuery(fleetId, vehicle);
    const isRegistered = await isVehicleRegisteredInFleetQuery(fleetId, vehicle.plateNumber);

    // Then
    expect(isRegistered).toBeTruthy();
  });
});
