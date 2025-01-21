'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Fragment, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSession } from 'next-auth/react'

import { SquarePlus } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'

import { useGetClassesById } from '@/hooks/services/use-get-classes-by-id'

import { FeedbackData } from './_schema'
import { useGetTasksByStudentId } from './_hooks/use-get-tasks-by-student-id'
import { useGetStudentsByClassId } from './_hooks/use-get-students-by-class-id'

export default function Content() {
  const { data } = useSession()
  const searchParams = useSearchParams()

  const taskId = searchParams.get('taskId')
  const classId = searchParams.get('classId')
  const studentId = searchParams.get('userId')

  const { watch, setValue } = useFormContext<FeedbackData>()

  const { teamId, userId } = watch()

  const { data: teams } = useGetClassesById()
  const { data: students } = useGetStudentsByClassId({ id: teamId ?? '' })
  const { data: tasks } = useGetTasksByStudentId({
    id: userId ?? '',
    classId: teamId ?? '',
  })

  useEffect(() => {
    setValue('teamId', classId ?? '')
    setValue('userId', studentId ?? '')
    setValue('taskId', taskId ?? '')
  }, [setValue, classId, studentId, taskId])

  return (
    <>
      <div className="mt-6 space-y-6">
        <div className="space-y-0.5">
          <Label>Turma</Label>

          <Select.Root
            defaultValue={classId ?? ''}
            onValueChange={(value) => setValue('teamId', value)}
          >
            <Select.Trigger>
              <Select.Value placeholder="Selecione a turma" />
            </Select.Trigger>
            <Select.Content>
              {teams?.map(({ id, name }) => (
                <Fragment key={id}>
                  <Select.Item value={id}>{name}</Select.Item>
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
            defaultValue={studentId ?? ''}
            onValueChange={(value) => setValue('userId', value)}
          >
            <Select.Trigger disabled={!teamId}>
              <Select.Value placeholder="Selecione o estudante" />
            </Select.Trigger>

            <Select.Content>
              {students?.map(({ id, name }) => (
                <Fragment key={id}>
                  <Select.Item value={id}>{name}</Select.Item>
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
            defaultValue={taskId ?? ''}
            onValueChange={(value) => setValue('taskId', value)}
          >
            <Select.Trigger disabled={!userId}>
              <Select.Value placeholder="Selecione a atividade" />
            </Select.Trigger>
            <Select.Content>
              {tasks?.map(({ id, name }) => (
                <Fragment key={id}>
                  <Select.Item value={id}>{name}</Select.Item>
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

        <Button className="w-full" asChild>
          <Link href="/auth/estudantes/olhos-de-lince">Avaliar agora</Link>
        </Button>
      </div>
    </>
  )
}
