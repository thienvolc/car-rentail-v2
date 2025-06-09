export interface DrivingLicense {
  id: string;
  user_id: string;
  verified_by_user_id?: string;
  verified_at?: Date;
  license_number: string;
  full_name_on_license: string;
  status: 'pending' | 'verified' | 'rejected';
  license_front_image_url: string;
  license_back_image_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserIdentification {
  id: string;
  user_id: string;
  verified_by_user_id?: string;
  verified_at?: Date;
  full_name: string;
  phone_number: string;
  email: string;
  national_id_number: string;
  national_id_front_image_url: string;
  selfie_with_national_id_image_url: string;
  status: 'pending' | 'verified' | 'rejected';
  created_at: Date;
  updated_at: Date;
}
