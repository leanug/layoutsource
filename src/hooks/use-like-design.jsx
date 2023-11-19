import { useEffect, useState } from "react"
import { useAuth, useLoading } from "@/hooks"

/**
 * Custom hook for handling a design's likes counter and button logic
 *
 * @returns {JSX.Element} React component.
 */
export function useLikeDesign(useLikeDesignProps) {
  const { 
    layoutId, 
    likes, 
    likeHandler, 
    dislikeHandler, 
    likedLayoutCtrl, 
    layoutCtrl 
  } = useLikeDesignProps

  const { loading, startLoading, stopLoading } = useLoading()
  const [likedLayout, setLikedLayout] = useState(null)

  const { user } = useAuth()

   // Check if a design has been liked
   useEffect(() => {
    if ( user ) {
      (async () => {
        try {
          startLoading()
          // Check if the design has been liked by the user
          const response = await likedLayoutCtrl.check(user.id, layoutId)
          setLikedLayout(response)
        } catch(error) {
          setLikedLayout(false)
          console.error(error);
        } finally {
          stopLoading(); // Stop loading after data is fetched
        }
    })()
    }
  }, [layoutId, user])

  // Function to handle liking a design
  const handleLikeLayout = async () => {
    if (user) {
      try {
        startLoading()
        /* await new Promise(resolve => setTimeout(resolve, 2000)); */

        // Send a request to like the layout
        const likeDesignResponse = await likedLayoutCtrl.add(user.id, layoutId);
        await layoutCtrl.like(likes, layoutId);
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
    if (user) {
      try {
        startLoading()
        // Send a request to dislike the layout
        await likedLayoutCtrl.delete(likedLayout.id);
        await layoutCtrl.dislike(likes, layoutId);
        // Handle the response (e.g., update UI or state)
        setLikedLayout(false);
        // Update likes inside parent (grid-items)
        dislikeHandler()
      } catch (error) {
        console.error('Error disliking layout:', error);
      } finally {
        stopLoading(); // Stop loading after data is fetched
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