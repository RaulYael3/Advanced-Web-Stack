// Tipos compartidos en toda la aplicación
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
