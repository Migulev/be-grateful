import { supabase } from '@/shared/libs/supabase'

import { SupabaseError } from '../libs/errors'

export const authApi = {
  getSession: async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error) throw new SupabaseError()

    return { id: user?.id, ...user?.user_metadata }
  },

  logInWithOtp: async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: { emailRedirectTo: window.location.origin },
    })
    if (error) throw new SupabaseError()
    return
  },

  logInWithGoogle: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
    if (error) throw new SupabaseError()
    return
  },

  logOut: async () => {
    const { error } = await supabase.auth.signOut({ scope: 'local' })

    if (error) throw new SupabaseError()
    return true
  },
}
