/* 
 * Compare current values with initial values to track changes
 */
export const compareAndUpdate = (initialData, formData, updateUser) => {
  for (const key in initialData) {
    if (key in initialData && key in formData) {
      if (initialData[key] !== formData[key]) {
        updateUser(key, formData[key])
      }
    }
  }
}
