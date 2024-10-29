import { type PropsWithChildren } from 'react'

import { NextAuthProvider } from './next-auth'

export function Providers({ children }: PropsWithChildren) {
  return <NextAuthProvider>{children}</NextAuthProvider>
}
