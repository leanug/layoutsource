import { LikedLayouts, Layout } from "@/api"
import { useAuth, useLoading } from "@/hooks"
import { useEffect, useState } from "react"
import Loading from "./loading"
import { HeartRegular, HeartSolid } from "./icons"

const likedLayoutCtrl = new LikedLayouts()
const layoutCtrl = new Layout()

export function DesignLikerBtn(props) {
  const [likedLayout, setLikedLayout] = useState(null)
  const { layoutId, likes, setLikes } = props
  console.log('likes', likes);
  const { loading, startLoading, stopLoading } = useLoading()
  const { user } = useAuth()

  useEffect(() => {
    if ( user ) {
      (async () => {
        try {
          startLoading()
          await new Promise(resolve => setTimeout(resolve, 2000));
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

  // Function to handle liking a layout
const handleLikeLayout = async () => {
  if (user) {
    try {
      // Send a request to like the layout
      const likeDesignResponse = await likedLayoutCtrl.add(user.id, layoutId);
      const updateDesignLikesResponse = await layoutCtrl.like(likes, layoutId);
      setLikedLayout(likeDesignResponse);
      // Update likes inside parent (grid-items)
      setLikes(likes + 1);
    } catch (error) {
      console.error('Error liking layout:', error);
      // You can handle the error here, for example, show a toast or message to the user.
    }
  }
};

// Function to handle disliking a layout
const handleDislikeLayout = async () => {
  if (user) {
    try {
      // Send a request to dislike the layout
      const dislikeDesignResponse = await likedLayoutCtrl.delete(likedLayout.id);
      const updateDesignLikesResponse = await layoutCtrl.dislike(likes, layoutId);
      // Handle the response (e.g., update UI or state)
      setLikedLayout(false);
      // Update likes inside parent (grid-items)
      setLikes(likes - 1);
    } catch (error) {
      console.error('Error disliking layout:', error);
      // You can handle the error here, for example, show a toast or message to the user.
    }
  }
};


  if (likedLayout === null) return null 

  // Show like / dislike buttons
  return (
    <div>
      {loading ? (
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-2">
          <Loading />
        </div>
      ) : (
        <div>
          {likedLayout ? (
            <button
              onClick={ handleDislikeLayout }
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-2"
            >
              <HeartSolid className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={ handleLikeLayout }
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-2"
            >
              <HeartRegular className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}