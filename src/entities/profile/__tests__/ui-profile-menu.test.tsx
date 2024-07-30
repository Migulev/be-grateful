import { fireEvent, render, screen } from '@testing-library/react'

import { UiProfileMenu } from '../ui/ui-profile-menu'

describe('UiProfileMenu', () => {
  const triggerText = 'Open Menu'
  const options = [
    { label: 'Option 1', onFunc: vitest.fn() },
    { label: 'Option 2', onFunc: vitest.fn() },
  ]
  const lastOption = { label: 'Last Option', onFunc: vitest.fn() }

  it('should render the trigger and options', () => {
    render(
      <UiProfileMenu
        trigger={<button>{triggerText}</button>}
        options={options}
        lastOption={lastOption}
      />,
    )

    const triggerElement = screen.getByText(triggerText)
    expect(triggerElement).toBeInTheDocument()

    fireEvent.click(triggerElement)

    options.forEach(option => {
      const optionElement = screen.getByText(option.label)
      expect(optionElement).toBeInTheDocument()
    })

    const lastOptionElement = screen.getByText(lastOption.label)
    expect(lastOptionElement).toBeInTheDocument()
  })

  it('should call the correct function when an option is clicked', () => {
    render(
      <UiProfileMenu
        trigger={<button>{triggerText}</button>}
        options={options}
        lastOption={lastOption}
      />,
    )

    const triggerElement = screen.getByText(triggerText)
    fireEvent.click(triggerElement)

    options.forEach(option => {
      const optionElement = screen.getByText(option.label)
      fireEvent.click(optionElement)
      expect(option.onFunc).toHaveBeenCalled()
    })

    const lastOptionElement = screen.getByText(lastOption.label)
    fireEvent.click(lastOptionElement)
    expect(lastOption.onFunc).toHaveBeenCalled()
  })
})
