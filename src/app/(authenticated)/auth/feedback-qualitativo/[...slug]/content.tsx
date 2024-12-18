'use client'

import { Fragment, ReactNode, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { BoomBox, Camera, CircleHelp, FolderCheck, Link2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'

import { normalizeSlug } from '@/utils/normalize-slug'
import { useGetFeedbackById } from '@/hooks/services/use-get-feedback-by-id'

import FormReevaluate from '../_components/form-reevaluate'
import { useUpdateFeedback } from './_hooks/use-update-feedback'
import { toast } from 'react-toastify'

export interface IParams {
  [key: string]: string[]
}

const tipElement: { [key: string]: ReactNode } = {
  '1': <FolderCheck className="size-4" />,
  '2': <BoomBox className="size-4" />,
  '3': <Camera className="size-4" />,
  '4': <Link2 className="size-4" />,
}

export default function Content() {
  const { replace } = useRouter()

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

      <div className="relative mt-6 rounded-md border bg-white p-4">
        <h2 className="text-sm font-semibold">Olá, {studentFirstName}!</h2>

        <div className="mt-6 space-y-2">
          {feedback?.feedbackCriterion.map((item, index) => (
            <Fragment key={index}>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">
                    Comentário Critério {item.level}
                  </span>{' '}
                  {item.comment}
                </p>

                <div className="flex items-center gap-4">
                  {item.tips.map((tip) => (
                    <Fragment key={tip}>
                      <div className="rounded-full border border-muted-foreground p-2">
                        {tipElement[tip]}
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </Fragment>
          ))}
        </div>

        <div className="flex justify-end">
          <Badge>Total de pontos: {getTotalScore()}</Badge>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <Button size="sm">Enviar por e-mail</Button>

          <Button size="sm">Exportar .PDF</Button>

          <Button size="sm">Salvar</Button>
        </div>
      </div>

      <div className="mt-4 space-y-6">
        {session?.user.role === 'PROFESSOR' && (
          <Button
            className="w-full"
            variant="destructive"
            onClick={() => setShowDialog(!showDialog)}
          >
            Reavaliar
          </Button>
        )}

        <Button className="w-full" onClick={onClosedFeedback}>
          Encerrar
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
