import { LikedLayouts } from "@/api"
import { useAuth } from "@/hooks"
import { useEffect, useState } from "react"

const likedLayoutCtrl = new LikedLayouts()

export function LikedLayoutsIcon(props) {
  const { layoutId } = props
  const [likedLayout, setLikedLayout] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if ( user ) {
      (async () => {
        try {
          const response = await likedLayoutCtrl.check(user.id, layoutId)
          setLikedLayout(response)
        } catch(error) {
          setLikedLayout(false)
          console.error(error);
        }
    })()
    }
    
  }, [layoutId, user])

  // Function to handle liking a layout
  const handleLikeLayout = async () => {
    if (user) {
      console.log('handle Like Layout');
      // Send a request to like the layout
      const response = await likedLayoutCtrl.add(user.id, layoutId);
      setLikedLayout(response)
      // Handle the response (e.g., update UI or state)
      // You may also want to re-fetch the liked status
    }
  };

  // Function to handle disliking a layout
  const handleDislikeLayout = async () => {
    if (user) {
      console.log('handle Dislike Layout');
      
      // Send a request to dislike the layout
      const response = await likedLayoutCtrl.delete(likedLayout.id);
      // Handle the response (e.g., update UI or state)
      setLikedLayout(false)
    }
  };

  if (likedLayout === null) return null 

  return (
    <div>
      {likedLayout ? (
        <button onClick={handleDislikeLayout}>Dislike</button>
      ) : (
        <button onClick={handleLikeLayout}>Like</button>
      )}
    </div>
  );
}