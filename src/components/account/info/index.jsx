import Image from 'next/image'

import fallbackImg from '@/assets/images/avatar.svg'

export function Info({ user }) {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      {/* User profile image */}
      <div className="w-32 h-32 rounded-full overflow-hidden mb-6">
        <Image
          src={user.avatar?.url || fallbackImg}
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
        <h1 className="text-3xl font-semibold mb-2 text-gray-700 dark:text-gray-100">
          {user.name}
        </h1>
      ) : null}
      {/* End Name */}

      {/* UserName */}
      <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-100">
        @{user.username}
      </h3>
      {/* End UserName */}
    </div>
  )
}
