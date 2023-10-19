import { useAuth } from "@/hooks";
import { LoadingIndicator } from "@/components";
import { EditProfileForm } from "@/components";

export default function UserSettingsPage() {
  const { user } = useAuth()
  
  if (! user) return <LoadingIndicator />

  return (
    <section className="section-full">
      <div className="flex flex-col items-center justify-center">
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
      <img
        src={user.avatar.url || '/default-avatar.png'}
        alt="User Avatar"
        className="w-full h-full object-cover"
      />
      </div>
        <span className="font-semibold mb-2">{user.username}</span>
        <p>Edit you info</p>
      </div>
      <EditProfileForm />
     </section>
  );
}

