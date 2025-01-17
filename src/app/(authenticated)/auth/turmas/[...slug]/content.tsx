'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import {
  Trash,
  Dices,
  Search,
  UserPlus,
  HelpCircle,
  ChevronLeft,
  ContactRound,
  EllipsisVertical,
} from 'lucide-react'
import { toast } from 'react-toastify'

import { Table } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup } from '@/components/ui/radio-group'
import { Dropdown } from '@/components/ui/dropdown-menu'

import { normalizeSlug } from '@/utils/normalize-slug'
import { generateRegistrationCode } from '@/utils/generate-student-code'

import { useDeleteClass } from '../_hooks/use-delete-class'
import { useGetClassById } from '../_hooks/use-get-class-by-id'

import { useDeleteStudent } from './_hooks/use-delete-student'
import { useCreateStudent } from './_hooks/use-create-student'

import { FilterData, filterSchema, StudentData, studentSchema } from './_schema'
import ImportStudents from './_components/import-students'
import AllStudentsList from './_components/all-student-list'

export interface IParams {
  [key: string]: string[]
}

export default function Content() {
  const { data: session } = useSession()

  const { push } = useRouter()
  const { slug } = useParams<IParams>()
  const { id } = normalizeSlug(slug)

  const { watch, register: registerFilter } = useForm<FilterData>({
    resolver: zodResolver(filterSchema),
  })
  const { search } = watch()

  const { data: team, refetch } = useGetClassById({ id })
  const { mutate: handleDeleteClass } = useDeleteClass()
  const { mutate: handleCreateStudent } = useCreateStudent()
  const { mutate: handleDeleteStudent } = useDeleteStudent()

  const [showDialog, setShowDialog] = useState(false)
  const [showStudentsList, setShowStudentsList] = useState(true)

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

  const visibleRows = search
    ? team?.students.filter((item) =>
        item.name
          ?.normalize('NFD')
          .toLowerCase()
          .includes(search?.toLowerCase().normalize('NFD')),
      )
    : team?.students

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

        <div />
      </div>

      <div className="mt-6 flex flex-col space-y-4 md:flex-row md:gap-x-4 md:space-y-0">
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

      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Estudantes da Turma</h2>

          {session?.user.role === 'PROFESSOR' && (
            <Button onClick={() => setShowDialog(true)} size="sm">
              <UserPlus className="size-4" /> Adicionar estudante
            </Button>
          )}
        </div>

        <div className="relative flex items-center">
          <Search className="absolute left-2 size-5 text-zinc-400" />
          <Input
            placeholder="Pesquisar..."
            {...registerFilter('search')}
            className="h-10 border-none ps-8 shadow-none"
          />
        </div>

        <div className="mt-4 space-y-2 rounded-md bg-white shadow-sm">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Nome</Table.Head>
                <Table.Head>E-mail</Table.Head>
                <Table.Head
                  className={
                    session?.user.role === 'PROFESSOR' ? '' : 'invisible'
                  }
                >
                  Ações
                </Table.Head>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {visibleRows?.map((student) => (
                <Fragment key={student.id}>
                  <Table.Row>
                    <Table.Cell>{student.name}</Table.Cell>
                    <Table.Cell>{student.email}</Table.Cell>
                    <Table.Cell>
                      <div className="flex justify-center">
                        <Dropdown.Root>
                          <Dropdown.Trigger asChild>
                            {session?.user.role === 'PROFESSOR' && (
                              <Button
                                size="icon"
                                variant="secondary"
                                className="h-8 w-8"
                              >
                                <EllipsisVertical className="size-5" />
                              </Button>
                            )}
                          </Dropdown.Trigger>

                          <Dropdown.Content side="left">
                            <Dropdown.Item asChild>
                              <Link
                                href={`/auth/estudantes/detalhes/${student.id}`}
                              >
                                <ContactRound className="size-5" /> Detalhes
                              </Link>
                            </Dropdown.Item>

                            <Dropdown.Item asChild>
                              <Dialog.Root>
                                <Dialog.Trigger asChild>
                                  <button className="relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none">
                                    <Trash className="size-4" /> Excluir
                                  </button>
                                </Dialog.Trigger>
                                <Dialog.Content>
                                  <Dialog.Header>
                                    <Dialog.Title>
                                      Excluir Estudante
                                    </Dialog.Title>

                                    <Dialog.Description>
                                      Você está prestes a excluir{' '}
                                      <b>{student.name}</b>. O Estudante não
                                      poderá ser recuperado
                                    </Dialog.Description>
                                  </Dialog.Header>

                                  <Dialog.Footer className="gap-y-4">
                                    <Dialog.Close asChild>
                                      <Button variant="outline">
                                        Cancelar
                                      </Button>
                                    </Dialog.Close>

                                    <Dialog.Close asChild>
                                      <Button
                                        type="button"
                                        onClick={() => {
                                          handleDeleteStudent(
                                            { id: student.id },
                                            {
                                              onSuccess: () => {
                                                refetch()
                                                toast.success(
                                                  'Estudante deletado com sucesso!',
                                                )
                                              },
                                              onError: (err) => {
                                                toast.error(
                                                  'Houve um erro ao excluir o estudante. Tente novamente mais tarde.',
                                                )

                                                return err
                                              },
                                            },
                                          )
                                        }}
                                        variant="destructive"
                                      >
                                        Sim, excluir
                                      </Button>
                                    </Dialog.Close>
                                  </Dialog.Footer>
                                </Dialog.Content>
                              </Dialog.Root>
                            </Dropdown.Item>
                          </Dropdown.Content>
                        </Dropdown.Root>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                </Fragment>
              ))}

              {visibleRows?.length === 0 && (
                <Table.Row>
                  <Table.Cell colSpan={3}>
                    <div className="text-center">Nenhum aluno encontrado</div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>

            <Table.Footer></Table.Footer>
          </Table.Root>
        </div>

        {session?.user.role === 'PROFESSOR' && (
          <>
            <ImportStudents />

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
                      'Esta turma não pode ser excluída, pois há estudantes cadastrados nela.'}

                    {team.students.length === 0 &&
                      'Atenção! Ao excluir esta turma, todos os dados serão perdidos e não será possível recuperá-la.'}
                  </Dialog.Description>
                </Dialog.Header>

                <Dialog.Footer className="gap-y-4">
                  <Dialog.Close asChild>
                    <Button variant="secondary">Cancelar</Button>
                  </Dialog.Close>

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
          </>
        )}
      </div>

      <Dialog.Root open={showDialog} onOpenChange={setShowDialog}>
        <Dialog.Content className="flex h-full flex-col md:grid md:h-auto md:flex-row">
          <Dialog.Header>
            <Dialog.Title>Cadastrar novo estudante na turma</Dialog.Title>
            <Dialog.Description />
          </Dialog.Header>

          {showStudentsList && (
            <AllStudentsList setShowStudentsList={setShowStudentsList} />
          )}

          {!showStudentsList && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-0.5">
                <Label>Nome do estudante</Label>

                <div className="relative">
                  <Input {...register('name')} className="peer" />

                  <div className="invisible absolute left-0 top-4 w-full rounded-md bg-red-500 p-4 peer-focus:visible"></div>
                </div>
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
          )}
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
