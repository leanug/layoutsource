import Image from 'next/image'

import fallbackImg from '@/assets/images/avatar.svg'
import { LoadingIndicator } from '@/components'

export function ProfileHeader({ user }) {
  // Loading
  if (!user)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingIndicator />
      </div>
    )

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      {/* User profile image */}
      <div className="w-32 h-32 rounded-full overflow-hidden mb-6">
        <Image
          src={user?.picture || fallbackImg}
          alt="User Avatar"
          width={'120'}
          height={'120'}
          className="w-full h-full object-cover rounded-full"
          placeholder="empty" // use 'empty' for a blank placeholder
          priority={false}
        />
      </div>
      {/* End User profile image */}

      {/* Name */}
      {user?.name ? (
        <h1 className="text-3xl font-semibold mb-2 ">{user.name}</h1>
      ) : null}
      {/* End Name */}

      {/* UserName */}
      <h3 className="text-md font-semibold mb-2">@{user?.username}</h3>
      {/* End UserName */}

      {/* Name */}
      {user?.bio ? (
        <h1 className="text-3xl font-semibold mb-2 ">{user.bio}</h1>
      ) : null}
      {/* End Name */}

      {/* Name */}
      {user?.location ? (
        <p className="text-3xl font-semibold mb-2 ">{user.location}</p>
      ) : null}
      {/* End Name */}
    </div>
  )
}
