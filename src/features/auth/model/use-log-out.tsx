import { useInvalidateSession } from '@/entities/session'
import { authApi } from '@/shared/api/auth'

export const useLogOut = () => {
  const invalidateSession = useInvalidateSession()

  const logOut = async () => {
    await authApi.logOut()
    await invalidateSession()
  }
  return logOut
}
