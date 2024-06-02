import { ReactNode } from 'react'

export const UiTopbar = ({
  logo,
  theme,
  auth,
}: {
  logo: ReactNode
  theme: ReactNode
  auth: ReactNode
}) => {
  return (
    <nav className="container flex items-center justify-between px-8 py-8 md:px-10 md:py-10 lg:px-16 lg:py-16">
      {logo}
      <div className="flex gap-4">
        {theme}
        {auth}
      </div>
    </nav>
  )
}
