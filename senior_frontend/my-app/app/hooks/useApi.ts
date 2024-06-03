import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

interface UseAPIOptions {
  url: string;
  params?: Record<string, any>;
  immediate?: boolean; // Whether to fetch immediately
}

const useAPI = <T>({ url, params, immediate = true }: UseAPIOptions) => {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.get<T>(url, { params });
      if (result.data.results && result.data.results.length > 0) {
        setResponse(result.data.results);
      } else {
        setResponse(null);
      }
    } catch (err) {
      setError(err.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  }, [url, params]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  return { response, loading, error, refetch: fetchData };
};

export default useAPI;
