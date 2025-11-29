import { useCallback, useEffect, useState } from 'react';

type QueryData<T> = {
  data: T | null;
  loading: boolean;
  error: unknown;
};

const convertToData = <T>(response: unknown, error: unknown = null): QueryData<T> => {
  if (error) {
    return { data: response as T, loading: false, error };
  }
  return { data: response as T, loading: false, error: null };
};

type ResponseType<T> = QueryData<T> & {
  refetch?: () => void;
};

type OptionProps = {
  input: Record<string, unknown>;
};
export const useQuery = <T>(
  api: (input?: Record<string, unknown>) => Promise<T>,
  options?: OptionProps,
): ResponseType<T> => {
  // TODO: Check why loading=false is needed
  const [data, setData] = useState<QueryData<T>>({ data: null, loading: false, error: null });

  const refetch = async () => {
    api(options?.input)
      .then((response) => setData(convertToData(response)))
      .catch((error) => setData(convertToData(null, error)));
  };

  const refetchHandler = useCallback(() => {
    setData((prev) => ({
      ...prev,
      loading: true,
    }));
  }, []);

  const loading = data.loading;
  useEffect(() => {
    if (loading) {
      refetch();
    }
  }, [loading]);

  return {
    ...data,
    refetch: refetchHandler,
  };
};
