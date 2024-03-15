const router = useRouter()
  const { type } = router.query

  const validType = isValidType(type) // Check if the type is valid

  useEffect(() => {
    // Category not found
    if (!validType) {
      //router.push('/404')
      console.log('invalid type', type)
    }
  }, [validType, router])

  if (!validType) {
    return <ScreenLoadingIndicator />
  }