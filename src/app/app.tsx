import { Home } from '@/pages/home'
import { Topbar } from '@/widgets/topbar'
import { GreetingToast } from '@/features/greeting-toast'
import { PoopUpToasts } from '@/features/poop-up-toasts'

import { AppLoader } from './app-loader'
import { AppProviders } from './providers/app-providers'

function App() {
  return (
    <AppProviders>
      <AppLoader>
        <div className="bg-gradient relative h-screen overflow-auto font-app">
          <Topbar />
          <Home />
        </div>
        <PoopUpToasts />
        <GreetingToast />
      </AppLoader>
    </AppProviders>
  )
}

export default App
