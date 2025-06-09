export interface Car {
  id: string;
  owner_id: string;
  location_id: string;
  license_plate_number: string;
  year_of_manufacture: number;
  brand: string;
  model: string;
  number_of_seats: number;
  fuel_type: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  transmission_type: 'manual' | 'automatic';
  fuel_consumption: number;
  base_price_per_day: number;
  description?: string;
  approval_status: 'pending' | 'approved' | 'rejected';
  status: 'active' | 'rented' | 'inactive' | 'banned';
  created_at: Date;
  updated_at: Date;
}

export interface CarImage {
  id: string;
  car_id: string;
  image_order: number;
  image_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface CarCertificate {
  id: string;
  car_id: string;
  registration_url: string;
  inspection_url: string;
  insurance_url: string;
  front_image_url: string;
  left_image_url: string;
  right_image_url: string;
  back_image_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface CarLocation {
  id: string;
  user_id: string;
  province: string;
  district: string;
  ward: string;
  address_details: string;
  latitude: number;
  longitude: number;
  created_at: Date;
  updated_at: Date;
}
