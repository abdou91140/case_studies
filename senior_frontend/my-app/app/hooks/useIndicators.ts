import { useEffect, useState, useCallback, useMemo } from 'react';
import { API_ROUTES } from '../api/routes';
import { formatDate } from '../services/formatDate';
import useAPI from './useApi';

interface Indicator {
  date: string;
  dimension: string;
  indicator: string;
  value: number;
}

const useIndicators = (dimensionId: string, startDate: Date, endDate: Date) => {
  const formattedStartDate = useMemo(() => formatDate(startDate), [startDate]);
  const formattedEndDate = useMemo(() => formatDate(endDate), [endDate]);
  const [indicators, setIndicators] = useState<Indicator[]>([]);

  const { response, loading, error, refetch } = useAPI<Indicator[]>({
    url: API_ROUTES.INDICATORS,
    params: {
      dimension: dimensionId,
      start: formattedStartDate,
      end: formattedEndDate,
    },
    immediate: false,
  });


  const fetchData = useCallback(() => {
    if (dimensionId) {
      refetch();
    }
  }, [formattedStartDate, formattedEndDate]);



  useEffect(() => {
    if (response) {
      fetchData
      setIndicators(response);
    }
  }, [refetch]);

  return { indicators, loading, error,fetchData };
};

export default useIndicators;
