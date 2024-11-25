import { randomUUID, UUID } from 'crypto';

export function generateUuid(): UUID {
  return randomUUID();
}
