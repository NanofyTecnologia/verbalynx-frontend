import { type Metadata } from 'next'

import Content from './content'

export const metadata: Metadata = {
  title: 'Atividades',
}

export default function Page() {
  return (
    <>
      <div className="text-center">
        <h2 className="text-lg font-semibold">Atividades</h2>
      </div>

      <Content />
    </>
  )
}
