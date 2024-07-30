import { FormEvent } from 'react'

import { renderHook } from '@testing-library/react'

import useHandleSubmit from '../model/use-handle-submit'

const setIsOpenAuthModalMock = vitest.fn()
vitest.mock('@/shared/libs/context/auth-modal-context', () => ({
  useAuthModal: vitest.fn(() => ({
    setIsOpenAuthModal: setIsOpenAuthModalMock,
  })),
}))

describe('useHandleSubmit', () => {
  it('should return an object with correct properties', () => {
    const { result } = renderHook(() =>
      useHandleSubmit(true, '', vitest.fn(), vitest.fn()),
    )

    expect(result.current).toHaveProperty('handleSubmit')
  })

  it('should call setIsOpenAuthModal when isAuthorized is false', () => {
    const { result } = renderHook(() =>
      useHandleSubmit(false, '', vitest.fn(), vitest.fn()),
    )

    result.current.handleSubmit(mockEvent)

    expect(setIsOpenAuthModalMock).toHaveBeenCalledTimes(1)
  })

  it('should call onCreateAsync and setGratitude when isAuthorized is true and gratitude is not empty', async () => {
    const onCreateAsyncMock = vitest.fn()
    const setGratitudeMock = vitest.fn()
    const { result } = renderHook(() =>
      useHandleSubmit(true, 'gratitude', onCreateAsyncMock, setGratitudeMock),
    )

    await result.current.handleSubmit(mockEvent)

    expect(onCreateAsyncMock).toHaveBeenCalledTimes(1)
    expect(setGratitudeMock).toHaveBeenCalledTimes(1)
  })
})

export const mockEvent = {
  preventDefault: vitest.fn(),
  nativeEvent: {
    bubbles: false,
    cancelBubble: false,
    cancelable: false,
    composed: false,
    currentTarget: {} as EventTarget,
    defaultPrevented: false,
    eventPhase: 0,
    isTrusted: true,
    returnValue: true,
    srcElement: null,
    target: {} as EventTarget,
    timeStamp: Date.now(),
    type: 'submit',
  },
  currentTarget: {} as EventTarget & HTMLFormElement,
  target: {} as EventTarget,
  bubbles: false,
  cancelable: false,
  defaultPrevented: false,
  eventPhase: 0,
  isTrusted: true,
  stopPropagation: vitest.fn(),
  isDefaultPrevented: vitest.fn(),
  isPropagationStopped: vitest.fn(),
  persist: vitest.fn(),
  timeStamp: Date.now(),
  type: 'submit',
} as unknown as FormEvent<HTMLFormElement>
