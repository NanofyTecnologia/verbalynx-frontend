'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ChevronLeft, HelpCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'

import { normalizeSlug } from '@/utils/normalize-slug'

import { useGetTaskById } from '../../_hooks/use-get-tasks-by-id'

export interface IParams {
  [key: string]: string[]
}

export default function Page() {
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

        <h2 className="text-lg font-semibold">Rubricas da atividade</h2>

        <button onClick={() => setShowDialogHelp(true)}>
          <HelpCircle className="text-zinc-500" />
        </button>
      </div>

      <Dialog.Root open={showDialogHelp} onOpenChange={setShowDialogHelp}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Ajuda - Rubricas da atividade</Dialog.Title>
          </Dialog.Header>

          <div className="text-sm">
            Esta página informa ao docente todas as rubricas vinculadas a
            atividade em questão, incluindo informações vinculadas a ela como:
            nome da turma, nome da atividade e as rubricas já criadas.
          </div>

          <Dialog.Footer>
            <Link href={'/auth/ajuda'}>
              <Button type="submit">Ver tutoriais</Button>
            </Link>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>

      <div className="mt-6 space-y-2 text-sm">
        <p>
          Nome da atividade: <span className="font-semibold">{tasks.name}</span>
        </p>

        <p>
          Turma: <span className="font-semibold">{tasks.class.name}</span>
        </p>
      </div>

      <div className="mt-12 flex items-center justify-center">
        Tela de Rubricas da Atividade:
        <span className="font-semibold"> {id}</span>
      </div>
    </>
  )
}
