import { LikedDesigns, UserSectionWrapper, AuthLayout } from '@/components'

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
