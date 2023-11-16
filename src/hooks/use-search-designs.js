import { ENV } from "@/utils"
import { Layout } from "@/api"
import { useLoading } from "@/hooks"
import { useState } from "react"

/**
 * Custom hook for managing designs data and fetching new designs.
 * @param {Array} initialDesigns - Initial designs data, if available.
 * @param {Function} fetchFunction - Function to fetch new designs data.
 * @returns {Object} An object containing designs data, loading state, and a function to load more designs.
 */
export function useSearchDesigns(layoutCtrl, router) {
  /**
   * State to manage loading state.
   * @type {Object}
   * @property {boolean} loading - Indicates whether data is currently being loaded.
   * @property {Function} startLoading - Function to start loading state.
   * @property {Function} stopLoading - Function to stop loading state.
   */
  const { loading, startLoading, stopLoading } = useLoading()
  const [designs, setDesigns] = useState([])
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({})
  const [sortBy, setSortBy] = useState('updatedAt')
  const { type, category } = router.query

  console.log('useDesigns type, cat', type, category);
  
  /* Fetch designs by type */
  /* const fetchDesignsByQuery = async (query = '', pageNum) => {
    try {
      startLoading()
      const response = await layoutCtrl.searchDesigns({ 
        text: query, 
        page: pageNum ? pageNum : page + 1
      })
      
      setPagination(response?.meta?.pagination || {})

      // User entered page number
      if(pageNum) {
        const fetchedDesigns = response?.data || []
        setDesigns(fetchedDesigns)
        setPage(pageNum)
        return
      } 

      handleFetchResponse(response)

    } catch (error) {
      handleFetchError(error)
    } finally {
      stopLoading()
    }
  } */

  /* Fetch designs by type */
  const fetchLikedDesigns = async (userId = '', pageNum) => {
    try {
      startLoading()
      const response = await likedLayoutCtrl.get({ 
        userId, 
        page: pageNum ? pageNum : page + 1
      })
      
      setPagination(response?.meta?.pagination || {})

      const mappedResponse = response.data.map(item => {
        return item.attributes.layout.data
      })
      console.log('page=', page);

      console.log('mappedResponse=', mappedResponse);
      // User entered page number
      if(pageNum) {
        const fetchedDesigns = mappedResponse || []
        setDesigns(fetchedDesigns)
        setPage(pageNum)
        return
      } 

      handleFetchResponse(mappedResponse)

    } catch (error) {
      handleFetchError(error)
    } finally {
      stopLoading()
    }
  }

  /* Common logic for handling fetch response */
  const handleFetchResponse = (response) => {
    const fetchedDesigns = response?.data || [];
    console.log('handleFetchResponse response= ', response);
    if (! response?.data) {
      if (ENV.IS_DEV) {
        console.error(`No data found: `, response);
      }
      return;
    }
    setDesigns((prevDesigns) => [...prevDesigns, ...fetchedDesigns]);
    setPage(page + 1);
  };

  /* Common logic for handling fetch errors */
  const handleFetchError = (error) => {
    if (ENV.IS_DEV) {
      console.error(`Error fetching designs: `, error);
    }
  };

  return {
    designs,
    loading,
    pagination,
    fetchLikedDesigns
  }
}