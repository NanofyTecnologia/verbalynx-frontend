import Link from 'next/link'
import Image from 'next/image'
import { type Metadata } from 'next'

import VerbalynxLogo from '@/assets/images/verbalynx-logo.png'

import SignIn from './sign-in'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Home() {
  return (
    <>
      <main className="flex h-screen w-full flex-col items-center justify-center gap-6 px-6 sm:mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
        <Image src={VerbalynxLogo} alt="verbalynx logo" />

        <SignIn />

        <div className="text-sm font-medium">
          <Link className="text-xs hover:underline" href="/termos-e-condicoes">
            Termos de uso
          </Link>{' '}
          <span>e</span>{' '}
          <Link className="text-xs hover:underline" href="/termos-e-condicoes">
            Politica de privacidade
          </Link>
        </div>
      </main>
    </>
  )
}
