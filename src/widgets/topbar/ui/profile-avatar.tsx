import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'
import { cn } from '@/shared/utils'

import { getProfileLetters } from '../utils'

export type Profile = {
  email: string
  name?: string | null
  image?: string | null
}

export const ProfileAvatar = ({
  profile,
  className,
}: {
  profile?: Profile
  className?: string
}) => {
  if (!profile) {
    return null
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage
        src={profile.image ?? ''}
        className="object-cover"
      />
      <AvatarFallback>{getProfileLetters(profile)}</AvatarFallback>
    </Avatar>
  )
}
