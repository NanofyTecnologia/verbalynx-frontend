import { type Metadata } from 'next'

import Content from './content'

export const metadata: Metadata = {
  title: 'Ver rubricas',
}

export default function Page() {
  return <Content />
}
