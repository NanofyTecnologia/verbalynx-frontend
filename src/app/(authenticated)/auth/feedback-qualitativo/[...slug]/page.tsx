import { type Metadata } from 'next'
import Content from './content'

export const metadata: Metadata = {
  title: 'Feedback Qualitativo',
}

export default function Page() {
  return <Content />
}
