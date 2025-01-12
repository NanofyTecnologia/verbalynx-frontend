'use client'

import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft, HelpCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { normalizeSlug } from '@/utils/normalize-slug'

import { useGetTaskById } from '../../_hooks/use-get-task-by-id'

export interface IParams {
  [key: string]: string[]
}

export default function Content() {
  const { back } = useRouter()
  const { slug } = useParams<IParams>()
  const { id } = normalizeSlug(slug)

  const { data: task } = useGetTaskById({ id })

  if (!task) {
    return null
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Button size="icon" onClick={() => back()}>
          <ChevronLeft className="size-5" />
        </Button>

        <h2 className="text-lg font-semibold">Entregas da Atividade</h2>

        <HelpCircle className="invisible text-zinc-500" />
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2">
          <Badge className="w-full max-w-36 justify-center p-1.5">
            Nome da atividade:
          </Badge>

          <Badge variant="outline" className="w-full bg-white p-1.5">
            {task.name}
          </Badge>
        </div>
      </div>
    </>
  )
}
