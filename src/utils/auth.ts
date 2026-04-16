export interface StoredUser {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface AuthResult {
  ok: boolean;
  message: string;
  user?: StoredUser;
}

const SESSION_KEY = 'cs_float_session_user';
const API_BASE = import.meta.env.VITE_API_URL ?? '';

function buildApiUrl(path: string): string {
  const base = API_BASE.trim();
  if (!base) return path;
  return `${base.replace(/\/$/, '')}${path}`;
}

function getNetworkErrorMessage(): string {
  return 'Unable to connect to the API server. Start the backend with "npm run server" and try again.';
}

function safeReadSessionUser(): StoredUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return null;
    const candidate = parsed as Record<string, unknown>;
    if (
      typeof candidate.id !== 'string' ||
      typeof candidate.username !== 'string' ||
      typeof candidate.email !== 'string' ||
      typeof candidate.createdAt !== 'string'
    ) {
      return null;
    }
    return {
      id: candidate.id,
      username: candidate.username,
      email: candidate.email,
      createdAt: candidate.createdAt,
    };
  } catch {
    return null;
  }
}

export function getCurrentUser(): StoredUser | null {
  return safeReadSessionUser();
}

async function postJson<T>(path: string, body: Record<string, unknown>): Promise<T> {
  let response: Response;
  try {
    response = await fetch(buildApiUrl(path), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error(getNetworkErrorMessage());
  }

  const rawBody = await response.text();
  let data: (T & { message?: string }) | null = null;
  if (rawBody) {
    try {
      data = JSON.parse(rawBody) as T & { message?: string };
    } catch {
      if (!response.ok) {
        throw new Error('API returned an invalid response. Check backend logs and try again.');
      }
    }
  }

  if (!response.ok) {
    throw new Error(data?.message ?? 'Request failed');
  }

  if (!data) {
    throw new Error('API returned an empty response.');
  }

  return data;
}

export async function registerUser(input: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<AuthResult> {
  const username = input.username.trim();
  const email = input.email.trim().toLowerCase();

  if (username.length < 3) {
    return { ok: false, message: 'Username must have at least 3 characters.' };
  }

  if (!email.includes('@') || email.startsWith('@') || email.endsWith('@')) {
    return { ok: false, message: 'Enter a valid email address.' };
  }

  if (input.password.length < 6) {
    return { ok: false, message: 'Password must be at least 6 characters long.' };
  }

  if (input.password !== input.confirmPassword) {
    return { ok: false, message: 'Passwords do not match.' };
  }

  try {
    const data = await postJson<{ message: string; user: StoredUser }>('/api/auth/register', {
      username,
      email,
      password: input.password,
      confirmPassword: input.confirmPassword,
    });
    localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
    return { ok: true, message: data.message, user: data.user };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to register right now.';
    return { ok: false, message };
  }
}

export async function loginUser(input: { email: string; password: string }): Promise<AuthResult> {
  const email = input.email.trim().toLowerCase();

  try {
    const data = await postJson<{ message: string; user: StoredUser }>('/api/auth/login', {
      email,
      password: input.password,
    });
    localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
    return { ok: true, message: data.message, user: data.user };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to login right now.';
    return { ok: false, message };
  }
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}
