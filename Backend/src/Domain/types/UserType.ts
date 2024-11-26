import { UUID } from 'crypto';

export type UserType = {
  userId: UUID;
  fleetId: UUID;
  name: string;
};
