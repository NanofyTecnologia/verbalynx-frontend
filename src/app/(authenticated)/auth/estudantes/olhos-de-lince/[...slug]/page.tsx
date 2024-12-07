import { type Metadata } from 'next'
import Content from './content'

export const metadata: Metadata = {
  title: 'Olhos de Lince',
}

export default function Page() {
  return (
    <>
      <Content />
    </>
  )
}
