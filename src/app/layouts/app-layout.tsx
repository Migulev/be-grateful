import { Outlet, useNavigation } from 'react-router-dom'

import { Topbar } from '@/widgets/topbar'
import { GlobalSpinner } from '@/shared/components/global-spinner'

export const AppLayout = () => {
  const navigation = useNavigation()
  return (
    <div className="bg-gradient relative h-screen overflow-auto font-app">
      <div className="container">
        <Topbar />
        <Outlet />
      </div>
      {navigation.state === 'loading' && <GlobalSpinner />}
    </div>
  )
}
