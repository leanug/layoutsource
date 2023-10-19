import GridItem from "./grid-item"
import { useContext } from "react"
import { ModalContext } from "@/contexts"
import { Collections } from "@/containers"
import { useAuth } from "@/hooks"

export function GridLayouts ({ layouts }) {
  let { handleModal } = useContext(ModalContext);
  const { user } = useAuth()
  
  const openCollectionsModal = (designId) => {
    const modalContent = <Collections 
      userId={ user.id } 
      designId={ designId }
      handleModal={ handleModal }
    />
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
          />
        ))
      }
    </div>
  )
}