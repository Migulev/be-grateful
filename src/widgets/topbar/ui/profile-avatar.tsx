import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'
import { cn } from '@/shared/utils'

import { Profile } from '../model/type'
import { getProfileLetters } from '../model/utils'

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
