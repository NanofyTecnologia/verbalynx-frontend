import { type Metadata } from 'next'

import Content from './content'

export const metadata: Metadata = {
  title: 'Ver Rubricas',
}

export default function Page() {
  return <Content />
}
