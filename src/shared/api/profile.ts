import { supabase } from '@/shared/libs/supabase'

type ProfileDto = {
  email: string
  name?: string // this value can come from providers
  avatarUrl?: string // this value can come from providers
  userName?: string // this value user can set in the app
  userAvatarURL?: string // this value user can set in the app
}

export const profileApi = {
  getAvatarStorageNameList: async (userId: string) => {
    const { data, error } = await supabase.storage
      .from('avatars')
      .list(userId + '/')
    if (error) throw new Error()

    return data?.map(avatar => userId + '/' + avatar.name)
  },

  emptyAvatarStorage: async (avatarList: string[]) => {
    const { error } = await supabase.storage.from('avatars').remove(avatarList)
    if (error) {
      if (error.message !== 'body/prefixes must NOT have fewer than 1 items')
        throw new Error()
    }
  },

  uploadAvatar: async (userId: string, file: File) => {
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(userId + '/' + file.name, file)
    if (error) throw new Error()

    return data
  },

  updateName: async (userName: ProfileDto['userName']) => {
    const { data: updatedUser, error } = await supabase.auth.updateUser({
      data: { userName },
    })
    if (error) {
      throw new Error()
    }
    return updatedUser
  },

  updateAvatarUrl: async (userAvatarUrl: ProfileDto['userAvatarURL']) => {
    const { data: updatedUser, error } = await supabase.auth.updateUser({
      data: { userAvatarUrl },
    })
    if (error) {
      throw new Error()
    }
    return updatedUser
  },
}
