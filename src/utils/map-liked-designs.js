// Function to convert array to object with design as key
export function arrayToObject(array) {
  return array.reduce((obj, item) => {
    // Change the key from _id to documentId
    const { _id, ...rest } = item
    obj[rest.design] = { documentId: _id, ...rest }
    return obj
  }, {})
}

