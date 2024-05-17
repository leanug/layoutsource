import { useLikedDesigns } from '@/hooks' // Import your hook for fetching liked designs

export function SetUserDesignsData({ children }) {
  // Fetch liked designs here using the user Id
  useLikedDesigns()
  return <>{children}</>
}
