import { AddCollectionForm } from "./";

export function AddCollection({ designId, userId, handleModal }) {
  return (
    <div className="p-4">
      <AddCollectionForm 
        designId={ designId } 
        userId={ userId }
        handleModal={ handleModal }
      />
    </div>
  );
}