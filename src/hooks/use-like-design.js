import { useEffect, useState } from "react"
import { useLoading } from "@/hooks"
import { 
  useDesignsStore, 
  useLikedDesignsStore, 
  useNotificationStore 
} from "@/store"

/**
 * Custom hook for handling a design's likes counter and button logic
 *
 * @returns {JSX.Element} React component.
 */
export function useLikeDesign(props) {
  const { 
    designId,
    likes,
    likedDesignCtrl,
    layoutCtrl,
    userId
  } = props

  const { 
    addLikedDesign, 
    removeLikedDesign,
    likedDesigns 
  } = useLikedDesignsStore()
  const { addNotification } = useNotificationStore()
  const { incrementLikes, decrementLikes } = useDesignsStore()
  const { loading, startLoading, stopLoading } = useLoading()
  const [likedLayout, setLikedLayout] = useState(null)

   // Check if a design has been liked
  useEffect(() => {
    if (typeof userId === 'number') {
      // Check if the designId is in the likedDesigns array in the Zustand store
      const isLiked = likedDesigns[designId]
      setLikedLayout(isLiked)
    }
  }, [designId, userId, likedDesigns]); // Include likedDesigns in the dependency array

  // Function to handle liking a design
  const handleLikeLayout = async () => {
    if (typeof userId === 'number') {
      try {
        startLoading()
        /* await new Promise(resolve => setTimeout(resolve, 2000)); */
        
        /**
         * Response object from the 'add' method of the LikedDesignController when liking a design.
         * Add the design to the Liked designs collection where a design is linked to a user.
         * 
         * @typedef {Object} addDesignResponse
         * @property {boolean} success - Indicates the success status of the operation.
         * @property {Object} data - Object containing information about the liked design.
         *   @property {number} likedLayoutsCollectionItemId - The ID related to the liked design pairing in the Liked Designs collection.
         */
        const addDesignResponse = await likedDesignCtrl.add(userId, designId)
        
        if (addDesignResponse.success) {
          // Add a like to the design in the designs collection
          await layoutCtrl.like(likes, designId)

          // Add liked layout to Zustand store
          const { likedLayoutsCollectionItemId } = addDesignResponse.data
          const newDesignItem = { [designId]: likedLayoutsCollectionItemId }          
          addLikedDesign(newDesignItem) // Add to the store

          // Update likes inside parent (grid-items)
          incrementLikes(designId)
        } else {
          addNotification(`
          There was an error updating your liked designs, please try again later
        `, 'error')
        }
      } finally {
        stopLoading(); // Stop loading after data is fetched
      }
    }
  };

  // Function to handle disliking a design
  const handleDislikeLayout = async () => {
    if (typeof userId === 'number') {
      try {
        startLoading()

        // Send a request to dislike the layout
        const removeDesignResponse = await likedDesignCtrl.delete(likedDesigns[designId])

        if (removeDesignResponse.success) {
          await layoutCtrl.dislike(likes, designId)
          // Update likes inside parent (grid-items)
          decrementLikes(designId)
          removeLikedDesign(designId) // Remove the design from the store
        } else {
          addNotification(`
            There was an error updating your liked designs, please try again later
          `, 'error')
        }
      } finally {
        stopLoading() // Stop loading after data is fetched
      }
    }
  }

  return {
    loading,
    likedLayout,
    handleLikeLayout,
    handleDislikeLayout
  }
}