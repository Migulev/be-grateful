import { Home } from '@/pages/home'
import { Topbar } from '@/widgets/topbar'

import { AppProviders } from './app-providers'

function App() {
  return (
    <>
      <AppProviders>
        {/* !dev: color hardcode */}
        <div className="h-screen w-full bg-gradient-to-r from-cyan-500/90 to-blue-500/90 font-app">
          <Topbar />
          <Home />
        </div>
      </AppProviders>
    </>
  )
}

export default App
