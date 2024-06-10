import { supabase } from '@/shared/libs/supabase'

type SessionDto = {
  email: string
}

// !later: error handler for all functions

export const authApi = {
  getSession: async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error) {
      //   throw new Error()
    }

    if (user?.email) {
      return { email: user?.email } as SessionDto
    } else {
      // log error
    }
    return null
  },

  logIn: async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({ email: email })
    if (error) {
      //   throw new Error()
    }
    return
  },

  logOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      //   throw new Error()
    }
    return
  },
}
