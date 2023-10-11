import { ENV } from "@/utils"
import { useLoading } from "@/hooks"
import { useState } from "react"

/**
 * Custom hook for managing designs data and fetching new designs.
 * @param {Array} initialDesigns - Initial designs data, if available.
 * @param {Function} fetchFunction - Function to fetch new designs data.
 * @returns {Object} An object containing designs data, loading state, and a function to load more designs.
 */
export function useDesigns(initialDesigns, fetchFunction) {
  /**
   * State to manage loading state.
   * @type {Object}
   * @property {boolean} loading - Indicates whether data is currently being loaded.
   * @property {Function} startLoading - Function to start loading state.
   * @property {Function} stopLoading - Function to stop loading state.
   */
  const { loading, startLoading, stopLoading } = useLoading()
  const [designs, setDesigns] = useState(initialDesigns || [])
  const [page, setPage] = useState(1)

  const loadDesigns = async (params) => {
    try {
      startLoading()
      const nextPage = page + 1
      const response = await fetchFunction({ ...params, page: nextPage })
      const fetchedDesigns = response?.data || [];

      if(! response?.data) {
        if(ENV.IS_DEV) {
          console.error(`No data found: `, response)
        }
        return
      }

      setDesigns((prevDesigns) => [...prevDesigns, ...fetchedDesigns])
      setPage(nextPage)
    } catch (error) {
      if(ENV.IS_DEV) {
        console.error(`Error fetching designs: `, error)
      }
    } finally {
      stopLoading()
    }
  }

  return {
    designs,
    loading,
    loadDesigns,
  }
}