import { type Metadata } from 'next'
import Content from './content'

export const metadata: Metadata = {
  title: 'Nova turma',
}

export default function Page() {
  return (
    <>
      <Content />
    </>
  )
}
