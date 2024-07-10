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
        {/* !dev: color hardcode */}
        <div className="h-screen overflow-auto bg-gradient-to-r from-bgMainLeft to-bgMainRight pb-4 font-app">
          <Topbar />
          <Home />
        </div>
        {/* <PoopUpToasts /> */}
        {/* <GreetingToast /> */}
      </AppLoader>
    </AppProviders>
  )
}

export default App
