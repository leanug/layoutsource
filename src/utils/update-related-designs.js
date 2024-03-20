// Assuming `relatedDesigns` is an array of design objects
export function updateRelatedDesigns(relatedDesigns, designId) {
  // Find the index of the design with the provided designId in the relatedDesigns array
  const index = relatedDesigns.findIndex((design) => design.id === designId)

  // If the design with the provided id is found in the array, remove it
  if (index !== -1) {
    relatedDesigns.splice(index, 1)
  } else {
    // If the design with the provided id is not found, remove one element from the array if its length exceeds 4
    if (relatedDesigns.length >= 4) {
      relatedDesigns.pop() // Remove the last element from the array
    }
  }

  return relatedDesigns
}
