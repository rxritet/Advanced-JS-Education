// src/hooks/useApi.js
import { useState, useEffect, useCallback, useRef } from 'react';

export function useApi(apiFunction, dependencies = []) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const isMounted       = useRef(true);
  const abortController = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const execute = useCallback(async () => {
    if (abortController.current) abortController.current.abort();
    abortController.current = new AbortController();
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction();
      if (isMounted.current) { setData(result); setError(null); }
    } catch (err) {
      if (err.name === 'AbortError') return;
      if (isMounted.current) { setError(err.message || 'An error occurred'); setData(null); }
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    isMounted.current = true;
    execute();
    return () => {
      isMounted.current = false;
      if (abortController.current) abortController.current.abort();
    };
  }, [execute]);

  const refetch = useCallback(() => execute(), [execute]);
  return { data, loading, error, refetch };
}

export function useMutation(apiFunction) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [data, setData]       = useState(null);

  const mutate = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction(payload);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return { mutate, loading, error, data };
}

export function usePaginatedApi(apiFunction, pageSize = 10) {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [page, setPage]       = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPage = useCallback(async (pageNum) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction(pageNum, pageSize);
      if (result.length < pageSize) setHasMore(false);
      setData((prev) => (pageNum === 1 ? result : [...prev, ...result]));
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [apiFunction, pageSize]);

  useEffect(() => { fetchPage(1); }, [fetchPage]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const next = page + 1;
      setPage(next);
      fetchPage(next);
    }
  }, [loading, hasMore, fetchPage, page]);

  const reset = useCallback(() => {
    setData([]); setPage(1); setHasMore(true); fetchPage(1);
  }, [fetchPage]);

  return { data, loading, error, loadMore, hasMore, reset, page };
}

export default useApi;