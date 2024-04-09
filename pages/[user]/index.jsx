import { LikedDesigns, UserSectionWrapper, AuthLayout } from '@/components'

/* 
 * Page List of designs liked by the user with pagination
 */
function UserLikedDesignsPage() {
  return (
    <UserSectionWrapper>
      <LikedDesigns />
    </UserSectionWrapper>
  )
}

UserLikedDesignsPage.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default UserLikedDesignsPage
