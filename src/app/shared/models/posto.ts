export interface Posto {
  id?: number;
  cnpj: string;
  name: string;
  itau_client_id: string;
  created_at: Date | string;
  updated_at: Date | string;
}
