import { type Metadata } from 'next'

import Content from './content'

export const metadata: Metadata = {
  title: 'Ver Entregas',
}

export default function Page() {
  return <Content />
}
