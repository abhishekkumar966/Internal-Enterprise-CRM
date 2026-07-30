import api from "./api";
import type { Plan } from "../types/plan";

export interface PlanRequest {
  plan_name: string;
  price: number;
  billing_cycle: string;
  features: Record<string, any>;
}

export const getPlans = async (): Promise<Plan[]> => {
  try {
    const response = await api.get<Plan[]>("/plans/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch plans:", error);
    throw error;
  }
};

export const createPlan = async (
  plan: PlanRequest
): Promise<Plan> => {
  try {
    const response = await api.post<Plan>("/plans/", plan);
    return response.data;
  } catch (error) {
    console.error("Failed to create plan:", error);
    throw error;
  }
};

export const updatePlan = async (
  id: number,
  plan: PlanRequest
): Promise<Plan> => {
  try {
    const response = await api.put<Plan>(`/plans/${id}`, plan);
    return response.data;
  } catch (error) {
    console.error("Failed to update plan:", error);
    throw error;
  }
};

export const deletePlan = async (id: number): Promise<void> => {
  try {
    await api.delete(`/plans/${id}`);
  } catch (error) {
    console.error("Failed to delete plan:", error);
    throw error;
  }
};