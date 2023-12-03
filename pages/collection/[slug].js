import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { useLoading, useAuth, useFirstRender } from "@/hooks"

import { useModalStore } from "@/store"

import { 
  PaginatedDesigns, 
  ConfirmationDialog, 
  Custom404 
} from "@/components"

import { Collection } from "@/api"

const collectionCtrl = new Collection()

export default function CollectionPage () {
  const { user } = useAuth()
  const router = useRouter()
  const { firstRender } = useFirstRender()
  const { loading, startLoading, stopLoading } = useLoading()
 
  const { handleModal } = useModalStore()

  const [designs, setDesigns] = useState([])
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({})
  const [title, setTitle] = useState('')
  const [collectionId, setCollectionId] = useState(0)
  const [collectionExists, setCollectionExists] = useState(true)

  const { slug } = router.query

  // Load more designs on page change
  useEffect(() => {
    
    console.log('pagination', pagination);
    if(user?.id) {
      (async () => {
        try {
          startLoading()
          const newData = await collectionCtrl.getBySlug({
            userId: user['id'],
            slug,
            page, 
          })
          
          if(newData) {
            setDesigns([...designs, ...newData?.designs || []])
            setPagination(newData?.pagination || {})
            setTitle(newData.collectionTitle)
            setCollectionId(newData.collectionId)
            setCollectionExists(true)
          } else {
            setCollectionExists(false)
          }
        } finally {
          stopLoading()
        }
    })()
  }
  }, [page, user])

  const handlePage = () => {
    setPage(prevPage => prevPage + 2)
  }

  const handleEdit = () => {
    console.log('edit');
  }

  // Delete the current collection
  const deleteCollection = async () => {
    console.log('delete collection function');
    try {
      const result = await collectionCtrl.delete(collectionId)
      console.log(result);
    } catch (error) {
      
    }
  }

  // Open a delete collection modal
  const handleDelete = () => {
    const content = <ConfirmationDialog 
      handleModal={ handleModal }
      onConfirm={ deleteCollection }
    />
    console.log('handle Delete -> open modal')
    // Open modal
    handleModal(true, content)
  }

  if (! collectionExists) {
    return <Custom404 />
  }

  return (
    <>
      {
        designs?.length ? (
          <section>
            <div className="section-full mb-3 gap-8 flex-row flex items-center justify-between">
              <div className="flex flex-row gap-2.5 items-center">
                <h1 className="text-xl">{ title }</h1>
                <button onClick={ handleEdit }>Edit</button>
                <button onClick={ handleDelete }>Delete</button>
              </div>
              <div className="flex flex-row items-center gap-3">
                <span className="w-40 text-right">
                  { designs?.length } { designs?.length === 1 ? 'result' : 'results'}
                </span>
              </div>
            </div>
          </section>
        ) : null
      }
      
      <PaginatedDesigns 
        designs={ designs } 
        loading={ loading }
        totalPages={ pagination?.totalPages || 0 }
        totalItems={ pagination?.totalItems || 0 }
        handlePage={ handlePage }
      />
    </>
  )
}

