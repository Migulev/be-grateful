import { supabase } from '@/shared/libs/supabase'

type SessionDto = {
  email: string
}

export const authApi = {
  getSession: async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error) {
      throw new Error()
    }

    if (user?.email) {
      return { email: user?.email } as SessionDto
    }

    return
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
