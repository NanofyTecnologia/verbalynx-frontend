'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ChevronLeft, HelpCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'

import { normalizeSlug } from '@/utils/normalize-slug'

import { useGetTaskById } from '../../_hooks/use-get-tasks-by-id'
import { useGetRubric } from '../_hooks/use-get-rubrics-by-id'

export interface IParams {
  [key: string]: string[]
}

export default function Page() {
  const { back } = useRouter()
  const { slug } = useParams<IParams>()
  const { id } = normalizeSlug(slug)

  const { data: tasks } = useGetTaskById({ id })
  const { data: rubrics } = useGetRubric({ id })
  const [showDialogHelp, setShowDialogHelp] = useState(false)

  console.log('retorno rubricas: ', rubrics)

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

      <div className="mt-12">
        <table className="w-full border-2 border-black text-center">
          <thead className="border-b-2 border-black bg-[#73D997]">
            <tr>
              <th className="border-r-2 border-black"></th>
              {rubrics.map((item) => (
                <th
                  className="border-r-2 border-black font-semibold"
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
                <td className="border-r-2 border-black bg-[#73D997] font-semibold">
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
    </>
  )
}
