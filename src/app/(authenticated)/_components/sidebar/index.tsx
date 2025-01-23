'use client'

import Image from 'next/image'
import { Fragment } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { links } from '@/data/links'
import { useIsMobile } from '@/hooks/use-mobile'
import Logo from '@/assets/images/verbalynx-logo.png'

import Link from '../active-link'

export function Sidebar() {
  const { data: session } = useSession()
  const isMobile = useIsMobile()

  if (isMobile) return <></>

  return (
    <>
      <div className="flex w-64 flex-col border-e bg-white">
        <div className="flex h-[63px] items-center justify-center p-4">
          <Image width={128} src={Logo} alt="verbalynx logo" />
        </div>

        <div className="border-t px-4 py-4 text-center">
          <h3 className="font-semibold">Menu de Navegação</h3>
        </div>

        <div className="space-y-4 px-4">
          {session &&
            links
              .filter((item) => item.roles.includes(String(session.user.role)))
              .map((item, index) => (
                <Fragment key={index}>
                  <Link href={item.href}>
                    {item.icon}
                    {item.label}
                  </Link>
                </Fragment>
              ))}
        </div>

        <div className="mt-auto w-full space-y-4 p-4">
          <Link href="/auth/perfil" className="relative w-full">
            <User />
            Meu Perfil
          </Link>

          <Button
            className="w-full"
            variant="destructive"
            onClick={() => signOut()}
          >
            Desconectar
          </Button>
        </div>
      </div>
    </>
  )
}
