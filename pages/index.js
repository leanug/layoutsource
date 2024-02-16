import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="max-w-screen-xl bg-gray-50">
        <h1 className="mb-4 text-center text-4xl">
          Find Inspiration for Your Designs
        </h1>
        <p className="text-center text-xl">
          Explore proven website designs thoughtfully curated to boost conversion rates.
        </p>
      </div>
      
      <div className="text-center w-full max-w-2xl mx-auto bg-gray-50">
        <span className="text-blue-700">ONLY PROVEN DESIGNS FOR CONVERTIONS</span>
        <h2 className="6xl bg-gray-50">Discover, Create, and Optimize Your Designs with [Your Web App]</h2>
        <p className="6xl bg-gray-50">
          Unlock a treasure trove of only the most proven and conversion-optimized website designs. 
          Our curated collection ensures you find inspiration from designs that 
          have demonstrated real success.
        </p>
        <Link href="/designs/home-pages" className="font-bold py-2 px-4 rounded-full mx-auto block">
          Click Me
        </Link>
      </div>
    </>
  );
}