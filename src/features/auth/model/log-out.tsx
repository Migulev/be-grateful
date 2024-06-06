import { useSession } from '@/entities/session'
import { supabase } from '@/shared/libs/supabase'

export const useLogOut = () => {
  const { loadSession } = useSession()

  const logOut = async () => {
    // !todo: error handler
    const { error } = await supabase.auth.signOut()
    loadSession()
  }
  return { logOut }
}
