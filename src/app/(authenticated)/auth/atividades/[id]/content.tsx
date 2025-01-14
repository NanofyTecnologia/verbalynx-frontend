'use client'

import Link from 'next/link'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'
import { ChevronLeft, HelpCircle, PencilLine } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'

import { compareDateWithToday } from '@/utils/compareDateWithToday'

import FormSendTask from './_components/form-send-task'
import { useDeleteTask } from '../_hooks/use-delete-task'
import { useGetTaskById } from '../_hooks/use-get-task-by-id'
import { useGetStudentFeedback } from './_hooks/use-get-student-feedback'

export interface IParams {
  [key: string]: string
}

export default function Content() {
  const { data: session } = useSession()
  const { push } = useRouter()
  const { id } = useParams<IParams>()

  const { data: task } = useGetTaskById({ id })
  const { data: feedback } = useGetStudentFeedback({ id })
  const { mutate: handleDeleteTask } = useDeleteTask()

  const [showDialogHelp, setShowDialogHelp] = useState(false)

  if (!task) {
    return null
  }

  const formattedClosingDate = format(task.closingDate, 'dd/MM/yyyy - HH:mm')

  return (
    <>
      <div className="flex items-center justify-between">
        <Button size="icon" onClick={() => push('/auth/atividades')}>
          <ChevronLeft className="size-5" />
        </Button>

        <h2 className="text-lg font-semibold">Detalhes da atividade</h2>

        <button
          onClick={() => setShowDialogHelp(true)}
          className={session?.user.role === 'PROFESSOR' ? '' : 'invisible'}
        >
          <HelpCircle className="text-zinc-500" />
        </button>
      </div>

      <div className="mt-6 space-x-4 text-end">
        <Button className="shadow" asChild>
          <Link href={`/auth/atividades/ver-rubricas/${id}`}>
            Ver rubricas <PencilLine size={20} />
          </Link>
        </Button>
      </div>

      <Dialog.Root open={showDialogHelp} onOpenChange={setShowDialogHelp}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Ajuda - Detalhes da atividade</Dialog.Title>
          </Dialog.Header>

          <div className="text-sm">
            Esta página mostra todos os detalhes da atividade em questão,
            incluindo data de abertura, data de fechamento e a possibilidade do
            estudante fazer a entrega.
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

      <div className="mt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge className="w-full max-w-36 justify-center p-1.5">
              Nome da atividade:
            </Badge>

            <Badge variant="outline" className="w-full bg-white p-1.5">
              {task.name}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="w-full max-w-36 justify-center p-1.5">
              Turma:
            </Badge>

            <Badge variant="outline" className="w-full bg-white p-1.5">
              {task.class.name}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="w-full max-w-36 justify-center p-1.5">
              Objetivo:
            </Badge>

            <Badge variant="outline" className="w-full bg-white p-1.5">
              {task.objective}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="w-full max-w-36 justify-center p-1.5">
              Data de abertura:
            </Badge>

            <Badge variant="outline" className="w-full bg-white p-1.5">
              {format(task.openingDate, 'dd/MM/yyyy - HH:mm')}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="w-full max-w-36 justify-center p-1.5">
              Data de fechamento:
            </Badge>

            <Badge variant="outline" className="w-full bg-white p-1.5">
              {(() => {
                const isBeforeClosingDate =
                  compareDateWithToday(formattedClosingDate) === true

                return (
                  <span
                    className={`${isBeforeClosingDate ? 'text-[#8ABF3B]' : 'text-[#FF6B6B]'}`}
                  >
                    {format(task.closingDate, 'dd/MM/yyyy - HH:mm')}
                  </span>
                )
              })()}
            </Badge>
          </div>

          {session?.user.role === 'STUDENT' && !!feedback && (
            <Button asChild className="w-full" variant="outline">
              <Link href={`/auth/feedback-qualitativo/${feedback.id}`}>
                Ver feedback
              </Link>
            </Button>
          )}

          {session?.user.role === 'STUDENT' &&
            (compareDateWithToday(formattedClosingDate) ? (
              <>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Button className="w-full">Enviar atividade</Button>
                  </Dialog.Trigger>

                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>Enviar atividade</Dialog.Title>

                      <Dialog.Description>
                        Envie suas atividades para serem avaliadas pelo
                        professor
                      </Dialog.Description>
                    </Dialog.Header>

                    <FormSendTask />
                  </Dialog.Content>
                </Dialog.Root>
              </>
            ) : (
              <Button className="w-full" disabled>
                Enviar atividade
              </Button>
            ))}

          {session?.user.role === 'PROFESSOR' && (
            <>
              <h3 className="pt-6 font-semibold">Entregas da atividade</h3>

              <div className="max-h-96 overflow-y-scroll rounded-md border bg-white p-4">
                {task.studentTask.length === 0 ? (
                  <div className="text-center">Nenhuma atividade entregue</div>
                ) : (
                  <div className="space-y-4">
                    {task.studentTask
                      .sort(
                        (isFalse, isTrue) =>
                          Number(isFalse.isCompleted) -
                          Number(isTrue.isCompleted),
                      )
                      .map((item) => (
                        <Fragment key={item.id}>
                          <Link
                            href={
                              item.isCompleted
                                ? {
                                    pathname: `/auth/feedback-qualitativo/${item.student.studentFeedback[0].id}`,
                                  }
                                : {
                                    pathname: '/auth/estudantes/',
                                    query: {
                                      taskId: task.id,
                                      classId: task.classId,
                                      userId: item.studentId,
                                    },
                                  }
                            }
                            className="block"
                          >
                            <div className="rounded-md border p-4 text-sm transition-colors hover:border-gray-400">
                              <div className="space-y-1">
                                <div className="flex gap-2">
                                  <p className="font-semibold">Estudante:</p>
                                  <p>{item.student.name}</p>
                                </div>

                                <div className="flex gap-2">
                                  <p className="font-semibold">Título:</p>
                                  <p>{item.title}</p>
                                </div>

                                <div className="flex gap-2">
                                  <p className="font-semibold">Status:</p>
                                  <p
                                    className={
                                      item.isCompleted
                                        ? 'text-green-500'
                                        : 'text-[#FF6B6B]'
                                    }
                                  >
                                    {item.isCompleted ? 'Avaliado' : 'Pendente'}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </Fragment>
                      ))}
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-6">
                <Button
                  className="w-full bg-yellow-400 hover:bg-yellow-400/80"
                  asChild
                >
                  <Link href={`/auth/atividades/editar-atividade/${id}`}>
                    Editar
                  </Link>
                </Button>

                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Button className="w-full" variant="destructive">
                      Deletar atividade
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>
                        Excluir atividade <b>{task.name}</b>
                      </Dialog.Title>
                      <Dialog.Description>
                        {task.feedback.length > 0 &&
                          'Esta atividade não pode ser excluída, pois já existem feedbacks enviados.'}
                        <br />
                        {task.studentTask.length > 0 &&
                          'Esta atividade não pode ser excluída, pois um aluno já fez a entrega da atividade.'}

                        {task.feedback.length === 0 &&
                          task.studentTask.length === 0 &&
                          'Atenção! Ao excluir esta atividade, todos os dados serão perdidos e não será possível recuperá-la.'}
                      </Dialog.Description>
                    </Dialog.Header>

                    <Dialog.Footer className="gap-y-4">
                      <Dialog.Close asChild>
                        <Button variant="secondary">Cancelar</Button>
                      </Dialog.Close>

                      {!(
                        task.feedback.length > 0 || task.studentTask.length > 0
                      ) && (
                        <Button
                          variant="destructive"
                          onClick={() =>
                            handleDeleteTask(
                              { id: task.id },
                              {
                                onSuccess: () => {
                                  push('/auth/atividades')
                                  toast.success('Tarefa excluída com sucesso!')
                                },
                                onError: (data) => {
                                  console.log(data)
                                },
                              },
                            )
                          }
                        >
                          Sim, deletar
                        </Button>
                      )}
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog.Root>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
