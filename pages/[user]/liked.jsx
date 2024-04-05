import { LikedDesigns, AuthLayout, UserSectionWrapper } from '@/components'

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
