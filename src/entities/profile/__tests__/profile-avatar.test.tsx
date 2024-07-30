import { render } from '@testing-library/react'

import { ProfileAvatar } from '../ui/profile-avatar'

describe('ProfileAvatar', () => {
  it('should render the avatar image if profile is provided', () => {
    const profile = {
      email: 'example@example.com',
      userAvatarUrl: 'https://example.com/avatar.jpg',
      avatarUrl: '',
    }

    const { getByAltText } = render(<ProfileAvatar profile={profile} />)

    const avatarImage = getByAltText('Profile Avatar')
    expect(avatarImage).toBeInTheDocument()
    expect(avatarImage).toHaveAttribute('src', profile.userAvatarUrl)
  })

  it('should render the fallback letters if profile is provided but avatar image is not available', () => {
    const profile = {
      email: 'jo.doe@example.com',
      userAvatarUrl: '',
      avatarUrl: '',
    }

    const { getByText } = render(<ProfileAvatar profile={profile} />)

    const fallbackLetters = getByText('JD') // Assuming the profile name is 'John Doe'
    expect(fallbackLetters).toBeInTheDocument()
  })

  it('should not render anything if profile is not provided', () => {
    const { container } = render(<ProfileAvatar />)

    expect(container.firstChild).toBeNull()
  })

  it('should show a loader when loading prop is true', () => {
    const profile = {
      email: 'jo.doe@example.com',
      avatarUrl: '',
    }

    const { getByRole } = render(
      <ProfileAvatar
        profile={profile}
        loading={true}
      />,
    )

    const loader = getByRole('loader')
    expect(loader).toBeInTheDocument()
  })
})
