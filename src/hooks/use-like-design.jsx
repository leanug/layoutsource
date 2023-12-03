import { useEffect, useState } from "react"
import { useLoading } from "@/hooks"

/**
 * Custom hook for handling a design's likes counter and button logic
 *
 * @returns {JSX.Element} React component.
 */
export function useLikeDesign(useLikeDesignProps) {
  const { 
    designId, 
    likes, 
    likeHandler, 
    dislikeHandler, 
    likedDesignCtrl, 
    layoutCtrl,
    userId
  } = useLikeDesignProps

  const { loading, startLoading, stopLoading } = useLoading()
  const [likedLayout, setLikedLayout] = useState(null)

   // Check if a design has been liked
   useEffect(() => {
    if (typeof userId === 'number') {
      (async () => {
        try {
          startLoading()
          // Check if the design has been liked by the user
          const response = await likedDesignCtrl.check(userId, designId)
          setLikedLayout(response)
        } catch(error) {
          setLikedLayout(false)
          console.error(error)
        } finally {
          stopLoading(); // Stop loading after data is fetched
        }
    })()
    }
  }, [designId, userId])

  // Function to handle liking a design
  const handleLikeLayout = async () => {
    if (typeof userId === 'number') {
      try {
        startLoading()
        /* await new Promise(resolve => setTimeout(resolve, 2000)); */

        // Send a request to like the layout
        const likeDesignResponse = await likedDesignCtrl.add(userId, designId)
        await layoutCtrl.like(likes, designId);
        setLikedLayout(likeDesignResponse);
        // Update likes inside parent (grid-items)
        likeHandler()
      } catch (error) {
        console.error('Error liking layout:', error);
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
        await likedDesignCtrl.delete(likedLayout.id)
        await layoutCtrl.dislike(likes, designId)
        // Handle the response (e.g., update UI or state)
        setLikedLayout(false);
        // Update likes inside parent (grid-items)
        dislikeHandler()
      } catch (error) {
        console.error('Error disliking layout:', error)
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