import { type PropsWithChildren } from 'react'

import Header from './_components/header'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen flex-col">
      <Header />

      <div className="flex-1 bg-[#F2F2F2] p-4">{children}</div>
    </div>
  )
}
