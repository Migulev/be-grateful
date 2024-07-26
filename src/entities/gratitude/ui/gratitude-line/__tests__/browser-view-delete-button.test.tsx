import { fireEvent, render, screen } from '@testing-library/react'
import { Mock } from 'vitest'

import { useStrictContext } from '@/shared/utils'

import { BrowserViewDeleteButton } from '../ui/browser-view-delete-button'

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

describe('BrowserViewDeleteButton', () => {
  test('renders the MobileViewDeleteButton and handles delete action', () => {
    ;(useStrictContext as Mock).mockReturnValue({ isTouchScreen: false })
    const mockOnDelete = vitest.fn()

    render(<BrowserViewDeleteButton onDelete={mockOnDelete} />)

    const deleteButton = screen.getByRole('x-delete-button')
    expect(deleteButton).toBeInTheDocument()

    fireEvent.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalledTimes(1)
  })
})
