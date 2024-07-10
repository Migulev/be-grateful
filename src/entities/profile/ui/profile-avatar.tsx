import { Loader } from 'lucide-react'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'
import { cn } from '@/shared/libs/utils'

import { Profile } from '../model/types'
import { getProfileLetters } from '../model/utils'

export const ProfileAvatar = ({
  profile,
  className,
  loading = false,
}: {
  profile?: Profile
  className?: string
  loading?: boolean
}) => {
  if (!profile) {
    return null
  }

  return (
    <Avatar
      className={cn('relative flex items-center justify-center', className)}
    >
      <AvatarImage
        src={profile.userAvatarUrl ?? profile.avatarUrl ?? ''}
        className={cn('object-cover', { 'opacity-20': loading })}
      />
      <AvatarFallback className={cn({ 'opacity-20': loading })}>
        {getProfileLetters(profile)}
      </AvatarFallback>
      {/* !dev: hardcoded color */}
      {loading && (
        <Loader className="text-gray-900 absolute animate-spin-slow" />
      )}
    </Avatar>
  )
}
