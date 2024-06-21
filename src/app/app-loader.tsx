import { ReactNode, useEffect, useState } from 'react'

export function AppLoader({ children }: { children?: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 0)
  }, [])

  if (isLoading) {
    return null
  }

  return <>{children}</>
}
