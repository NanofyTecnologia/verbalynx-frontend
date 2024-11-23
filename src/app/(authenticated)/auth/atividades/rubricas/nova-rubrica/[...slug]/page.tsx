'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ChevronLeft, HelpCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import { normalizeSlug } from '@/utils/normalize-slug'

import { useGetTaskById } from '../../../_hooks/use-get-tasks-by-id'

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

        <h2 className="text-lg font-semibold">Nova Rubrica</h2>

        <button onClick={() => setShowDialogHelp(true)}>
          <HelpCircle className="text-zinc-500" />
        </button>
      </div>

      <Dialog.Root open={showDialogHelp} onOpenChange={setShowDialogHelp}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Ajuda - Nova rubrica</Dialog.Title>
          </Dialog.Header>

          <div className="text-sm">
            Nesta página o professor poderá criar uma nova rubrica para a
            atividade em questão, informando um nome, critérios e níveis.
          </div>

          <Dialog.Footer>
            <Link href={'/auth/ajuda'}>
              <Button type="submit">Ver tutoriais</Button>
            </Link>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>

      <form action="">
        <div className="mt-6 space-y-6 text-sm">
          <div className="space-y-0.5">
            <Label>Atividade</Label>
            <Input defaultValue={tasks.name} disabled />
          </div>

          <div className="space-y-0.5">
            <Label>Nome da rubrica</Label>
            <Input placeholder="Ex: Conceitos de Operações" />
          </div>

          <div className="space-y-0.5">
            <Label>Turma</Label>
            <Input defaultValue={tasks.class.name} disabled />
          </div>

          <div className="space-y-0.5">
            <Label>Objetivo</Label>
            <Input placeholder="Ex: Avaliar conhecimento" />
          </div>

          <div className="space-y-0.5">
            <Label>Descrição</Label>
            <Input placeholder="Ex: Esta rubrica tem por finalidade..." />
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center">
          Tela de Criação de Rúbricas para a atividade:
          <span className="font-semibold"> {id}</span>
        </div>
      </form>
    </>
  )
}
