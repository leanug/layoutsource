import { useLoading } from "@/hooks"

export function usePaginatedData(fetchFunction) {
  const { loading, startLoading, stopLoading } = useLoading()

  const loadDesigns = async (getBy = null, page = 1 ) => {
    try {
      startLoading()
      const response = await fetchFunction(getBy, page)
      const designs = response?.data || [];
      return { data: designs, error: null };
    } catch (error) {
      console.error(error);
      return { data: [], error };
    } finally {
      stopLoading()
    }
  }

  return {
    loading,
    loadDesigns,
  }
}