import api from "./api";

import type {
  MessageTemplate,
  MessageTemplateRequest,
} from "../types/template";

export const getTemplates = async (): Promise<MessageTemplate[]> => {
  const res = await api.get<MessageTemplate[]>("/templates/");
  return res.data;
};

export const createTemplate = async (
  data: MessageTemplateRequest
): Promise<MessageTemplate> => {
  const res = await api.post<MessageTemplate>("/templates/", data);
  return res.data;
};

export const updateTemplate = async (
  id: number,
  data: MessageTemplateRequest
): Promise<MessageTemplate> => {
  const res = await api.put<MessageTemplate>(`/templates/${id}/`, data);
  return res.data;
};

export const deleteTemplate = async (id: number): Promise<void> => {
  await api.delete(`/templates/${id}/`);
};