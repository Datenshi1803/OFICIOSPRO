// filepath: frontend/lib/api.ts
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

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

// ============================================================
// BIDS (Cotizaciones)
// ============================================================

export interface BidData {
  id: number
  job_id: number
  technician_id: number
  amount: string
  estimated_days: number
  proposal: string
  availability_date: string
  is_paid_bid: boolean
  status: 'pending' | 'accepted' | 'rejected'
  created_at: string
  updated_at: string
  technician?: {
    id: number
    name: string
    avatar_url: string | null
    reputation_score: string
    jobs_completed: number
    is_verified: boolean
    reputation_label: string
  }
}

export interface StoreBidData {
  job_id: number
  amount: number
  estimated_days: number
  proposal: string
  availability_date: string
}

export interface JobData {
  id: number
  ulid: string
  code: string
  client_id: number
  category_id: number
  title: string
  description: string
  zone: string
  urgency: 'normal' | 'urgent' | 'emergency'
  budget: string | null
  status: string
  created_at: string
  category?: { id: number; name: string }
  client?: {
    name: string
    reputation_score?: string | number
  }
}

// ── Técnico: ver trabajos disponibles ────────────────────────────────────────
export async function getAvailableJobs(): Promise<{ success: boolean; data: JobData[] }> {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/technician/trabajos-disponibles`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al obtener trabajos')
  }

  return response.json()
}

// ── Técnico: ver sus trabajos asignados ────────────────────────────────────────
export async function getTechnicianJobs(): Promise<{ success: boolean; data: JobData[] }> {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/technician/mis-trabajos`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al obtener trabajos asignados')
  }

  return response.json()
}

// ── Técnico: enviar cotización ────────────────────────────────────────────────
export async function storeBid(data: StoreBidData): Promise<{ success: boolean; message: string; data: BidData }> {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/technician/cotizaciones`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al enviar cotización')
  }

  return response.json()
}

// ── Técnico: ver mis cotizaciones ─────────────────────────────────────────────
export async function getMyBids(): Promise<{ success: boolean; data: BidData[] }> {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/technician/mis-cotizaciones`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al obtener cotizaciones')
  }

  return response.json()
}

// ── Técnico: editar cotización ────────────────────────────────────────────────
export async function updateBid(
  bidId: number,
  data: Partial<StoreBidData>
): Promise<{ success: boolean; message: string; data: BidData }> {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/technician/cotizaciones/${bidId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al actualizar cotización')
  }

  return response.json()
}

// ── Cliente: ver cotizaciones de un trabajo ───────────────────────────────────
export async function getJobBids(
  jobId: number,
  sort: 'reputation' | 'price' | 'date' = 'reputation'
): Promise<{ success: boolean; data: BidData[] }> {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/client/trabajos/${jobId}/cotizaciones?sort=${sort}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al obtener cotizaciones')
  }

  return response.json()
}

export interface StoreJobData {
  title: string
  description: string
  category_id: number
  zone: string
  urgency: 'normal' | 'urgent' | 'emergency'
  budget?: number | null
}

// ── Cliente: crear un trabajo ─────────────────────────────────────────────────
export async function storeJob(data: StoreJobData): Promise<{ success: boolean; message: string; data: JobData }> {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/client/trabajos`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al crear el trabajo')
  }

  return response.json()
}

// ── Cliente: ver sus trabajos ─────────────────────────────────────────────────
export async function getClientJobs(): Promise<{ success: boolean; data: JobData[] }> {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/client/trabajos`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al obtener trabajos')
  }

  return response.json()
}