'use client'

import { Fragment } from 'react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import {
  Menu,
  Users,
  NotebookPen,
  PanelsTopLeft,
  GraduationCap,
  HeartHandshake,
} from 'lucide-react'

import { Sheet } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

import Logo from '@/assets/images/verbalynx-logo.png'

import Link from './link'

export const sidebarLinks = [
  {
    label: 'Início',
    icon: <PanelsTopLeft />,
    href: '/auth',
  },
  {
    label: 'Turmas',
    icon: <Users />,
    href: '/auth/turmas',
  },
  {
    label: 'Atividades',
    icon: <NotebookPen />,
    href: '/auth/atividades',
  },
  {
    label: 'Estudantes',
    icon: <GraduationCap />,
    href: '/auth/estudantes',
  },
  {
    label: 'Ajuda',
    icon: <HeartHandshake />,
    href: '/auth/ajuda',
  },
]

export default function Header() {
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
                {sidebarLinks.map((item, index) => (
                  <Fragment key={index}>
                    <Link href={item.href}>
                      {item.icon}
                      {item.label}
                    </Link>
                  </Fragment>
                ))}
              </div>

              <Button onClick={() => signOut()} variant="destructive">
                Sair
              </Button>
            </div>
          </Sheet.Content>
        </Sheet.Root>
      </header>
    </>
  )
}
