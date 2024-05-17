'use client'

import React, { useEffect } from 'react'

import { useFetchLikedDesignsData, loading } from '@/hooks'
import {
  useFetchLikedDesigns,
} from '@/hooks'
import {
  Collections,
} from '@/containers'
import {
  DisplayDesigns,
  LoadMore,
  NoResults,
  DesignCard,
  DesignInfo,
  LoadingIndicator,
  DesignImage,
  LikeDesignButton,
  CollectionsToggleButton,
  ProfileHeader,
  ProfileNav,
} from '@/components'
import { useUserStore } from '@/store'

function Settings() {

  const { user } = useUserStore()

  return (
    <>
      <ProfileHeader user={user} />

      <div className="w-full h-8"></div>

      <ProfileNav username={user.username} />
    </>
  )
}

export default Settings
