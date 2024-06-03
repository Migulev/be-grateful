import { ReactNode, useEffect, useState } from 'react'

export function AppLoader({ children }: { children?: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    Promise.all([]).finally(() => {
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return null
  }

  return <>{children}</>
}
