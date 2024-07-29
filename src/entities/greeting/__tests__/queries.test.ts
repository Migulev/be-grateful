import { Mock } from 'vitest'
import { ZodError } from 'zod'

import { greetingApi } from '@/shared/api/greeting'
import { ValidationError } from '@/shared/libs/errors'
import { getRandomNumber } from '@/shared/utils'

import { greetingQuery } from '../queries'
import { greetingSchema } from '../types'

vi.mock('@/shared/api/greeting')
vi.mock('@/shared/utils')

describe('greetingQuery', () => {
  const mockGreetingsList = [{ title: 'Hello' }, { title: 'Hi' }]
  ;(getRandomNumber as Mock).mockReturnValue(0)
  ;(greetingApi.getGreetingsList as Mock).mockResolvedValue(mockGreetingsList)

  beforeEach(() => {
    vitest.clearAllMocks()
  })

  it('should return a valid greeting', async () => {
    const mockGreeting = mockGreetingsList[0]

    vi.spyOn(greetingSchema, 'safeParse').mockReturnValue({
      success: true,
      data: mockGreeting,
    })

    const query = greetingQuery(true)
    const result = await query.queryFn()

    expect(result).toEqual(mockGreeting)
    expect(greetingApi.getGreetingsList).toHaveBeenCalled()
    expect(getRandomNumber).toHaveBeenCalledWith(
      0,
      mockGreetingsList.length - 1,
    )
    expect(greetingSchema.safeParse).toHaveBeenCalledWith(mockGreeting)
  })

  it('should throw a ValidationError for invalid greeting', async () => {
    vi.spyOn(greetingSchema, 'safeParse').mockReturnValue({
      success: false,
      data: undefined,
      error: new ZodError([]),
    })

    const query = greetingQuery(true)
    await expect(query.queryFn()).rejects.toThrow(ValidationError)
  })

  it('should not call greetingApi.getGreetingsList when isEnabled is false', async () => {
    const query = greetingQuery(false)
    await query.queryFn()

    expect(greetingApi.getGreetingsList).not.toHaveBeenCalled()
  })
})
