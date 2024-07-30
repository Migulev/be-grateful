import { fireEvent, render, screen } from '@testing-library/react'

import { UploadInputButton } from '../ui/upload-input-button'

describe('UploadInputButton', () => {
  it('should render the button and input', () => {
    render(<UploadInputButton>Upload</UploadInputButton>)

    const buttonElement = screen.getByText('Upload')

    // Check if the button is in the document
    expect(buttonElement).toBeInTheDocument()
  })

  it('should open the file dialog when the button is clicked', () => {
    render(<UploadInputButton>Upload</UploadInputButton>)

    const buttonElement = screen.getByText('Upload')
    const inputElement = screen.getByRole('upload-input')

    const inputClickMock = vitest.spyOn(inputElement, 'click')
    fireEvent.click(buttonElement)

    expect(inputClickMock).toHaveBeenCalled()
  })

  it('should accept .png, .jpeg file types by default', () => {
    render(<UploadInputButton />)

    const inputElement = screen.getByRole('upload-input')

    expect(inputElement).toHaveAttribute('accept', '.png, .jpeg')
  })

  it('should accept custom file types', () => {
    render(<UploadInputButton accept=".pdf" />)

    const inputElement = screen.getByRole('upload-input')

    expect(inputElement).toHaveAttribute('accept', '.pdf')
  })
})
