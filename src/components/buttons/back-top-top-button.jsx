'use client'

import { useEffect, useState } from 'react'

import { ArrowTop } from '@/components'

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      className={`${
        isVisible ? 'block' : 'hidden'
      } fixed bottom-5 right-5 p-3 bg-gray-400 rounded-full text-white hover:bg-gray-500 transition-all duration-300`}
      onClick={scrollToTop}
    >
      <ArrowTop className="w-6 h-6 fill-white" />
    </button>
  )
}
