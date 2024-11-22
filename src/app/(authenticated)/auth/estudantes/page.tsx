import { type Metadata } from 'next'

import Content from './content'

export const metadata: Metadata = {
  title: 'Estudantes',
}

export default function Page() {
  return (
    <>
      <div className="text-center">
        <h2 className="text-lg font-semibold">Estudantes</h2>
      </div>

      <Content />
    </>
  )
}
