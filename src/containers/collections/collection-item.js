import Image from "next/image";

export function CollectionItem(props) {
  const { 
    inCollection, 
    addDesign, 
    imageUrl, 
    collectionTitle, 
    designId,
    collectionId,
    designsIdAry,
    deleteDesign
  } = props
  const backgroundClass = inCollection ? 'bg-gray-200' : '';
  
  return (
    <div className={`flex flex-row group gap-3 hover:bg-gray-100 items-center px-4 py-3 ${ backgroundClass }`}>
      <div className="h-12 overflow-y-hidden bg-gray-300 w-20">
        {
          imageUrl ? (
            <Image
              src={ imageUrl } // Replace with your image source
              alt={ collectionTitle }
              className="w-full h-auto overflow-hidden"
              width={ 20 }
              height={ 12 }
            />
          ) : (
            null
          )
        }
      </div>
      <div className="w-full">{ collectionTitle }</div>
      {
        inCollection ? (
          <div className="flex items-center justify-end w-full">
            <button 
              className="py-1 px-3 rounded-md bg-slate-200"
              onClick={() => addDesign(collectionId, designId, designsIdAry)}
              >
              -
            </button>
          </div>
        ) : (
          <div className="flex items-center w-full justify-end opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              className="py-1 px-3 rounded-md bg-slate-200"
              onClick={() => addDesign(collectionId, designId, designsIdAry)}
            >
              +
            </button>
          </div>
        )
      }
    </div>
  )
}