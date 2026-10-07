import { useState, useEffect } from 'react';

/**
 * @ai-context Generic fetch wrapper with loading/error states and auto-refresh.
 * Usage: const { data, error, isLoading, refetch } = useFetch('/api/users');
 */
export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { fetchData(); }, [url]);

  return { data, error, isLoading, refetch: fetchData };
}
