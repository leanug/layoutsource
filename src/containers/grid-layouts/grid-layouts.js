import GridItem from "./grid-item"
import { useContext, useEffect } from "react"
import { ModalContext } from "@/contexts"
import { Collections } from "@/containers"
import { useAuth } from "@/hooks"
import { ShowcaseDesign } from "@/components"
import { useRouter } from "next/router"

export function GridLayouts ({ layouts }) {
  let { handleModal, modal } = useContext(ModalContext);
  const { user } = useAuth()
  const router = useRouter()

  const openCollectionsModal = (designId) => {
    const modalContent = <Collections 
      userId={ user.id } 
      designId={ designId }
      handleModal={ handleModal }
    />
    handleModal(modalContent)
  }

  // Restore the URL to its previous state, when showcase design modal is closed
  useEffect(() => {
    if(! modal) {
    window.history.pushState(null, null, router.asPath);
    }
  }, [modal])

  const showcaseDesign = (designSlug) => {
    // Use JavaScript history to navigate without page reload
    window.history.pushState(null, null, `/showcase/${ designSlug }`);
    const modalContent = <ShowcaseDesign />
    handleModal(modalContent)
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9">
      {
        layouts.map((layout) => (
          <GridItem 
            user={ user }
            key={ layout.id } 
            layout={ layout } 
            openCollectionsModal={ openCollectionsModal }
            showcaseDesign={ showcaseDesign }
          />
        ))
      }
    </div>
  )
}