import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { DefaultLayout } from '@/components'
import { FeaturedDesigns } from '@/containers'
import { useAuth } from '@/hooks'

// Images
import fallbackImg from '@/assets/images/default.png'
import designsGridImg from '@/assets/images/designs-grid.png'
import collectionsMenuImg from '@/assets/images/collections-menu.png'
import heroImg from '@/assets/images/hero-img.png'
import { useEffect } from 'react'

export default function HomePage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  // Redirect if user is logged in
  useEffect(() => {
    if (user && router) {
      router.push('/designs/homepages/')
    }
  }, [user, router])

  // Don't show page content if user is logged in or loading
  if ((!user && loading) || user) return null

  return (
    <div className="text-gray-950 dark:text-white">
      <section className="section-full lg:mb-10">
        <div className="max-w-screen-xl text-center mx-auto mb-24 mt-24">
          <span className="top-title">ONLY PROVEN DESIGNS FOR CONVERTIONS</span>
          <h1 className="mb-4 font-bold text-2xl md:text-5xl leading-tight xl:leading-tight lg:text-6xl text-center mt-6">
            Explore Endless Inspiration for Your Creative Designs and Projects
          </h1>
          <p className="text-center text-lg md:text-2xl max-w-3xl leading-normal mx-auto mt-6">
            Find Curated Website Designs to Ignite Creativity and Foster
            Innovation. Like and Organize Collections from Proven Designs
            Tailored for High Conversions from all around the web.
          </p>
          {/* Links */}
          <div className="flex flex-row gap-5 max-w-2xl mx-auto mt-11 justify-center">
            <Link href="/join/sign-in" className="big-btn-primary w-44">
              Log in
            </Link>
            <Link href="/join/sign-up" className="big-btn-primary w-44">
              Sign up
            </Link>
          </div>
          {/* End links */}
        </div>
      </section>

      {/* Hero image */}
      <Image
        src={heroImg || fallbackImg}
        alt={`Hero dashboard web app layoutloom image`}
        className="max-w-screen-2xl px-2.5 w-full object-cover mx-auto origin-top rounded-xl mb-16 lg:mb-32"
        width="0"
        height="0"
        sizes="100%"
        priority={true}
      />
      {/* End Hero image */}

      <section className="px-2.5 md:px-0 mb-16 lg:mb-32 max-h-80 w-full">
        <FeaturedDesigns />
      </section>

      <section className="section-full mb-16 lg:mb-32">
        <div className="container flex flex-col lg:flex-row gap-8 md:gap-10 xl:gap-32 items-center">
          <div className="w-full lg:w-1/2">
            <Image
              src={designsGridImg || fallbackImg}
              alt={`Hero dashboard web app layoutloom image`}
              className="w-full h-full object-cover mx-auto origin-top rounded-xl"
              width="0"
              height="0"
              sizes="100%"
              priority={true}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <span className="text-blue-750 dark:text-blue-200 uppercase">
              Get Inspired
            </span>
            <h2 className="mb-4 text-xl md:text-3xl lg:text-5xl font-bold leading-tight mt-2">
              Search for the Designs You Like
            </h2>
            <p className="text-xl max-w-3xl mt-6 line leading-10 mb-10">
              Visualize, Innovate, Experiment, Implement: Transform inspiration
              into reality with our selectively assembled set of website designs
              tailored to fuel your creative projects.
            </p>
            <Link href="/join/sign-up" className="btn-primary">
              Get started
            </Link>
          </div>
        </div>
      </section>

      <section className="section-full mb-16 lg:mb-32">
        <div className="container flex flex-col-reverse lg:flex-row gap-8 md:gap-10 xl:gap-32 items-center">
          <div className="w-full lg:w-1/2">
            <span className="text-blue-750 dark:text-blue-200 uppercase">
              Browse & Bookmark Favorites
            </span>
            <h2 className="mb-4 text-xl md:text-3xl lg:text-5xl font-bold leading-tight mt-2">
              Save for Later Access
            </h2>
            <p className="text-xl max-w-3xl mt-6 line leading-10">
              Whether you&apos;re drawn to sleek minimalist layouts or vibrant
              and bold designs, simply click the &apos;Save&apos; button to add
              your favorite designs to your collection.
            </p>
            <p className="text-xl max-w-3xl mt-6 line leading-10 mb-10">
              Create multiple collections to categorize and manage your saved
              designs with ease.
            </p>
            <Link href="/join/sign-up" className="btn-primary">
              Get started
            </Link>
          </div>
          <div className="w-full lg:w-1/2">
            <Image
              src={collectionsMenuImg || fallbackImg}
              alt={`Hero dashboard web app layoutloom image`}
              className="w-full h-full object-cover mx-auto origin-top rounded-xl"
              width="0"
              height="0"
              sizes="100%"
              priority={true}
            />
          </div>
        </div>
      </section>

      <section className="section-full px-5 mb-16 lg:mb-32">
        <div className="text-center w-full max-w-5xl mx-auto">
          <span className="top-title">IGNITE YOUR CREATIVE SPARK</span>
          <h2 className="mb-4 font-bold text-2xl md:text-5xl leading-tight xl:leading-tight lg:text-6xl text-center mt-6">
            Ready to curate your own gallery of ideas?
          </h2>
          <p className="text-lg lg:text-2xl mt-5 mb-10">
            Start saving and organizing your favorite designs today!
          </p>
          <Link
            href="/designs/home-pages"
            className="big-btn-primary w-44 mx-auto"
          >
            Get started
          </Link>
        </div>
      </section>
    </div>
  )
}

HomePage.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>
}