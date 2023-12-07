import GridItem from "./grid-item"
import { useEffect } from "react"
import { Collections } from "@/containers"
import { useAuth } from "@/hooks"
import { ShowcaseDesign } from "@/components"
import { useRouter } from "next/router"
import { useModalStore } from "@/store"

export function GridLayouts ({ designs }) {
  const { user } = useAuth()
  const router = useRouter()
  const { modal, handleModal } = useModalStore()

  const openCollectionsModal = (designId) => {
    const content = <Collections 
      userId={ user.id } 
      designId={ designId }
      handleModal={ handleModal }
    />
    // Open modal
    handleModal(true, content)
  }

  // Restore the URL to its previous state, when showcase design modal is closed
  useEffect(() => {
    if(! modal) {
    window.history.pushState(null, null, router.asPath);
    }
  }, [modal])

  const showcaseDesign = (designSlug) => {
    // Use JavaScript history to navigate without page reload
    window.history.pushState(null, null, `/showcase/${ designSlug }`)
    const modalContent = <ShowcaseDesign />
    
    handleModal(true, modalContent)
  }
 
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9">
      {
        designs?.map((item) => (
          <GridItem 
            user={ user }
            key={ item
              .id } 
            design={ item } 
            openCollectionsModal={ openCollectionsModal }
            showcaseDesign={ showcaseDesign }
          />
        ))
      }
    </div>
  )
}