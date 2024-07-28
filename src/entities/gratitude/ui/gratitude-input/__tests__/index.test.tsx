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

  const mockGratitude = 'Test gratitude'

  it('renders placeholder correctly and prefix "-" ', async () => {
    render(
      <GratitudeInput
        onCreateAsync={onCreateAsyncMock}
        isAuthorized={true}
      />,
    )

    const form = screen.getByRole('form')
    const textarea = screen.getByRole('textbox')

    expect(within(form).getByText('-')).matchSnapshot()
    expect(textarea).toHaveAttribute('placeholder', '...')

    await act(async () => {
      await userEvent.type(textarea, mockGratitude)
    })

    const textareaAfterType = await screen.findByDisplayValue(mockGratitude)
    expect(textareaAfterType).matchSnapshot()
  })

  it('handles Enter key press', async () => {
    render(
      <GratitudeInput
        onCreateAsync={onCreateAsyncMock}
        isAuthorized={true}
      />,
    )

    const form = screen.getByRole('form')
    const textarea = screen.getByRole('textbox')

    await act(async () => {
      await userEvent.type(textarea, mockGratitude)
      fireEvent.keyDown(form, { key: 'Enter' })
    })

    expect(onCreateAsyncMock).toHaveBeenCalledWith(mockGratitude)
  })
})
