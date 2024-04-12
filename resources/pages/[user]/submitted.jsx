import { UserSectionWrapper, UserDesigns, AuthLayout } from '@/components'

/* 
 * Page of websites submitted by the user
 */
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
