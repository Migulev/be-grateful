import { Profile } from './type'

const getProfileDisplayName = (profile: Profile) => {
  return profile.name ? profile.name : profile.email
}

export const getProfileLetters = (profile: Profile) => {
  const displayName = getProfileDisplayName(profile)

  const [a, b] = displayName.split('@')[0].split(/\.|\s|-|_/)

  if (!b) {
    return `${a[0]?.toUpperCase() ?? ''}${a[1]?.toUpperCase() ?? ''}`
  }

  return `${a[0]?.toUpperCase() ?? ''}${b[0]?.toUpperCase() ?? ''}`
}
