'use client'

import Link from 'next/link'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'
import { ChevronLeft, HelpCircle, PencilLine } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

import { compareDateWithToday } from '@/utils/compareDateWithToday'

import FormSendTask from './_components/form-send-task'
import { useDeleteTask } from '../_hooks/use-delete-task'
import { useGetTaskById } from '../_hooks/use-get-task-by-id'

export interface IParams {
  [key: string]: string
}

export default function Content() {
  const { data: session } = useSession()
  const { push } = useRouter()
  const { id } = useParams<IParams>()

  const { data: task } = useGetTaskById({ id })
  const { mutate: handleDeleteTask } = useDeleteTask()

  const [showDialogHelp, setShowDialogHelp] = useState(false)

  if (!task) {
    return null
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Button size="icon" onClick={() => push('/auth/atividades')}>
          <ChevronLeft className="size-5" />
        </Button>

        <h2 className="text-lg font-semibold">Detalhes da atividade</h2>

        <button onClick={() => setShowDialogHelp(true)}>
          <HelpCircle className="text-zinc-500" />
        </button>
      </div>

      {session?.user.role === 'PROFESSOR' && (
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
            estudante fazer a entrega.
          </div>

          <Dialog.Footer>
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
                  compareDateWithToday(
                    format(task.closingDate, 'dd/MM/yyyy - HH:mm'),
                  ) === true

                return (
                  <span
                    className={`${isBeforeClosingDate ? '' : 'text-[#FF6B6B]'}`}
                  >
                    {format(task.closingDate, 'dd/MM/yyyy - HH:mm')}
                  </span>
                )
              })()}
            </Badge>
          </div>

          {session?.user.role === 'STUDENT' && (
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button className="w-full">Enviar atividade</Button>
              </Dialog.Trigger>

              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Enviar atividade</Dialog.Title>

                  <Dialog.Description>
                    Envie suas atividades para serem avaliadas pelo professor
                  </Dialog.Description>
                </Dialog.Header>

                <FormSendTask />
              </Dialog.Content>
            </Dialog.Root>
          )}

          {session?.user.role === 'PROFESSOR' && (
            <>
              <Button className="w-full bg-yellow-400 hover:bg-yellow-400/80">
                Editar
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
            </>
          )}
        </div>
      </div>
    </>
  )
}
