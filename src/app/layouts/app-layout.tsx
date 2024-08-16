import { Suspense } from 'react'

import { Outlet } from 'react-router-dom'

import { Topbar } from '@/widgets/topbar'
import { GlobalSpinner } from '@/shared/components/global-spinner'

export const AppLayout = () => {
  return (
    <div className="bg-gradient relative h-screen overflow-auto font-app">
      <div className="container">
        <Topbar />
        <Suspense fallback={<GlobalSpinner />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}
