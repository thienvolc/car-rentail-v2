export interface Trip {
  id: string;
  trip_code: string;
  car_id: string;
  renter_id: string;
  pickup_date: Date;
  return_date: Date;
  total_amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'in_progress' | 'completed' | 'cancelled';
  approval_time?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface TripCancellation {
  id: string;
  trip_id: string;
  cancelled_by_user_id: string;
  cancelled_at: Date;
  created_at: Date;
}
