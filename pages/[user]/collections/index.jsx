import {
  Collections,
  AuthLayout,
  UserSectionWrapper,
} from '@/components'

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
