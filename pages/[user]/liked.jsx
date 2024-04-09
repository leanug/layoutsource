import { 
  LikedDesigns, 
  AuthLayout, 
  UserSectionWrapper 
} from '@/components'

/* 
 * This page displays a list of designs that the user has liked, 
 * with pagination for easy navigation.
 */
function LikedDesignsPage() {
  return (
    <UserSectionWrapper>
      <LikedDesigns />
    </UserSectionWrapper>
  )
}

LikedDesignsPage.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default LikedDesignsPage
