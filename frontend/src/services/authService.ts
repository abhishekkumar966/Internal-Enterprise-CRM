import api from "./api";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
}

export const login = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};