import { useAuth } from "@/hooks"
import { DateTime } from "luxon"

export function Info() {
  const { user } = useAuth()
  
  if (! user) return <h1>Loading data...</h1>

  return (
    <div className="flex flex-col items-center justify-center">
    {/* Avatar */}
    <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
    <img
      src={user.avatar.url || '/default-avatar.png'} // Replace with user's avatar URL or default image
      alt="User Avatar"
      className="w-full h-full object-cover"
    />
  </div>

      <h3 className="text-2xl font-semibold mb-2">{user.username}</h3>
      <h4 className="text-lg text-gray-600 mb-4">{user.email}</h4>
      <p className="text-gray-500">
        Member since: {DateTime.fromISO(user.createdAt, { locale: "en" }).toFormat("DDD")}
      </p>
    </div>
  );
}

