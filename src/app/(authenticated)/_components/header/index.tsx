'use client'

import Image from 'next/image'
import { Fragment, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import {
  User,
  Menu,
  Users,
  CircleAlert,
  NotebookPen,
  PanelsTopLeft,
  GraduationCap,
  HeartHandshake,
} from 'lucide-react'

import { Sheet } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'

import Logo from '@/assets/images/verbalynx-logo.png'
import { useGetUser } from '@/hooks/services/use-get-user'

import Link from './link'

export const sidebarLinks = [
  {
    label: 'Início',
    icon: <PanelsTopLeft />,
    href: '/auth',
    roles: ['PROFESSOR', 'STUDENT', 'ADMIN'],
  },
  {
    label: 'Turmas',
    icon: <Users />,
    href: '/auth/turmas',
    roles: ['PROFESSOR', 'ADMIN'],
  },
  {
    label: 'Minha turma',
    icon: <Users />,
    href: '/auth/turmas',
    roles: ['STUDENT', 'ADMIN'],
  },
  {
    label: 'Atividades',
    icon: <NotebookPen />,
    href: '/auth/atividades',
    roles: ['PROFESSOR', 'STUDENT', 'ADMIN'],
  },
  {
    label: 'Estudantes',
    icon: <GraduationCap />,
    href: '/auth/estudantes',
    roles: ['PROFESSOR', 'ADMIN'],
  },
  {
    label: 'Ajuda',
    icon: <HeartHandshake />,
    href: '/auth/ajuda',
    roles: ['PROFESSOR', 'STUDENT', 'ADMIN'],
  },
]

export default function Header() {
  const { data, update } = useSession()
  const { data: user } = useGetUser()

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
      <header className="flex items-center justify-between bg-white p-4">
        <Image width={128} src={Logo} alt="verbalynx logo" />

        <Sheet.Root>
          <Sheet.Trigger asChild>
            <Button size="icon" variant="secondary">
              <Menu className="size-5" />
            </Button>
          </Sheet.Trigger>
          <Sheet.Content side="left" className="flex flex-col p-4">
            <Sheet.Header>
              <Sheet.Title>Menu</Sheet.Title>
              <Sheet.Description />
            </Sheet.Header>

            <div className="flex h-full flex-col justify-between">
              <div className="space-y-2">
                {data &&
                  sidebarLinks
                    .filter((item) =>
                      item.roles.includes(String(data.user.role)),
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

                <Button
                  className="w-full"
                  onClick={() => update({ role: 'ADMIN' })}
                >
                  Admin
                </Button>

                <Button
                  className="w-full"
                  onClick={() => update({ role: 'PROFESSOR' })}
                >
                  Professor
                </Button>

                <Button
                  className="w-full"
                  onClick={() => update({ role: 'STUDENT' })}
                >
                  Estudante
                </Button>

                <Button
                  className="w-full"
                  onClick={() => update({ role: 'PENDING_APPROVAL' })}
                >
                  Aguardando Aprovação
                </Button>
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
      </header>
    </>
  )
}
