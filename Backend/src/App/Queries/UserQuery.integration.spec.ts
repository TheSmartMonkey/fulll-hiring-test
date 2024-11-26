/**
 * @group integration
 */
import { connectToDatabase, disconnectFromDatabase } from '../../Infra/Database/Connect';
import { fakeUser } from '../../Infra/Fake';
import { createUserQuery, deleteAllUsersQuery, doesUserFleetExistQuery, getAllUsersQuery } from './UserQuery';

describe('User Integration Tests', () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  beforeEach(async () => {
    await deleteAllUsersQuery();
  });

  afterAll(async () => {
    await disconnectFromDatabase();
  });

  it('Should create a user', async () => {
    // Given
    const user = fakeUser();

    // When
    await createUserQuery(user);
    const users = await getAllUsersQuery();

    // Then
    expect(users).toHaveLength(1);
    expect(users[0]).toEqual(user);
  });

  it('Should check if a user fleet exists', async () => {
    // Given
    const user = fakeUser();

    // When
    await createUserQuery(user);
    const userFleetExists = await doesUserFleetExistQuery(user.fleetId);

    // Then
    expect(userFleetExists).toBeTruthy();
  });

  it('Should check if a user fleet does not exist', async () => {
    // Given
    const user = fakeUser();

    // When
    const userFleetExists = await doesUserFleetExistQuery(user.fleetId);

    // Then
    expect(userFleetExists).toBeFalsy();
  });
});
