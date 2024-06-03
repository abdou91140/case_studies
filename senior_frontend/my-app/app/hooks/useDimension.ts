import { useEffect } from 'react';
import { API_ROUTES } from '../api/routes';
import useAPI from './useApi';

interface Dimension {
  id: string;
  country: string;
  business_unit: string;
}

const useDimensions = (setDimensions: (dimensions: Dimension[]) => void) => {
  const { response, loading, error, refetch } = useAPI<Dimension[]>({
    url: API_ROUTES.DIMENSIONS,
    immediate: true,
  });

  useEffect(() => {
    if (response) {
      setDimensions(response);
    }
  }, [response, setDimensions]);

  return { loading, error, refetch };
};

export default useDimensions;
