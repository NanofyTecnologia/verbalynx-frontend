import { type PropsWithChildren } from 'react'

import { NextAuthProvider } from './next-auth'
import { ReactQueryProvider } from './react-query'
import { ToastProvider } from './react-toast'

export function Providers({ children }: PropsWithChildren) {
  return (
    <NextAuthProvider>
      <ReactQueryProvider>
        {children}
        <ToastProvider />
      </ReactQueryProvider>
    </NextAuthProvider>
  )
}
