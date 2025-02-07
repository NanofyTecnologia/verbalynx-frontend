'use client'

import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

import VerbalynxLogo from '@/assets/images/verbalynx-logo.png'

import { useGetUserById } from './_hooks/use-get-user-by-id'

export default function Page() {
  const { replace } = useRouter()

  const { update, data: session } = useSession()
  const { data: user } = useGetUserById()

  const [isLoading, setIsLoading] = useState(true)

  const handleSyncRole = useCallback(async () => {
    console.log('Verificando status')

    if (user) {
      if (user.role === 'PENDING_APPROVAL') {
        setIsLoading(false)
        return
      }

      update({ role: user.role })
      replace('/auth')
    }
  }, [user, update, replace])

  useEffect(() => {
    const interval = setInterval(handleSyncRole, 5000)
    return () => clearInterval(interval)
  }, [handleSyncRole])

  useEffect(() => {
    if (!session) {
      replace('/')
    }
  }, [session, replace])

  return (
    <>
      <main className="flex h-screen w-full flex-col items-center justify-center gap-6 px-6 sm:mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
        <Image src={VerbalynxLogo} alt="verbalynx logo" priority />

        {isLoading && <h1 className="text-center text-lg">Carregando...</h1>}

        {!isLoading && (
          <div className="space-y-6 text-start">
            <h2 className="text-lg font-bold uppercase">
              Aguardando aprovação
            </h2>

            <p className="font-semibold">
              Em breve o seu acesso completo será liberado pelo administrador!
            </p>

            <Button
              size="lg"
              variant="link"
              className="w-full"
              onClick={() => signOut()}
            >
              Desconectar
            </Button>
          </div>
        )}

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
