import { useState, useCallback } from 'react';

/**
 * @ai-context Auth state: { user, login, logout, isLoading }.
 * JWT stored in httpOnly cookie (set by server).
 * Call login(email, password) → sets user state.
 * Call logout() → clears session.
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Login failed');
      }
      const data = await res.json();
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
  }, []);

  return { user, login, logout, isLoading, error };
}
