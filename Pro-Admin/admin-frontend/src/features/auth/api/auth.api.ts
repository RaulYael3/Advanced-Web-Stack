import { ApiResponse } from "@/shared/types";
import { LoginCredentials, RegisterCredentials } from "../model/types";
import { User } from "@/shared/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  register: async (credentials: RegisterCredentials) => {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  getCurrentUser: async (token: string) => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },
};
