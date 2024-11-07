'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Fragment, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ChevronRight, HelpCircle, UserPlus } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

import { normalizeSlug } from '@/utils/normalize-slug'

import { useGetClassById } from '../_hooks/use-get-class-by-id'

import { StudentData, studentSchema } from './_schema'
import { RadioGroup } from '@/components/ui/radio-group'

export interface IParams {
  [key: string]: string[]
}

export default function Page() {
  const { slug } = useParams<IParams>()
  const { id } = normalizeSlug(slug)

  const { data: team } = useGetClassById({ id })
  const [showDialog, setShowDialog] = useState(false)

  const { register, handleSubmit } = useForm<StudentData>({
    resolver: zodResolver(studentSchema),
  })

  const onSubmit: SubmitHandler<StudentData> = (data) => {
    console.log(data)
  }

  if (!team) {
    return null
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Detalhes da turma</h2>

        <HelpCircle className="text-zinc-500" />
      </div>

      <div className="mt-4 flex justify-between">
        <p className="text-sm">
          Data de criação:{' '}
          <span className="font-semibold">
            {format(team?.createdAt, 'dd/MM/yyy')}
          </span>
        </p>

        <p>
          Nº Estudantes:{' '}
          <span className="font-semibold">{team.students.length}</span>
        </p>
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

      <Dialog.Root open={showDialog} onOpenChange={setShowDialog}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Cadastrar novo estudante na turma</Dialog.Title>
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
                <Label className="text-sm">Código da Matrícula</Label>

                <Input {...register('registrationCode')} />
              </div>
            </div>

            <div className="space-y-0.5">
              <Label>Pronomes</Label>

              <RadioGroup.Root className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <RadioGroup.Item id="pronoun-1" value="ele/dele" />

                  <Label htmlFor="pronoun-1">Ele / Dele</Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroup.Item id="pronoun-2" value="ela/dela" />

                  <Label htmlFor="pronoun-2">Ela / Dela</Label>
                </div>
              </RadioGroup.Root>
            </div>

            <div className="space-y-0.5">
              <Label className="text-sm">Observação</Label>

              <Textarea {...register('registrationCode')} />
            </div>

            <Dialog.Footer className="gap-4">
              <Dialog.Close asChild>
                <Button variant="outline">Cancelar</Button>
              </Dialog.Close>

              <Button>Salvar</Button>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
