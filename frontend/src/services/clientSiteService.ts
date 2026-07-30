import api from "./api";

import type {
  ClientSite,
  ClientSiteRequest,
} from "../types/clientSite";

export const getClientSites = async (): Promise<ClientSite[]> => {
  const res = await api.get<ClientSite[]>("/sites/");
  return res.data;
};

export const createClientSite = async (
  data: ClientSiteRequest
): Promise<ClientSite> => {
  const res = await api.post<ClientSite>("/sites/", data);
  return res.data;
};

export const updateClientSite = async (
  id: number,
  data: ClientSiteRequest
): Promise<ClientSite> => {
  const res = await api.put<ClientSite>(`/sites/${id}`, data);
  return res.data;
};

export const deleteClientSite = async (
  id: number
): Promise<void> => {
  await api.delete(`/sites/${id}`);
};