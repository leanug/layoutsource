import { DateTime } from 'luxon'
import Image from 'next/image'

import fallbackImg from '@/assets/images/avatar.svg'

export function Info({ user }) {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
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
      <h3 className="text-2xl font-semibold mb-2">{user.username}</h3>
      <h4 className="text-lg text-gray-600 mb-4">{user.email}</h4>
      <p className="text-gray-500">
        Member since:
        {DateTime.fromISO(user.createdAt, { locale: 'en' }).toFormat('DDD')}
      </p>
    </div>
  )
}

