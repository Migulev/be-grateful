import { FormEvent } from 'react'

export const customTextMatcher =
  (text: string) => (_: unknown, element: Element | null) => {
    const hasText = (node: Element | null) => node?.textContent === text
    const nodeHasText = hasText(element)
    const childrenDontHaveText = Array.from(element?.children || []).every(
      child => !hasText(child),
    )
    return nodeHasText && childrenDontHaveText
  }

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
