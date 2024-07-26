import { act, renderHook } from '@testing-library/react'

import { MAX_GRATITUDE_TEXT_LENGTH } from '@/entities/gratitude/model/rules'
import { toastError } from '@/shared/libs/toast'

import useGratitudeInput from '../model/use-gratitude-input'

vitest.mock('@/shared/libs/toast', () => ({
  toastError: vitest.fn(),
}))

describe('useGratitudeInput', () => {
  it('should return an object with correct properties', () => {
    const { result } = renderHook(() => useGratitudeInput(vitest.fn()))

    expectTypeOf(result.current.onInputChange).toBeFunction()
  })
})

describe('onInputChange', () => {
  const setGratitude = vitest.fn()
  afterEach(() => {
    vitest.clearAllMocks()
  })
  it('should call setGratitude', () => {
    const { result } = renderHook(() => useGratitudeInput(setGratitude))
    const event = {
      target: { value: 'Valid input' },
    } as React.ChangeEvent<HTMLTextAreaElement>

    act(() => {
      result.current.onInputChange(event)
    })

    expect(setGratitude).toHaveBeenCalledWith('Valid input')
    expect(toastError).not.toHaveBeenCalled()
  })

  it('should call toastError', () => {
    const { result } = renderHook(() => useGratitudeInput(setGratitude))
    const event = {
      target: { value: 'a'.repeat(MAX_GRATITUDE_TEXT_LENGTH + 1) },
    } as React.ChangeEvent<HTMLTextAreaElement>

    act(() => {
      result.current.onInputChange(event)
    })

    expect(setGratitude).not.toHaveBeenCalled()
    expect(toastError).toHaveBeenCalledWith(
      `${MAX_GRATITUDE_TEXT_LENGTH} символов максимум`,
    )
  })
})
