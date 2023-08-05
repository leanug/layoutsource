import { useAuth } from "@/hooks"
import { DateTime } from "luxon"

export function Info() {
  const { user } = useAuth()
  
  if (! user) return <h1>Loading data...</h1>

  return (
    <div className="text-left">
      <h1 className="text-3xl font-bold mb-4">Account Info</h1>
      <h3 className="text-2xl font-semibold mb-2">{user.username}</h3>
      <h4 className="text-lg text-gray-600 mb-4">{user.email}</h4>
      <p className="text-gray-500">
        Member since: {DateTime.fromISO(user.createdAt, { locale: "en" }).toFormat("DDD")}
      </p>
    </div>
  );
}

