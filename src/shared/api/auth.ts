import { supabase } from '@/shared/libs/supabase'

export const authApi = {
  getSession: async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error) {
      throw new Error()
    }

    if (user?.user_metadata) {
      return user?.user_metadata
    }

    return
  },

  updateName: async (name: string) => {
    const { data, error } = await supabase.auth.updateUser({ data: { name } })
    if (error) {
      throw new Error()
    }
    return data
  },

  updateAvatarUrl: async (avatarUrl: string) => {
    await supabase.auth.updateUser({ data: { avatarUrl } })
  },

  logInWithOtp: async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({ email: email })
    if (error) {
      throw new Error()
    }
    return
  },

  logInWithGoogle: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) {
      throw new Error()
    }
    return
  },

  logOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error()
    }
    return true
  },
}
