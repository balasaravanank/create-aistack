'use client';

import { useState, useEffect } from 'react';

/**
 * @ai-context Generic fetch wrapper with loading/error states and auto-refresh.
 * Usage: const { data, error, isLoading, refetch } = useFetch('/api/users');
 */
export function useFetch<T = any>(url: string, options: RequestInit = {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { fetchData(); }, [url]);

  return { data, error, isLoading, refetch: fetchData };
}
