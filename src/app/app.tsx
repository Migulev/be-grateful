import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'

import { Home } from '@/pages/home'
import { GreetingToast } from '@/features/greeting-toast'
import { PoopUpToasts } from '@/features/poop-up-toasts'
import { ROUTER_PATHS } from '@/shared/constants'

import { AppLoader } from './app-loader'
import { AppLayout } from './layouts/app-layout'
import { AppProviders } from './providers'

const router = createBrowserRouter([
  {
    path: '/',
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
        path: ROUTER_PATHS.STATS,
        lazy: async () => {
          const { Stats } = await import('@/pages/stats')
          return { Component: Stats }
        },
      },
    ],
  },
  {
    path: '*',
    loader: () => redirect('/'),
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
