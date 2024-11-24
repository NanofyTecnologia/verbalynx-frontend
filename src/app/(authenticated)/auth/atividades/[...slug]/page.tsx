'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'
import { ChevronLeft, HelpCircle, PencilLine } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'

import { normalizeSlug } from '@/utils/normalize-slug'

import { useGetTaskById } from '../_hooks/use-get-tasks-by-id'

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

      <div className="mt-6 flex flex-col text-sm md:flex-row md:justify-between">
        <div className="space-y-2">
          <p>
            Nome da atividade:{' '}
            <span className="font-semibold">{tasks.name}</span>
          </p>

          <p>
            Turma: <span className="font-semibold">{tasks.class.name}</span>
          </p>
        </div>

        <div className="mt-2 space-y-2 md:mt-0 md:text-right">
          <p>
            Data de abertura:{' '}
            <span className="font-semibold">
              {format(tasks.openingDate, 'dd/MM/yyyy - HH:mm')}
            </span>
          </p>

          <p className="">
            Data de fechamento:{' '}
            <span className="font-semibold">
              {format(tasks.closingDate, 'dd/MM/yyyy - HH:mm')}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-2 text-sm">
        <p className="">
          Objetivo Geral:{' '}
          <span className="font-semibold">{tasks.objective}</span>
        </p>
      </div>
    </>
  )
}
