import { AddCollectionForm } from '.'

export function AddCollection(props) {
  const { designId, userId, handleModal, addDesign } = props

  return (
    <AddCollectionForm
      designId={designId}
      userId={userId}
      handleModal={handleModal}
      addDesign={addDesign}
    />
  )
}
