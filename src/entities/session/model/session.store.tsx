import { z } from 'zod'
import { create } from 'zustand'

import { supabase } from '@/shared/libs/supabase'

const sessionSchema = z.object({ email: z.string() })
type Session = z.infer<typeof sessionSchema>

type SessionStore = {
  session?: Session
  loadSession: () => Promise<void>
}

export const useSession = create<SessionStore>(set => ({
  session: undefined,
  loadSession: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const newSession = { email: user?.email }

    const result = sessionSchema.safeParse(newSession)
    if (result.success) {
      set({ session: result.data })
    } else {
      // !later: error
      result.error
    }
  },
}))
