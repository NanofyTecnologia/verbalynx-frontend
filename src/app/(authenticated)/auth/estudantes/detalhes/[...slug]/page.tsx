import { Metadata } from 'next'
import Content from './content'

export const metadata: Metadata = {
  title: 'Perfil do estudante',
}

export default function Page() {
  return <Content />
}
