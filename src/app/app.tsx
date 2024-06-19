import { Home } from '@/pages/home'
import { Topbar } from '@/widgets/topbar'

import { AppProviders } from './app-providers'

function App() {
  return (
    <AppProviders>
      {/* !dev: color hardcode */}
      <div className="h-screen overflow-auto bg-gradient-to-r from-cyan-500/90 to-blue-500/90 pb-4 font-app">
        <Topbar />
        <Home />
      </div>
    </AppProviders>
  )
}

export default App
