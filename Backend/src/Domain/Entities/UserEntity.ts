import { UUID } from 'crypto';
import { createUserQuery } from '../../App/Queries/UserQuery';
import { generateUuid } from '../../Infra/Helpers';
import { UserType } from '../types/UserType';

export async function createUser(userId: UUID): Promise<UserType> {
  const user = { userId, fleetId: generateUuid() };
  return createUserQuery(user);
}
