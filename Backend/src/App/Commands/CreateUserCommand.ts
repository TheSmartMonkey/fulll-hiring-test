import { UUID } from 'crypto';
import { createUser } from '../../Domain/Entities/UserEntity';
import { Logger } from '../../Infra/Logger';

export async function createUserCommand(userId: UUID): Promise<void> {
  try {
    const user = await createUser(userId);
    Logger.info(`fleetId: ${user.fleetId}`);
  } catch (error) {
    Logger.error('Internal error', error as Error);
  }
}
