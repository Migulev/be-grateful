import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'

import { useSession } from '../model/use-session'

vitest.mock('../queries', () => ({
  sessionQuery: vitest.fn(() => ({
    queryKey: ['session'],
    queryFn: async () => ({
      id: '1',
      email: 'example@example.com',
      name: 'John Doe',
      userName: undefined,
      userAvatarUrl: undefined,
      avatarUrl: 'example.com/avatar',
    }),
  })),
}))

export const useTestQueryClient = () => {
  const queryClient = new QueryClient()
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  return { queryClient, wrapper }
}

describe('useSession', () => {
  it('should return session data', async () => {
    const { wrapper } = useTestQueryClient()
    const { result } = renderHook(() => useSession(), { wrapper })

    await waitFor(() => result.current !== undefined)

    expect(result.current).toEqual({
      id: '1',
      email: 'example@example.com',
      name: 'John Doe',
      userName: undefined,
      userAvatarUrl: undefined,
      avatarUrl: 'example.com/avatar',
    })
  })
})
