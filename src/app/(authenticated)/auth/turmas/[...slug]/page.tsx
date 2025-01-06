'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import {
  Dices,
  UserPlus,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { toast } from 'react-toastify'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'

import { normalizeSlug } from '@/utils/normalize-slug'
import { generateRegistrationCode } from '@/utils/generate-student-code'

import { useGetClassById } from '../_hooks/use-get-class-by-id'
import { useCreateStudent } from './_hooks/use-create-student'

import { StudentData, studentSchema } from './_schema'
import { useDeleteClass } from '../_hooks/use-delete-class'

export interface IParams {
  [key: string]: string[]
}

export default function Page() {
  const { push } = useRouter()
  const { slug } = useParams<IParams>()
  const { id } = normalizeSlug(slug)

  const { data: team, refetch } = useGetClassById({ id })
  const { mutate: handleDeleteClass } = useDeleteClass()
  const { mutate: handleCreateStudent } = useCreateStudent()
  const [showDialog, setShowDialog] = useState(false)
  const [showDialogHelp, setShowDialogHelp] = useState(false)

  const { register, handleSubmit, setValue } = useForm<StudentData>({
    resolver: zodResolver(studentSchema),
  })

  const onSubmit: SubmitHandler<StudentData> = (data) => {
    if (!team) return

    handleCreateStudent(
      {
        ...data,
        graduation: team.educationLevel,
        classId: team.id,
        role: 'STUDENT',
      },
      {
        onSuccess: () => {
          refetch()
          setShowDialog(false)
          toast.success('Estudante cadastrado com sucesso!')
        },
      },
    )
  }

  if (!team) {
    return null
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Button size="icon" onClick={() => push('/auth/turmas')}>
          <ChevronLeft className="size-5" />
        </Button>

        <h2 className="text-lg font-semibold">Detalhes da turma</h2>

        <button onClick={() => setShowDialogHelp(true)}>
          <HelpCircle className="text-zinc-500" />
        </button>
      </div>

      <div className="mt-6 flex flex-col space-y-4 md:flex-row md:space-y-0">
        <div className="flex w-full items-center gap-2 md:justify-start">
          <Badge className="w-full max-w-36 justify-center p-1.5">
            Nome da turma:
          </Badge>

          <Badge
            variant="outline"
            className="w-full bg-white p-1.5 md:max-w-60"
          >
            {team.name}
          </Badge>
        </div>

        <div className="flex w-full items-center gap-2 md:justify-center">
          <Badge className="w-full max-w-36 justify-center p-1.5">
            Nº Estudantes:
          </Badge>

          <Badge
            variant="outline"
            className="w-full bg-white p-1.5 md:max-w-60"
          >
            {team.students.length}
          </Badge>
        </div>

        <div className="flex w-full items-center gap-2 md:justify-end">
          <Badge className="w-full max-w-36 justify-center p-1.5">
            Data de criação:
          </Badge>

          <Badge
            variant="outline"
            className="w-full bg-white p-1.5 md:max-w-60"
          >
            {format(team?.createdAt, 'dd/MM/yyy')}
          </Badge>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Estudantes da Turma</h2>

          <Button onClick={() => setShowDialog(true)} size="icon">
            <UserPlus />
          </Button>
        </div>

        <div className="mt-4 max-h-96 space-y-2 overflow-y-auto pe-4">
          {team.students.map((student) => (
            <Fragment key={student.id}>
              <Link
                href={`/auth/alunos/${student.id}`}
                className="flex items-center justify-between rounded-md bg-muted/50 p-2"
              >
                <p className="font-medium">{student.name}</p>

                <ChevronRight className="size-4" />
              </Link>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button className="w-full" variant="destructive">
              Deletar turma
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                Excluir <b>{team.name}</b>
              </Dialog.Title>

              <Dialog.Description>
                {team.students.length > 0 &&
                  'Esta turma não pode ser excluída, pois há alunos cadastrados nela.'}

                {team.students.length === 0 &&
                  'Atenção! Ao excluir esta turma, todos os dados serão perdidos e não será possível recuperá-la.'}
              </Dialog.Description>
            </Dialog.Header>

            <Dialog.Footer className="gap-y-4">
              <Button variant="secondary">Cancelar</Button>

              {!(team.students.length > 0) && (
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDeleteClass(
                      {
                        id: team.id,
                      },
                      {
                        onSuccess: () => {
                          push('/auth/turmas')
                          toast.success('Turma deletada com sucesso!')
                        },
                      },
                    )
                  }}
                >
                  Sim, excluir
                </Button>
              )}
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      </div>

      <Dialog.Root open={showDialog} onOpenChange={setShowDialog}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Cadastrar novo estudante na turma</Dialog.Title>
            <Dialog.Description />
          </Dialog.Header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-0.5">
              <Label>Nome do estudante</Label>

              <Input {...register('name')} />
            </div>

            <div className="space-y-0.5">
              <Label>E-mail do estudante</Label>

              <Input {...register('email')} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-0.5">
                <Label>Turma</Label>

                <Input value={team.name} disabled />
              </div>

              <div className="space-y-0.5">
                <Label>Nível de Ensino</Label>

                <Input value={team.educationLevel} disabled />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-0.5">
                <Label className="text-sm">Código da Matrícula</Label>

                <div className="relative flex items-center">
                  <Input {...register('registrationCode')} />

                  <button
                    type="button"
                    className="absolute right-1"
                    onClick={() =>
                      setValue('registrationCode', generateRegistrationCode())
                    }
                  >
                    <Dices className="size-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-0.5">
                <Label>Pronomes</Label>

                <RadioGroup.Root className="flex h-9 items-center gap-4">
                  <div className="flex items-center gap-2">
                    <RadioGroup.Item id="pronoun-1" value="ele/dele" />

                    <Label htmlFor="pronoun-1" className="text-xs">
                      Ele / Dele
                    </Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <RadioGroup.Item id="pronoun-2" value="ela/dela" />

                    <Label htmlFor="pronoun-2" className="text-xs">
                      Ela / Dela
                    </Label>
                  </div>
                </RadioGroup.Root>
              </div>
            </div>

            <div className="space-y-0.5">
              <Label className="text-sm">Observação</Label>

              <Textarea {...register('observation')} />
            </div>

            <Dialog.Footer className="gap-4">
              <Dialog.Close asChild>
                <Button variant="outline">Cancelar</Button>
              </Dialog.Close>

              <Button type="submit">Salvar</Button>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Root>

      <Dialog.Root open={showDialogHelp} onOpenChange={setShowDialogHelp}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Ajuda - Detalhes da turma</Dialog.Title>
          </Dialog.Header>

          <div className="text-sm">
            Esta página mostra todos os detalhes da turma em questão, incluindo
            a lista de alunos, número de alunos, data de criação e filtro de
            busca.
          </div>

          <div className="text-sm">
            <li>
              <span className="font-semibold">Filtro de busca:</span> Utilize o
              filtro para encontrar um estudante específico.
            </li>
            <li>
              <span className="font-semibold">Deletar turma:</span> Clique sobre
              o botão para realizar a exclusão. Ao confirmar o pedido, a turma
              será excluída.
            </li>
          </div>
          <Dialog.Footer>
            <Link href={'/auth/ajuda'}>
              <Button type="submit">Ver tutoriais</Button>
            </Link>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
