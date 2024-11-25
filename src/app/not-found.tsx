import Link from 'next/link'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'

export default async function NotFound() {
  const session = await getServerSession(authOptions)

  const href = session?.user.id ? '/auth' : '/'

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="mx-auto max-w-sm text-center text-xl">
          A página que você está tentando acessar não existe ou foi movida!
        </h1>

        <Link href={href} className="underline">
          Voltar para página inicial
        </Link>
      </div>
    </>
  )
}
