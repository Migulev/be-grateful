import { Profile } from './types'

const getProfileDisplayName = (profile: Profile) => {
  if (profile.userName) return profile.userName
  if (profile.userName === '') return profile.email
  if (profile.name) return profile.name
  return profile.email
}

export const getProfileLetters = (profile: Profile) => {
  const displayName = getProfileDisplayName(profile)

  const [a, b] = displayName.split('@')[0].split(/\.|\s|-|_/)

  if (!b) {
    return `${a[0]?.toUpperCase() ?? ''}${a[1]?.toUpperCase() ?? ''}`
  }

  return `${a[0]?.toUpperCase() ?? ''}${b[0]?.toUpperCase() ?? ''}`
}
