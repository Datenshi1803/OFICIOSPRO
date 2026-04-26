// filepath: frontend/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'client' | 'technician';
  provincia?: string;
  distrito?: string;
  corregimiento?: string;
  // Técnico fields
  cedula?: string;
  specialty?: string;
  description?: string;
  experience_years?: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: any;
  token?: string;
}

export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al registrar usuario');
  }

  return response.json();
}

export async function loginUser(data: LoginData): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al iniciar sesión');
  }

  return response.json();
}

export async function logoutUser(): Promise<void> {
  const token = localStorage.getItem('token');
  
  if (token) {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
  }
  
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

// ============================================================
// USER MANAGEMENT (Admin)
// ============================================================

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client' | 'technician';
  is_active: boolean;
  phone?: string;
  provincia?: string;
  distrito?: string;
  corregimiento?: string;
  cedula?: string;
  specialty?: string;
  description?: string;
  experience_years?: number;
  hourly_rate?: number;
  created_at: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  phone?: string;
  provincia?: string;
  distrito?: string;
  corregimiento?: string;
  cedula?: string;
  specialty?: string;
  description?: string;
  experience_years?: number;
  hourly_rate?: number;
}

export async function getUsers(): Promise<{ success: boolean; data: any }> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}/admin/usuarios`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al obtener usuarios');
  }

  return response.json();
}

export async function getUserById(id: string): Promise<{ success: boolean; data: UserData }> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}/admin/usuarios/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al obtener usuario');
  }

  return response.json();
}

export async function updateUser(id: string, data: UpdateUserData): Promise<{ success: boolean; message: string; data: UserData }> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}/admin/usuarios/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al actualizar usuario');
  }

  return response.json();
}

export async function deleteUser(id: string): Promise<{ success: boolean; message: string }> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}/admin/usuarios/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al eliminar usuario');
  }

  return response.json();
}

export async function toggleUserActive(id: string): Promise<{ success: boolean; message: string; data: any }> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}/admin/usuarios/${id}/toggle-active`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al cambiar estado del usuario');
  }

  return response.json();
}