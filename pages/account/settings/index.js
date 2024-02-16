import { useAuth } from "@/hooks"
import { 
  LoadingIndicator,
  EditProfileForm, 
  EditImageForm, 
  SettingsMenu
} from "@/components"

export default function UserSettingsPage() {
  const { user } = useAuth()
  
  if (! user) return <LoadingIndicator />

  return (
    <section className="section-full mt-20">
      <div className="flex flex-row mx-auto gap-8 w-full max-w-3xl">
        <div className="w-48 mb-8 md:mb-0">
          <SettingsMenu currentPage={ 'general' } />
        </div>
        <div className="w-full">
          <div className="mb-10">
            <EditImageForm 
              username={ user?.username || '' }
              avatar={ user?.avatar?.url || '/default-avatar.png' } 
            />
          </div>
          <EditProfileForm />
        </div>
      </div>
     </section>
  )
}