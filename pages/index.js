import React from "react";
import { useAuth } from '@/hooks'
import FeaturedLayouts from "@/components/home/featured-layouts";

function Index() {
  const { user, logout} = useAuth()

  return (
    <div>
      <h1 className="text-xl mb-10">Home page</h1>
      <FeaturedLayouts title="Featured layouts" />

      {user ?
      <div className="mt-10">
        <p>{ user.firstname } { user.lastname }</p>
        <button onClick={ logout }>Logout</button>
      </div>
    : null}
    </div>
  );
}

export default Index;
