'use client'

import { useEffect, useState } from 'react'

import { ArrowUpIcon } from '@heroicons/react/24/solid'

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
      } fixed bottom-5 right-5 btn btn-square`}
      onClick={scrollToTop}
    >
      <ArrowUpIcon className="w-6 h-6" />
    </button>
  )
}
