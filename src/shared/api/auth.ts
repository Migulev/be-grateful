import { z } from 'zod'

import { supabase } from '@/shared/libs/supabase'

import { SupabaseError, ValidationError } from '../libs/errors'

const sessionDtoSchema = z.object({
  id: z.string(),
  avatar_url: z.string().default(''),
  email: z.string(),
  name: z.string().default(''),
  userName: z.string().optional(),
  userAvatarUrl: z.string().optional(),
})
type SessionDto = z.infer<typeof sessionDtoSchema>

export const authApi = {
  getSession: async (): Promise<SessionDto | undefined> => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error) throw new SupabaseError()

    const validation = sessionDtoSchema.safeParse({
      id: user?.id,
      ...user?.user_metadata,
    })
    if (validation.error) throw new ValidationError()

    return validation.data as SessionDto
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
