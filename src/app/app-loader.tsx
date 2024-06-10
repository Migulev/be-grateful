import { ReactNode, useEffect, useState } from 'react'

import { sessionQuery } from '@/entities/session'
import { queryClient } from '@/shared/libs/tanstack-query'

export function AppLoader({ children }: { children?: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    Promise.all([
      queryClient.prefetchQuery({
        ...sessionQuery(),
      }),
    ]).finally(() => {
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return null
  }

  return <>{children}</>
}
