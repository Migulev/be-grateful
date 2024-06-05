import { useState } from 'react'

import { Button } from '@/shared/components/ui/button'

import { SingInModal } from './sign-in-modal'

export const SignInButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>sign in</Button>
      <SingInModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </>
  )
}
