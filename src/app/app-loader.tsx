import { ReactNode, useEffect, useState } from 'react'

import { useSession } from '@/entities/session'

export function AppLoader({ children }: { children?: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  const { loadSession } = useSession()

  useEffect(() => {
    setIsLoading(true)

    Promise.all([loadSession()]).finally(() => {
      setIsLoading(false)
    })
  }, [loadSession])

  if (isLoading) {
    return null
  }

  return <>{children}</>
}
