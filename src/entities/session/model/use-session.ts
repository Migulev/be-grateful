import { useQuery } from '@tanstack/react-query'

import { sessionQuery } from '../queries'
import { Session } from './types'

export const useSession = (): Session | undefined => {
  const { data: session } = useQuery({
    ...sessionQuery(),
  })

  return session
}
