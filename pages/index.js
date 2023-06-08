import React from "react";
import { useAuth } from '@/hooks'

function Index() {
  const { user, logout} = useAuth()
  console.log(user);

  return (
    <div>
      <h1>Hello, World!</h1>
      <p>This is a simple React component.</p>

      {user ?
      <div>
        <p>Hola { user.firstname } { user.lastname }</p>
        <button onClick={ logout }>Logout</button>
      </div>
    : null}
    </div>
  );
}

export default Index;
