'use client'

import { Fragment } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

import { type IParams } from '@/types/params'
import { normalizeSlug } from '@/utils/normalize-slug'

import { Button } from '@/components/ui/button'

import { useGetStudentById } from './_hooks/use-get-student-by-id'
import { Label } from '@/components/ui/label'
import { Table } from '@/components/ui/table'

export default function Content() {
  const { back } = useRouter()
  const params = useParams<IParams>()
  const { id } = normalizeSlug(params.slug)

  const { data: student } = useGetStudentById({ id })

  if (!student) {
    return null
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Button size="icon" onClick={() => back()}>
          <ChevronLeft className="size-5" />
        </Button>

        <h2 className="text-lg font-semibold">Detalhes do estudante</h2>

        <div></div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="space-y-0.5">
          <Label>Nome</Label>

          <div className="flex h-10 items-center rounded-md bg-white p-2 shadow-sm">
            {student.name}
          </div>
        </div>

        <div className="space-y-0.5">
          <Label>E-mail</Label>

          <div className="flex h-10 items-center rounded-md bg-white p-2 shadow-sm">
            {student.email}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="w-full space-y-0.5">
            <Label>Pronome</Label>

            <div className="flex h-10 items-center rounded-md bg-white p-2 shadow-sm">
              {student.pronoun}
            </div>
          </div>

          <div className="w-full space-y-0.5">
            <Label>Nível de Ensino</Label>

            <div className="flex h-10 items-center rounded-md bg-white p-2 shadow-sm">
              {student.graduation}
            </div>
          </div>
        </div>

        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head>Atividade</Table.Head>
              <Table.Head>Completa</Table.Head>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {student.StudentTask.map((item, index) => (
              <Fragment key={index}>
                <Table.Row>
                  <Table.Cell>{item.task.name}</Table.Cell>
                  <Table.Cell>
                    {item.isCompleted ? 'Entregue' : 'Não entregue'}
                  </Table.Cell>
                </Table.Row>
              </Fragment>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </>
  )
}
