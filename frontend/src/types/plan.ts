export interface Plan {
  id: number;
  plan_name: string;
  price: number;
  billing_cycle: string;
  features: string[];
}