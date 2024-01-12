import GridItem from "./grid-item"
import { useEffect } from "react"
import { Collections } from "@/containers"
import { useAuth } from "@/hooks"
import { ShowcaseDesign } from "@/components"
import { useRouter } from "next/router"
import { useModalStore, useShowcaseStore } from "@/store"

export function GridLayouts ({ designs }) {
  const { user } = useAuth()
  const router = useRouter()
  const { modal, handleModal } = useModalStore()
  const { handleShowcaseModal } = useShowcaseStore()

  // Open collections modal for creating or updating a collection
  const openCollectionsModal = (designId) => {
    const content = <Collections 
      userId={ user.id }
      designId={ designId }
      handleModal={ handleModal }
    />
    // Open modal
    handleModal(true, content, 'Add this design to a collection')
  }

  // Restore the URL to its previous state, when showcase design modal is closed
  useEffect(() => {
    if(! modal) {
    window.history.pushState(null, null, router.asPath);
    }
  }, [modal])

  // Open a big modal for showcasing a big design
  const showcaseDesign = (designSlug) => {
    // Use JavaScript history to navigate without page reload
    window.history.pushState(null, null, `/showcase/${ designSlug }`)
    const modalContent = <ShowcaseDesign userId={ user } />
    
    handleShowcaseModal(true, modalContent)
  }
 
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9">
      {
        designs?.map((item) => (
          <GridItem 
            user={ user }
            key={ item.id } 
            design={ item } 
            openCollectionsModal={ openCollectionsModal }
            showcaseDesign={ showcaseDesign }
          />
        ))
      }
      { ! designs && <p>Loading...</p> }
      { designs && designs.length === 0 && <p>No designs found.</p> }
    </div>
  )
}