import React from "react";
import { useAuth } from '@/hooks'
import FeaturedLayouts from "@/components/home/featured-layouts";
import CategoryFilterNav from "@/components/shared/category-nav";

function HomePage() {
  const { user, logout} = useAuth()
  console.log(user);

  return (
    <div>
      <h1 className="text-xl mb-10">Home page</h1>
      <CategoryFilterNav />
      <FeaturedLayouts />

      {user ?
      <div className="mt-10">
        <p>Hola { user.firstname } { user.lastname }</p>
        <button onClick={ logout }>Logout</button>
      </div>
    : null}
    </div>
  );
}

export default HomePage;
