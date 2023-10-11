import { AddCollectionForm } from "./";

export function AddCollection(props) {
  const { designId, userId, handleModal, addDesign } = props
  
  return (
    <div className="p-4">
      <AddCollectionForm 
        designId={ designId } 
        userId={ userId }
        handleModal={ handleModal }
        addDesign={ addDesign }
      />
    </div>
  );
}