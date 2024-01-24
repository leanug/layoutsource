import { useAuth } from "@/hooks";
import { 
  LoadingIndicator,
  EditProfileForm, 
  EditImageForm 
} from "@/components";

export default function UserSettingsPage() {
  const { user } = useAuth()
  
  if (! user) return <LoadingIndicator />

  return (
    <section className="section-full">
      <EditImageForm 
        username={user?.username || '' }
        avatar={ user?.avatar?.url || '/default-avatar.png' } 
      />
      <EditProfileForm />
     </section>
  )
}