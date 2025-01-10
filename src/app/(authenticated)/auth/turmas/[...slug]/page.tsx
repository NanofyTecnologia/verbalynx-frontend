import { type Metadata } from 'next'
import Content from './content'

export interface IParams {
  [key: string]: string[]
}

export const metadata: Metadata = {
  title: 'Alunos',
}

export default function Page() {
  return <Content />
}
