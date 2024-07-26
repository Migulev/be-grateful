import { act, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { GratitudeInput } from '..'

vitest.mock('@/shared/libs/context/auth-modal-context', () => ({
  useAuthModal: vitest.fn(() => ({
    setIsOpenAuthModal: vitest.fn(),
  })),
}))

describe('GratitudeInput', () => {
  const onCreateAsyncMock = vitest.fn()

  it('renders placeholder correctly and prefix "-" ', () => {
    render(
      <GratitudeInput
        onCreateAsync={onCreateAsyncMock}
        isAuthorized={true}
      />,
    )

    const form = screen.getByTestId('form')
    const textarea = screen.getByRole('textbox')

    expect(within(form).getByText('-')).toBeInTheDocument()
    expect(textarea).toHaveAttribute('placeholder', '...')
  })

  it('handles Enter key press', async () => {
    render(
      <GratitudeInput
        onCreateAsync={onCreateAsyncMock}
        isAuthorized={true}
      />,
    )

    const form = screen.getByTestId('form')
    const textarea = screen.getByRole('textbox')
    const result = 'Test gratitude'

    await act(async () => {
      await userEvent.type(textarea, result)
      fireEvent.keyDown(form, { key: 'Enter' })
    })

    expect(onCreateAsyncMock).toHaveBeenCalledWith(result)
  })
})
