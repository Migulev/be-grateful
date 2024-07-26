import { fireEvent, render, screen } from '@testing-library/react'
import { Mock } from 'vitest'

import { useStrictContext } from '@/shared/utils'

import { MobileViewDeleteButton } from '../ui/mobile-view-delete-button'

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

describe('MobileViewDeleteButton', () => {
  test('renders the MobileViewDeleteButton and handles delete action', () => {
    ;(useStrictContext as Mock).mockReturnValue({ isTouchScreen: true })
    const mockOnDelete = vitest.fn()

    render(<MobileViewDeleteButton onDelete={mockOnDelete} />)

    const ellipsisButton = screen.getByRole('mobile-view-delete-button')
    expect(ellipsisButton).toBeInTheDocument()

    fireEvent.click(ellipsisButton)

    const deleteButton = screen.getByRole('x-delete-button')
    expect(deleteButton).toBeInTheDocument()

    fireEvent.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalledTimes(1)
  })
})
