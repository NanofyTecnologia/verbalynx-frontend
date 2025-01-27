'use client'

import Image from 'next/image'
import { Fragment, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { User, Menu, CircleAlert, UserCircle } from 'lucide-react'

import { Sheet } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Tooltip } from '@/components/ui/tooltip'

import { links } from '@/data/links'
import { env } from '@/lib/env/index.mjs'
import Logo from '@/assets/images/verbalynx-logo.png'
import { useIsMobile } from '@/hooks/use-mobile'
import { useGetUser } from '@/hooks/services/use-get-user'

import Link from '../active-link'

export default function Header() {
  const { data: session, update } = useSession()
  const { data: user } = useGetUser()
  const isMobile = useIsMobile()

  const [showSheet, setShowSheet] = useState(false)

  const userDataIsCompleted = () => {
    if (!user) {
      return
    }

    const { name, cpf, email, pronoun } = user

    if (!name || !cpf || !email || !pronoun) return false

    return true
  }

  const [tooltipOpen, setTooltipOpen] = useState(false)

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b bg-white p-4">
        {isMobile && (
          <Fragment>
            <Image width={128} src={Logo} alt="verbalynx logo" />

            <Button
              size="icon"
              variant="secondary"
              onClick={() => setShowSheet(!showSheet)}
            >
              <Menu className="size-5" />
            </Button>
          </Fragment>
        )}

        {!isMobile && (
          <Fragment>
            <span className="text-sm font-semibold">
              Olá, {session?.user.name?.split(' ')[0]}
            </span>

            <div className="ms-auto">
              <div className="flex items-center gap-4">
                {session?.user.role === 'STUDENT' && (
                  <div className="text-sm font-medium">
                    <b>Cód. Matrícula:</b> {session?.user.registrationCode}
                  </div>
                )}

                <UserCircle className="size-6" />
              </div>
            </div>
          </Fragment>
        )}
      </header>

      <Sheet.Root open={showSheet} onOpenChange={setShowSheet}>
        <Sheet.Content side="left" className="flex flex-col p-4">
          <Sheet.Header>
            <Sheet.Title>Menu</Sheet.Title>
            <Sheet.Description />
          </Sheet.Header>

          <div className="flex h-full flex-col justify-between">
            <div className="space-y-2">
              {session &&
                links
                  .filter((item) =>
                    item.roles.includes(String(session.user.role)),
                  )
                  .map((item, index) => (
                    <Fragment key={index}>
                      <Sheet.Close asChild>
                        <Link href={item.href}>
                          {item.icon}
                          {item.label}
                        </Link>
                      </Sheet.Close>
                    </Fragment>
                  ))}
            </div>

            <div className="mt-auto w-full space-y-2">
              <div className="relative flex items-center">
                <Sheet.Close asChild>
                  <Link href="/auth/perfil" className="relative w-full">
                    <User />
                    Meu Perfil
                  </Link>
                </Sheet.Close>

                {!userDataIsCompleted() && (
                  <Tooltip.Provider disableHoverableContent>
                    <Tooltip.Root
                      open={tooltipOpen}
                      onOpenChange={setTooltipOpen}
                    >
                      <Tooltip.Trigger
                        className="absolute right-2 ms-auto"
                        onClick={() => setTooltipOpen(!tooltipOpen)}
                      >
                        <CircleAlert className="size-4 text-destructive" />
                      </Tooltip.Trigger>

                      <Tooltip.Content>
                        Seu perfil não está completo!
                      </Tooltip.Content>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                )}
              </div>

              <Button
                className="w-full"
                variant="destructive"
                onClick={() => signOut()}
              >
                Desconectar
              </Button>
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Root>
    </>
  )
}
