'use client'

import Link from 'next/link'
import { Fragment, ReactNode, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Camera, FolderCheck, Link2, ChevronLeft, Play } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'

import { normalizeSlug } from '@/utils/normalize-slug'
import { useGetFeedbackById } from '@/hooks/services/use-get-feedback-by-id'

import SavePDF from '../_components/save-pdf'
import FormReevaluate from '../_components/form-reevaluate'
import { useUpdateFeedback } from './_hooks/use-update-feedback'

export interface IParams {
  [key: string]: string[]
}

const tipElement: { [key: string]: ReactNode } = {
  '1': <FolderCheck className="size-4" />,
  '2': <Play className="size-4" />,
  '3': <Camera className="size-4" />,
  '4': <Link2 className="size-4" />,
}

export default function Content() {
  const { replace, back } = useRouter()

  const { data: session } = useSession()

  const { slug } = useParams<IParams>()
  const { id } = normalizeSlug(slug)

  const [showDialog, setShowDialog] = useState<boolean>(false)

  const { data: feedback, refetch } = useGetFeedbackById({ id })
  const { mutate: handleUpdateFeedback } = useUpdateFeedback()

  const studentFirstName = feedback?.student.name.split(' ')[0]

  const getTotalScore = () => {
    let total = 0

    if (feedback?.task?.rubric?.criterion) {
      feedback.task.rubric.criterion.forEach((criterion) => {
        total += criterion.score.reduce(
          (criterionSum, score) => criterionSum + score,
          0,
        )
      })
    }

    return total
  }

  const onClosedFeedback = () => {
    if (!id) return

    handleUpdateFeedback(
      { id, isClosed: true },
      {
        onSuccess: () => {
          replace('/auth')
          toast.success('Feedback encerrado com sucesso!')
        },
      },
    )
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Button size="icon" onClick={() => back()}>
          <ChevronLeft className="size-5" />
        </Button>

        <h2 className="text-lg font-semibold">Feedback Qualitativo</h2>

        <div />
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2">
          <Badge className="w-full max-w-24 justify-center p-1.5">Turma:</Badge>

          <Badge variant="outline" className="w-full bg-white p-1.5">
            {feedback?.class.name}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="w-full max-w-24 justify-center p-1.5">
            Estudante:
          </Badge>

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

      <div className="relative mt-6 rounded-md border bg-white p-4">
        <h2 className="text-sm font-semibold">Olá, {studentFirstName}!</h2>

        <div className="mt-6 space-y-2">
          {feedback?.feedbackCriterion.map((item, index) => {
            console.log(item)

            return (
              <Fragment key={index}>
                <div className="space-y-2">
                  <p className="text-sm">
                    {item.criterion.comment[item.level]}
                  </p>
                  <p className="text-sm">{item.comment}</p>

                  <div className="flex items-center gap-4">
                    {item.tips.map((tip) => {
                      const tipIndex = tip.split('_')[0]
                      const url = tip.split('_')[1]

                      return (
                        <Fragment key={tip}>
                          <Link
                            href={url ?? '#'}
                            target="_"
                            className="rounded-full border border-muted-foreground p-2"
                          >
                            {tipElement[tipIndex]}
                          </Link>
                        </Fragment>
                      )
                    })}
                  </div>
                </div>
              </Fragment>
            )
          })}
        </div>

        <div className="flex justify-end">
          <Badge>Total de pontos: {getTotalScore()}</Badge>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button size="sm">Enviar por e-mail</Button>

          <SavePDF feedback={feedback} />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {session?.user.role === 'PROFESSOR' && (
          <Button
            className="w-full"
            variant="destructive"
            onClick={() => setShowDialog(!showDialog)}
          >
            Reavaliar
          </Button>
        )}

        {session?.user.role === 'STUDENT' && (
          <Button className="w-full" variant="destructive" asChild>
            <Link href={`/auth/atividades/${feedback?.task.id}`}>
              Quero melhorar
            </Link>
          </Button>
        )}

        <Button className="w-full" onClick={onClosedFeedback}>
          Encerrar {session?.user.role === 'STUDENT' && 'trabalho'}
        </Button>
      </div>

      <Dialog.Root open={showDialog} onOpenChange={setShowDialog}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>
              Reavaliar {feedback?.student.name} - {feedback?.class.name}
            </Dialog.Title>
            <Dialog.Description>
              <span className="font-semibold">Atividade:</span>{' '}
              {feedback?.task.name}
            </Dialog.Description>
          </Dialog.Header>

          <FormReevaluate
            taskId={feedback?.task.id}
            onReloadFeedback={refetch}
          />
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
