import { type PropsWithChildren } from 'react'

import Header from './_components/header'
import { Sidebar } from './_components/sidebar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen bg-[#F2F2F2]">
      <Sidebar />

      <div className="flex flex-1 flex-col bg-[#F2F2F2]">
        <Header />

        <div className="flex p-4">
          <div className="mx-auto w-full md:max-w-3xl">{children}</div>
        </div>
      </div>
    </div>
  )
}
