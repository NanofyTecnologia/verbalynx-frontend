'use client'

import { useEffect, Fragment } from 'react'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormMask } from 'use-mask-input'
import { ChevronLeft } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { normalizeSlug } from '@/utils/normalize-slug'
import { cn } from '@/lib/shadcn'

import { type IParams } from '@/types/params'

import { StudentData, studentSchema } from './_schema'
import { useUpdateStudent } from './_hooks/use-update-student'
import { useGetStudentById } from './_hooks/use-get-student-by-id'

export default function Content() {
  const { push, back } = useRouter()
  const params = useParams<IParams>()
  const { id } = normalizeSlug(params.slug)

  const { data: student } = useGetStudentById({ id })
  const { mutate: handleUpdateStudent } = useUpdateStudent()

  const {
    watch,
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentData>({
    resolver: zodResolver(studentSchema),
  })
  const registerWithMask = useHookFormMask(register)

  const handleDefaultValues = () => {
    if (!student) {
      return
    }

    const { name, email, cpf, graduation } = student

    reset({
      name: name ?? '',
      email,
      cpf: cpf ?? '',
      educationLevel: graduation ?? '',
    })
  }

  const onSubmit: SubmitHandler<StudentData> = (data) => {
    handleUpdateStudent(
      { ...data },
      {
        onSuccess: () => {
          toast.success('Perfil do estudante atualizado com sucesso!')
        },
      },
    )
  }

  useEffect(handleDefaultValues, [student, reset])

  const { educationLevel } = watch()

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

        <div />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div className="space-y-0.5">
          <Label>Nome</Label>

          <Input {...register('name')} error={errors.name?.message} />
        </div>

        <div className="space-y-0.5">
          <Label>E-mail</Label>

          <Input {...register('email')} error={errors.email?.message} />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="w-full space-y-0.5">
            <Label>CPF</Label>

            <Input
              {...registerWithMask('cpf', ['999.999.999-99'], {
                showMaskOnFocus: false,
                showMaskOnHover: false,
              })}
              error={errors.cpf?.message}
            />
          </div>

          <div className="w-full space-y-0.5">
            <Label>Nível de Ensino</Label>

            <Select.Root
              defaultValue={student.graduation ?? ''}
              value={educationLevel}
              onValueChange={(value) => setValue('educationLevel', value)}
            >
              <Select.Trigger>
                <Select.Value placeholder="Selecione o ensino" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="Fundamental">Fundamental</Select.Item>

                <Select.Item value="Ensino Médio">Ensino Médio</Select.Item>

                <Select.Item value="Ensino Superior">
                  Ensino Superior
                </Select.Item>

                <Select.Item value="Outro">Outro</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Salvar</Button>
        </div>
      </form>

      <div className="mt-6 space-y-4 text-sm">
        <h3 className="text-base font-semibold">Entregas</h3>
        <div className="overflow-hidden rounded-md bg-white shadow-sm">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Atividade</Table.Head>
                <Table.Head>Turma</Table.Head>
                <Table.Head className="text-center">Avaliado</Table.Head>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {student.StudentTask.map((item, index) => (
                <Fragment key={index}>
                  <Table.Row
                    onClick={() => push(`/auth/atividades/${item.task.id}`)}
                    className="hover:cursor-pointer"
                  >
                    <Table.Cell>{item.task.name}</Table.Cell>
                    <Table.Cell>{item.task.class.name}</Table.Cell>
                    <Table.Cell>
                      <div className="text-center">
                        <span
                          className={cn(
                            'inline-block size-4 rounded-full',
                            item.isCompleted ? 'bg-green-500' : 'bg-red-500',
                          )}
                        ></span>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                </Fragment>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      </div>
    </>
  )
}
