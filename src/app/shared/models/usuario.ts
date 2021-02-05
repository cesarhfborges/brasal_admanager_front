export interface Usuario {
  id?: number;
  name: string;
  username: string;
  email: string;
  station_id?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}
