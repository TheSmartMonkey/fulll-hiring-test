import { UUID } from 'crypto';
import { LocationType } from './LocationType';

export type VehicleType = LocationType & {
  vehicleId: UUID;
  plateNumber: string;
};
