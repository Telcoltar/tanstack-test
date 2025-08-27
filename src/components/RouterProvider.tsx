'use client'

import { RouterProvider } from '@tanstack/react-router'
import { createAppRouter } from '../router'
import { QueryProvider } from './QueryProvider'

const router = createAppRouter()

export function TanStackRouterProvider() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}
