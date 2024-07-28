import { useQueryClient } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { Mock, vi } from 'vitest'

import { authApi } from '@/shared/api/auth'
import { ValidationError } from '@/shared/libs/errors'

import { sessionSchema } from '../model/types'
import { sessionQuery, useInvalidateSession, useResetSession } from '../queries'

vi.mock('@tanstack/react-query', async () => ({
  ...(await vi.importActual('@tanstack/react-query')),
  useQueryClient: vi.fn(),
}))

vi.mock('@/shared/api/auth')
vi.mock('../model/types')

describe('sessionQuery', () => {
  it('should return session data when valid', async () => {
    const mockSession = { id: '1', email: 'example@example.com' }
    ;(authApi.getSession as Mock).mockResolvedValue(mockSession)
    ;(sessionSchema.safeParse as Mock).mockReturnValue({
      success: true,
      data: mockSession,
    })

    const queryFn = sessionQuery().queryFn
    const result = await queryFn()

    expect(result).toEqual(mockSession)
  })

  it('should throw ValidationError when session data is invalid', async () => {
    ;(authApi.getSession as Mock).mockResolvedValue({})
    ;(sessionSchema.safeParse as Mock).mockReturnValue({
      success: false,
      error: new Error(),
    })

    const queryFn = sessionQuery().queryFn

    await expect(queryFn()).rejects.toThrow(ValidationError)
  })
})

describe('useInvalidateSession', () => {
  it('should invalidate session queries', () => {
    const invalidateQueries = vitest.fn()
    const queryClient = { invalidateQueries }
    ;(useQueryClient as Mock).mockReturnValue(queryClient)

    const { result } = renderHook(() => useInvalidateSession())
    const invalidateSession = result.current

    invalidateSession()

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: ['session'],
    })
  })
})

describe('useResetSession', () => {
  it('should call resetQueries with the correct queryKey', () => {
    const resetQueries = vi.fn()
    const queryClient = { resetQueries }
    ;(useQueryClient as Mock).mockReturnValue(queryClient)

    const { result } = renderHook(() => useResetSession())
    const resetSession = result.current

    resetSession()

    expect(resetQueries).toHaveBeenCalledWith({
      queryKey: ['session'],
    })
  })
})
