import { useEffect } from 'react'
import { useRouter } from 'next/router'

function useValidType(type) {
  const router = useRouter()

  useEffect(() => {
    const validType = isValidType(type) // Assuming isValidType is a function that checks if the type is valid

    // Category not found
    if (!validType) {
      // Redirect to 404 page
      // router.push('/404')
      console.log('Invalid type:', type)
    }
  }, [type, router])

  return { validType }
}

export default useValidType
