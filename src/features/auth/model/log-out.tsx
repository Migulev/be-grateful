import { useSession } from '@/entities/session'
import { supabase } from '@/shared/libs/supabase'

export const useLogOut = () => {
  const { loadSession } = useSession()

  const logOut = async () => {
    const { error } = await supabase.auth.signOut()
    loadSession()
  }
  return { logOut }
}
