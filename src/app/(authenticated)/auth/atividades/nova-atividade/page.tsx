import { type Metadata } from 'next'
import Content from './content'

export const metadata: Metadata = {
  title: 'Nova atividade',
}

export default function Page() {
  return (
    <>
      <Content />
    </>
  )
}
