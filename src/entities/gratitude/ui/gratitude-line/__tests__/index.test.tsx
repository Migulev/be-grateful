import { render, screen } from '@testing-library/react'
import { type Mock } from 'vitest'

import { customTextMatcher, useStrictContext } from '@/shared/utils'

import { GratitudeLine } from '../index'

vitest.mock('@/shared/utils', async importOriginal => {
  const actual = await importOriginal()
  if (typeof actual === 'object' && actual !== null) {
    return {
      ...actual,
      useStrictContext: vitest.fn(),
    }
  }
  return {
    useStrictContext: vitest.fn(),
  }
})

describe('GratitudeLine', () => {
  beforeEach(() => {
    ;(useStrictContext as Mock).mockReturnValue({ isTouchScreen: false })
  })

  it('renders the title correctly', () => {
    render(
      <GratitudeLine
        title="Test Title"
        onDelete={() => {}}
      />,
    )
    expect(
      screen.getByText(customTextMatcher('-  Test Title')),
    ).toBeInTheDocument()
  })

  it('applies optimistic styles when isOptimistic is true', () => {
    const { container } = render(
      <GratitudeLine
        title="Test Title"
        onDelete={() => {}}
        isOptimistic
      />,
    )
    expect(container.firstChild).toHaveClass('opacity-50')
  })

  it('applies duration-700 class when optimisticDuration is 700', () => {
    const { container } = render(
      <GratitudeLine
        title="Test Title"
        onDelete={() => {}}
        optimisticDuration={700}
      />,
    )
    expect(container.firstChild).toHaveClass('duration-700')
  })

  it('renders the BrowserViewDeleteButton', () => {
    render(
      <GratitudeLine
        title="Test Title"
        onDelete={() => {}}
      />,
    )
    expect(screen.getByTestId('browser-view-delete-button')).toBeInTheDocument()
  })

  it('renders the MobileViewDeleteButton', () => {
    ;(useStrictContext as Mock).mockReturnValue({ isTouchScreen: true })
    render(
      <GratitudeLine
        title="Test Title"
        onDelete={() => {}}
      />,
    )
    expect(screen.getByTestId('mobile-view-delete-button')).toBeInTheDocument()
  })
})
