'use client'

import Link from 'next/link'
import { Fragment } from 'react'
import { useSession } from 'next-auth/react'
import { GraduationCap, SquarePlus } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useGetClassesById } from './_hooks/use-get-classes-by-id'

function getRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16)

  return `#${randomColor.padStart(6, '0')}`
}

export default function Content() {
  const { data } = useSession()

  const { data: classes } = useGetClassesById({ id: data?.user.id })

  return (
    <>
      <div className="text-center">
        <h2 className="text-lg font-semibold">Turmas</h2>
      </div>

      {data?.user.role === 'PROFESSOR' && (
        <div className="mt-6 text-end">
          <Button className="h-10 shadow" asChild>
            <Link href="/auth/turmas/nova-turma">
              Nova turma <SquarePlus />
            </Link>
          </Button>
        </div>
      )}

      <div className="mt-6">
        <Input className="bg-white" placeholder="Pesquisar..." />
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">Minhas turmas</h3>

        <div className="mt-2 space-y-4">
          {classes?.map((item) => {
            const color = getRandomColor()

            return (
              <Fragment key={item.id}>
                <Link
                  href="#"
                  style={{ borderColor: color }}
                  className="flex items-center gap-4 rounded-md border-s-4 bg-white px-4 py-2.5"
                >
                  <span
                    style={{ borderColor: color }}
                    className="rounded-full border p-3"
                  >
                    <GraduationCap style={{ color }} className="size-5" />
                  </span>

                  {item.name}
                </Link>
              </Fragment>
            )
          })}
        </div>
      </div>
    </>
  )
}
