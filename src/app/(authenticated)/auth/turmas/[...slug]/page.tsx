'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import {
  ChevronRight,
  ChevronLeft,
  Dices,
  HelpCircle,
  UserPlus,
  Trash,
  UserRoundPen,
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

import { useGetClassById } from '../_hooks/use-get-class-by-id'

import { StudentData, studentSchema } from './_schema'
import { useCreateStudent } from './_hooks/use-create-student'
import { useDeleteStudent } from './_hooks/use-delete-student'
import { generateRegistrationCode } from '@/utils/generate-student-code'

export interface IParams {
  [key: string]: string[]
}

export default function Page() {
  const { back } = useRouter()
  const { slug } = useParams<IParams>()
  const { id } = normalizeSlug(slug)

  const { data: team, refetch } = useGetClassById({ id })
  const { mutate: handleCreateStudent } = useCreateStudent()
  const { mutate: deleteStudent, isError, error } = useDeleteStudent()

  const [showDialog, setShowDialog] = useState(false)
  const [showDialogHelp, setShowDialogHelp] = useState(false)
  const [showDialogDeleteStudant, setShowDialogDeleteStudant] = useState(false)
  const [studentIdDelete, setStudentIdDelete] = useState('')
  const [studentNameDelete, setStudentNameDelete] = useState('')

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

  const handleDelete = () => {
    const id = studentIdDelete
    deleteStudent(
      { id },
      {
        onSuccess: () => {
          toast.success('Estudante deletado com sucesso!')
        },
        onError: (err) => {
          toast.error(
            'Houve um erro ao excluir o estudante. Tente novamente mais tarde.',
          )
          console.error('Erro ao excluir o estudante: ', err)
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
        <Button size="icon" onClick={() => back()}>
          <ChevronLeft className="size-5" />
        </Button>

        <h2 className="text-lg font-semibold">Detalhes da turma</h2>

        <button onClick={() => setShowDialogHelp(true)}>
          <HelpCircle className="text-zinc-500" />
        </button>
      </div>

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
              filtro para encontrar um aluno específico.
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
              <div className="flex items-center justify-between rounded-md bg-muted/50 p-2">
                <p className="font-medium">{student.name}</p>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      setStudentIdDelete(student.id)
                      setStudentNameDelete(student.name ? student.name : '')
                      setShowDialogDeleteStudant(true)
                    }}
                  >
                    <Trash className="size-4" />
                  </button>
                  <Link href={`/auth/alunos/${student.id}`}>
                    <UserRoundPen className="size-4" />
                  </Link>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
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

      <Dialog.Root
        open={showDialogDeleteStudant}
        onOpenChange={setShowDialogDeleteStudant}
      >
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Exclusão de estudante</Dialog.Title>
            <Dialog.Description />
          </Dialog.Header>

          <form onSubmit={handleDelete} className="space-y-4">
            <div className="space-y-0.5">
              <Label>Nome do estudante</Label>

              <Input value={studentNameDelete} disabled />
            </div>

            <div className="space-y-0.5">
              <Label>Turma</Label>

              <Input value={team.name} disabled />
            </div>

            <Dialog.Footer className="gap-4">
              <Dialog.Close asChild>
                <Button variant="outline">Cancelar</Button>
              </Dialog.Close>

              <Button type="submit" variant="destructive">
                Excluir
              </Button>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Root>

      <div className="mt-4">
        <Button
          className="w-full"
          variant="destructive"
          onClick={() => console.log('teste turma excluida')}
        >
          Excluir turma
        </Button>
      </div>
    </>
  )
}
