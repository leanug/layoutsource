import React, { useState, useCallback } from 'react';

/* import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useAuth, useFetchLikedDesigns } from '@/hooks'
import { LikedDesigns } from '@/api'
import { useDarkModeStore } from '@/store' */

import HeaderFull from '@/components/layout/header-full'

const SuperButton = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}

/*
 * Layout component for logged in users
 */
export const TestLayout = () => {
  console.count('TestLayout')
  
  
  // User is logged in
  return (
    <div className={`relative}`}>
      <HeaderFull />
      <SuperButton />
    </div> 
  )
} 
