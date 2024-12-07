'use client'

import Link from 'next/link'
import { Fragment } from 'react'
import { useParams } from 'next/navigation'
import { CircleHelp } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { normalizeSlug } from '@/utils/normalize-slug'
import { useGetFeedbackById } from '@/hooks/services/use-get-feedback-by-id'

export interface IParams {
  [key: string]: string[]
}

export default function Content() {
  const { slug } = useParams<IParams>()
  const { id } = normalizeSlug(slug)

  const { data: feedback } = useGetFeedbackById({ id })

  const studentFirstName = feedback?.student.name.split(' ')[0]

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Feedback Qualitativo</h2>

        <button>
          <CircleHelp className="text-zinc-500" />
        </button>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2">
          <Badge className="w-full max-w-24 justify-center p-1.5">Turma:</Badge>

          <Badge variant="outline" className="w-full bg-white p-1.5">
            {feedback?.class.name}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="w-full max-w-24 justify-center p-1.5">Aluno:</Badge>

          <Badge variant="outline" className="w-full bg-white p-1.5">
            {feedback?.student.name}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="w-full max-w-24 justify-center p-1.5">
            Atividade:
          </Badge>

          <Badge variant="outline" className="w-full bg-white p-1.5">
            {feedback?.task.name}
          </Badge>
        </div>
      </div>

      <div className="mt-6 rounded-md border bg-white p-4">
        <h2 className="text-sm font-semibold">Olá, {studentFirstName}!</h2>

        <div className="mt-6 space-y-2">
          {feedback?.feedbackCriterion.map((item, index) => (
            <Fragment key={index}>
              <div className="">
                <p className="text-sm">
                  <span className="font-semibold">
                    Comentário Critério {item.level}
                  </span>{' '}
                  {item.comment}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-6">
        <Button variant="destructive" className="w-full" asChild>
          <Link
            href={`/auth/estudantes/olhos-de-lince/${id}?taskId=${feedback?.task.id}`}
          >
            Reavaliar
          </Link>
        </Button>

        <Button className="w-full">Encerrar</Button>
      </div>
    </>
  )
}
