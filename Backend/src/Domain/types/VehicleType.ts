import { LocationType } from './LocationType';

export type VehicleType = LocationType & {
  plateNumber: string;
};
