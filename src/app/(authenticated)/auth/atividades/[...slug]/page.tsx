'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'
import { ChevronLeft, HelpCircle, PencilLine } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

import { normalizeSlug } from '@/utils/normalize-slug'

import { useGetTaskById } from '../_hooks/use-get-tasks-by-id'
import { compareDateWithToday } from '@/utils/compareDateWithToday'

export interface IParams {
  [key: string]: string[]
}

export default function Page() {
  const { data } = useSession()
  const { back } = useRouter()
  const { slug } = useParams<IParams>()
  const { id } = normalizeSlug(slug)

  const { data: tasks } = useGetTaskById({ id })
  const [showDialogHelp, setShowDialogHelp] = useState(false)

  if (!tasks) {
    return null
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Button size="icon" onClick={() => back()}>
          <ChevronLeft className="size-5" />
        </Button>

        <h2 className="text-lg font-semibold">Detalhes da atividade</h2>

        <button onClick={() => setShowDialogHelp(true)}>
          <HelpCircle className="text-zinc-500" />
        </button>
      </div>

      {data?.user.role === 'PROFESSOR' && (
        <div className="mt-6 text-end">
          <Button className="shadow" asChild>
            <Link href={`/auth/atividades/ver-rubricas/${id}`}>
              Ver rubricas <PencilLine size={20} />
            </Link>
          </Button>
        </div>
      )}

      <Dialog.Root open={showDialogHelp} onOpenChange={setShowDialogHelp}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Ajuda - Detalhes da atividade</Dialog.Title>
          </Dialog.Header>

          <div className="text-sm">
            Esta página mostra todos os detalhes da atividade em questão,
            incluindo data de abertura, data de fechamento e a possibilidade do
            aluno fazer a entrega.
          </div>

          <Dialog.Footer>
            <Link href={'/auth/ajuda'}>
              <Button type="submit">Ver tutoriais</Button>
            </Link>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>

      <div className="mt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge className="w-full max-w-36 justify-center p-1.5">
              Nome da atividade:
            </Badge>

            <Badge variant="outline" className="w-full bg-white p-1.5">
              {tasks.name}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="w-full max-w-36 justify-center p-1.5">
              Turma:
            </Badge>

            <Badge variant="outline" className="w-full bg-white p-1.5">
              {tasks.class.name}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="w-full max-w-36 justify-center p-1.5">
              Objetivo:
            </Badge>

            <Badge variant="outline" className="w-full bg-white p-1.5">
              {tasks.objective}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="w-full max-w-36 justify-center p-1.5">
              Data de abertura:
            </Badge>

            <Badge variant="outline" className="w-full bg-white p-1.5">
              {format(tasks.openingDate, 'dd/MM/yyyy - HH:mm')}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="w-full max-w-36 justify-center p-1.5">
              Data de fechamento:
            </Badge>

            <Badge variant="outline" className="w-full bg-white p-1.5">
              {(() => {
                const isBeforeClosingDate =
                  compareDateWithToday(
                    format(tasks.closingDate, 'dd/MM/yyyy - HH:mm'),
                  ) === true

                return (
                  <span
                    className={`${
                      isBeforeClosingDate ? '' : 'text-[#FF6B6B]' // Cor diferente para datas que já passaram
                    }`}
                  >
                    {format(tasks.closingDate, 'dd/MM/yyyy - HH:mm')}
                  </span>
                )
              })()}
            </Badge>
          </div>
        </div>
      </div>
    </>
  )
}
