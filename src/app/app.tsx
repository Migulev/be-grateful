import { ThemeButton } from '@/features/theme/theme-button'
import { Home } from '@/pages/home'
import { UiTopbar } from '@/shared/ui/layouts/ui-topbar'
import { Logo } from '@/shared/ui/Logo'

import { AppLoader } from './app-loader'
import { AppProviders } from './app-providers'

function App() {
  return (
    <div className="h-screen w-full bg-gradient-to-r from-cyan-500/90 to-blue-500/90 font-app">
      <AppProviders>
        <AppLoader>
          <UiTopbar
            logo={<Logo />}
            theme={<ThemeButton />}
            auth={<div>auth</div>}
          />
          <Home />
        </AppLoader>
      </AppProviders>
    </div>
  )
}

export default App
