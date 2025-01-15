'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ChevronLeft, HelpCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

import { normalizeSlug } from '@/utils/normalize-slug'

import { useGetTaskById } from '../../_hooks/use-get-task-by-id'
import { useGetRubric } from '../_hooks/use-get-rubrics-by-id'
import { useSession } from 'next-auth/react'

export interface IParams {
  [key: string]: string[]
}

export default function Content() {
  const { back } = useRouter()
  const { slug } = useParams<IParams>()
  const { id } = normalizeSlug(slug)
  const { data: session } = useSession()

  const { data: tasks } = useGetTaskById({ id })
  const { data: rubrics } = useGetRubric({ id })
  const [showDialogHelp, setShowDialogHelp] = useState(false)

  if (!tasks || !rubrics) {
    return null
  }

  const mapped = rubrics.map((item) => ({
    ...item,
    totalScore: item.score.reduce((acc, curr) => acc + curr, 0),
  }))

  const maxLevel = Math.max(...mapped.map((item) => item.level))

  return (
    <>
      <div className="flex items-center justify-between">
        <Button size="icon" onClick={() => back()}>
          <ChevronLeft className="size-5" />
        </Button>

        <h2 className="text-lg font-semibold">Rubricas da atividade</h2>

        <button
          onClick={() => setShowDialogHelp(true)}
          className={session?.user.role === 'PROFESSOR' ? '' : 'invisible'}
        >
          <HelpCircle className="text-zinc-500" />
        </button>
      </div>

      <Dialog.Root open={showDialogHelp} onOpenChange={setShowDialogHelp}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Ajuda - Rubricas da atividade</Dialog.Title>
          </Dialog.Header>

          <div className="text-sm">
            Esta página informa todas as rubricas vinculadas a atividade em
            questão, incluindo informações vinculadas a ela como: nome da turma,
            nome da atividade e as rubricas já criadas.
          </div>

          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button variant="outline">Cancelar</Button>
            </Dialog.Close>

            <Link href={'/auth/ajuda'}>
              <Button type="submit">Ver tutoriais</Button>
            </Link>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>

      <div className="mt-6 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Badge className="w-full max-w-36 justify-center p-1.5">
            Nome da atividade:
          </Badge>

          <Badge variant="outline" className="w-full bg-white p-1.5">
            {tasks.name}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="w-full max-w-36 justify-center p-1.5">Turma:</Badge>

          <Badge variant="outline" className="w-full bg-white p-1.5">
            {tasks.class.name}
          </Badge>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-white p-4 text-sm">
        <div className="text-center">
          <p>
            Tabela de informações da rubrica:{' '}
            <span className="font-semibold">{tasks.rubric.name}</span>
          </p>
        </div>

        <div className="mx-auto mt-4 overflow-auto">
          <table className="w-full border-2 border-black text-center">
            <thead className="text-nowrap border-b-2 border-black bg-[#73D997]">
              <tr>
                <th className="border-r-2 border-black"></th>
                {rubrics.map((item) => (
                  <th
                    className="border-r-2 border-black px-3 font-semibold"
                    key={item.name}
                  >
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: maxLevel }, (_, level) => (
                <tr className="border-b-2 border-black" key={level + 1}>
                  <td className="text-nowrap border-r-2 border-black bg-[#73D997] px-3 font-semibold">
                    Nível {level + 1}
                  </td>
                  {rubrics.map((item) => (
                    <td className="border-r-2 border-black" key={item.name}>
                      {item.score[level] !== undefined ? item.score[level] : 0}{' '}
                      pontos
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
