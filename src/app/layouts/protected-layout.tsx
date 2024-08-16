import { Navigate, Outlet } from 'react-router-dom'

import { useSession } from '@/entities/session'

export const ProtectedLayout = () => {
  const session = useSession()

  return session ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate
      to="/"
      replace
    />
  )
}
