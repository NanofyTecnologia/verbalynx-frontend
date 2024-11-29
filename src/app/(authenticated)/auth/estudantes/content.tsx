'use client'

import Link from 'next/link'
import { Fragment } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { SquarePlus } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'

import { useGetClassesById } from '@/hooks/services/use-get-classes-by-id'

import { useGetStudentsByClassId } from './_hooks/use-get-students-by-class-id'
import { useGetTasksByStudentId } from './_hooks/use-get-tasks-by-student-id'
import { FeedbackData } from './_schema'

export default function Content() {
  const { data } = useSession()

  const { watch, setValue } = useFormContext<FeedbackData>()

  const { team, student } = watch()

  const { data: teams } = useGetClassesById()
  const { data: students } = useGetStudentsByClassId({ id: team?.id ?? '' })
  const { data: tasks } = useGetTasksByStudentId({
    id: student?.id ?? '',
    classId: team?.id ?? '',
  })

  return (
    <>
      {data?.user.role === 'PROFESSOR' && (
        <div className="mt-6 text-end">
          <Button className="shadow" asChild>
            <Link href="">
              Novo estudante <SquarePlus />
            </Link>
          </Button>
        </div>
      )}

      <div className="mt-6 space-y-6">
        <div className="space-y-0.5">
          <Label>Turma</Label>

          <Select.Root
            onValueChange={(value) => setValue('team', JSON.parse(value))}
          >
            <Select.Trigger>
              <Select.Value placeholder="Selecione a turma" />
            </Select.Trigger>
            <Select.Content>
              {teams?.map(({ id, name }) => (
                <Fragment key={id}>
                  <Select.Item value={JSON.stringify({ id, name })}>
                    {name}
                  </Select.Item>
                </Fragment>
              ))}

              {teams?.length === 0 && (
                <Select.Item
                  value="not-found"
                  disabled
                  className="justify-center"
                >
                  Nenhuma turma encontrada
                </Select.Item>
              )}
            </Select.Content>
          </Select.Root>
        </div>

        <div className="space-y-0.5">
          <Label>Estudante</Label>

          <Select.Root
            onValueChange={(value) => setValue('student', JSON.parse(value))}
          >
            <Select.Trigger disabled={!team}>
              <Select.Value placeholder="Selecione o estudante" />
            </Select.Trigger>

            <Select.Content>
              {students?.map(({ id, name }) => (
                <Fragment key={id}>
                  <Select.Item value={JSON.stringify({ id, name })}>
                    {name}
                  </Select.Item>
                </Fragment>
              ))}

              {students?.length === 0 && (
                <Select.Item
                  value="not-found"
                  disabled
                  className="justify-center"
                >
                  Nenhum estudante encontrado
                </Select.Item>
              )}
            </Select.Content>
          </Select.Root>
        </div>

        <div className="space-y-0.5">
          <Label>Atividade</Label>

          <Select.Root
            onValueChange={(value) => setValue('task', JSON.parse(value))}
          >
            <Select.Trigger disabled={!student}>
              <Select.Value placeholder="Selecione a atividade" />
            </Select.Trigger>
            <Select.Content>
              {tasks?.map(({ id, name }) => (
                <Fragment key={id}>
                  <Select.Item value={JSON.stringify({ id, name })}>
                    {name}
                  </Select.Item>
                </Fragment>
              ))}

              {tasks?.length === 0 && (
                <Select.Item
                  value="not-found"
                  disabled
                  className="justify-center"
                >
                  Nenhuma atividade encontrada
                </Select.Item>
              )}
            </Select.Content>
          </Select.Root>
        </div>

        <Button type="submit" className="w-full" asChild>
          <Link href="/auth/estudantes/olhos-de-lince">Avaliar agora</Link>
        </Button>
      </div>
    </>
  )
}
