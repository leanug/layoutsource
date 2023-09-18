import React from "react";
import FeaturedLayouts from "@/components/home/featured-layouts";
import { useAuth } from '@/hooks/use-auth'

function Index() {
  const { user } = useAuth()

  return (
    <div>
      { ! user ? (
        <h1 className="text-xl mb-10">
          Home page Message for not logged in user
        </h1>
      ) : null }
      <FeaturedLayouts title="Featured layouts" />
    </div>
  );
}

export default Index;
