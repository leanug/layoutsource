import {
  Collections,
  AuthLayout,
  UserSectionWrapper,
} from '@/components'

/* 
 * User designs collections page
 */
function CollectionsPage() {
  return (
    <UserSectionWrapper>
      <Collections />
    </UserSectionWrapper>
  )
}

CollectionsPage.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default CollectionsPage
