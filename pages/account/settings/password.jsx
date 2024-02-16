import { useAuth } from "@/hooks";
import { 
  LoadingIndicator,
  EditPasswordForm,
  SettingsMenu
} from "@/components";

export default function UserSettingsPage() {
  const { user } = useAuth()
  
  if (! user) return <LoadingIndicator />

  return (
    <section className="section-full mt-20">
      <div className="flex flex-row w-full mx-auto gap-8 max-w-3xl">
        <div className="w-48">
          <SettingsMenu currentPage={ 'password' } />
        </div>
        <div className="w-full">
          <EditPasswordForm />
        </div>
      </div>
     </section>
  )
}