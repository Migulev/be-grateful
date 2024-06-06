import { useState } from 'react'

import { Button } from '@/shared/components/ui/button'

import { SingInModal } from './sign-in-modal'

export const SignInButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // !todo: receive ui component through props and render
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
