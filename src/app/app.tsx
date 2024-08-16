import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'

import { Home } from '@/pages/home'
import { GreetingToast } from '@/features/greeting-toast'
import { PoopUpToasts } from '@/features/poop-up-toasts'
import { GlobalSpinner } from '@/shared/components/global-spinner'
import { ROUTER_PATHS } from '@/shared/constants'

import { AppLoader } from './app-loader'
import { AppLayout } from './layouts/app-layout'
import { ProtectedLayout } from './layouts/protected-layout'
import { AppProviders } from './providers'

const router = createBrowserRouter([
  {
    element: (
      <AppProviders>
        <AppLoader>
          <AppLayout />
          <PoopUpToasts />
          <GreetingToast />
        </AppLoader>
      </AppProviders>
    ),
    children: [
      { path: ROUTER_PATHS.HOME, element: <Home /> },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: ROUTER_PATHS.STATS,
            lazy: async () => {
              const { Stats } = await import('@/pages/stats')
              return { Component: Stats }
            },
          },
        ],
      },
    ],
  },
  {
    path: '*',
    loader: () => redirect(ROUTER_PATHS.HOME),
  },
])

function App() {
  return (
    <>
      <RouterProvider
        router={router}
        fallbackElement={<GlobalSpinner />}
      />
    </>
  )
}

export default App
