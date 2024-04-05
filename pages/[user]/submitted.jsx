import { UserSectionWrapper, UserDesigns, AuthLayout } from '@/components'

function UserSubmittedDesignsPage() {

  return (
    <UserSectionWrapper>
      <UserDesigns />
    </UserSectionWrapper>
  )
}

UserSubmittedDesignsPage.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default UserSubmittedDesignsPage
