import { Home } from '@/pages/home'
import { Topbar } from '@/widgets/topbar'

import { AppLoader } from './app-loader'
import { AppProviders } from './providers/app-providers'

function App() {
  return (
    <AppProviders>
      <AppLoader>
        {/* !dev: color hardcode */}
        <div className="h-screen overflow-auto bg-gradient-to-r from-cyan-500/90 to-blue-500/90 pb-4 font-app">
          <Topbar />
          <Home />
        </div>
      </AppLoader>
    </AppProviders>
  )
}

export default App
