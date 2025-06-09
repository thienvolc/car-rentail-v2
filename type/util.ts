import { Car, CarCertificate, CarImage, CarLocation } from './car';
import { DrivingLicense, UserIdentification } from './identification';
import { Trip, TripCancellation } from './trip';
import { Role, User } from './user';

// Additional utility types
export type UserWithRoles = User & {
  roles: Role[];
};

export type CarWithDetails = Car & {
  images: CarImage[];
  certificate: CarCertificate;
  location: CarLocation;
  owner: User;
};

export type TripWithDetails = Trip & {
  car: CarWithDetails;
  renter: User;
  cancellation?: TripCancellation;
};

export type UserWithIdentification = User & {
  driving_license?: DrivingLicense;
  identification?: UserIdentification;
};
