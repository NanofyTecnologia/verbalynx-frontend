import { type PropsWithChildren } from 'react'

import Header from './_components/header'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen flex-col bg-[#F2F2F2]">
      <Header />

      <div className="p-4">{children}</div>
    </div>
  )
}
