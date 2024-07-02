import { z } from 'zod'

import { supabase } from '@/shared/libs/supabase'

const sessionDtoSchema = z.object({
  id: z.string(),
  avatar_url: z.string().default(''),
  email: z.string(),
  name: z.string().default(''),
})
type SessionDto = z.infer<typeof sessionDtoSchema>

export const authApi = {
  getSession: async (): Promise<SessionDto | undefined> => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error) {
      throw new Error()
    }

    const validation = sessionDtoSchema.safeParse({
      id: user?.id,
      ...user?.user_metadata,
    })

    if (validation.error) {
      throw new Error()
    }

    return validation.data as SessionDto
  },

  updateName: async (name: string) => {
    const { data: updatedUser, error } = await supabase.auth.updateUser({
      data: { name },
    })
    if (error) {
      throw new Error()
    }
    return updatedUser
  },

  updateAvatarUrl: async (avatar_url: string) => {
    const { data: updatedUser, error } = await supabase.auth.updateUser({
      data: { avatar_url },
    })
    if (error) {
      throw new Error()
    }
    return updatedUser
  },

  logInWithOtp: async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: { emailRedirectTo: window.location.origin },
    })
    if (error) {
      throw new Error()
    }
    return
  },

  logInWithGoogle: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
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
