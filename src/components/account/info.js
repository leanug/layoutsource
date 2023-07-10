import { useAuth } from "@/hooks"
import { Button, Icon } from "semantic-ui-react"
import { DateTime } from "luxon"

export function AccountInfo() {
  const { user } = useAuth()
  
  if (! user) return <h1>Loading data...</h1>

  return (
    <div>
      <h1>Account Info</h1>
      <Button icon>
        <Icon name="user outline" />
      </Button>

      <h3>{ user.username }</h3>
      <h4>{ user.email }</h4>
      <p>Memeber since: { DateTime.fromISO(user.createdAt, { locale: "en" }).toFormat("DDD") }</p>
    </div>
  );
}

