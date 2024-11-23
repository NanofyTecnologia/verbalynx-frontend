'use client'

import { Fragment, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ChevronLeft, Info } from 'lucide-react'
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Select } from '@/components/ui/select'

import { useGetClassesById } from '@/hooks/services/use-get-classes-by-id'

import { TaskData, taskSchema } from './_schema'
import { useCreateTask } from './_hooks/use-create-task'

export default function Content() {
  const { back, replace } = useRouter()
  const { data: teams } = useGetClassesById()

  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TaskData>({
    resolver: zodResolver(taskSchema),
  })

  const { mutate: handleCreateTask } = useCreateTask()
  const [showDialog, setShowDialog] = useState(false)

  const onSubmit: SubmitHandler<TaskData> = (data) => {
    handleCreateTask(
      { ...data },
      {
        onSuccess: () => {
          toast.success('Atividade adicionada com sucesso!')
          replace('/auth/atividades')
        },
      },
    )
  }

  console.log(watch('openingDate'))

  return (
    <>
      <div className="flex items-center justify-between">
        <Button size="icon" onClick={() => back()}>
          <ChevronLeft className="size-5" />
        </Button>

        <h2 className="text-lg font-semibold">Nova Atividade</h2>

        <button onClick={() => setShowDialog(true)}>
          <Info className="text-zinc-500" />
        </button>
      </div>

      <Dialog.Root open={showDialog} onOpenChange={setShowDialog}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Ajuda - Nova atividade</Dialog.Title>
          </Dialog.Header>

          <div className="text-sm">
            Crie atividades personalizadas para cada turma, escolhendo um nome
            que identifique a atividade, selecionando a rubrica de avaliação,
            definindo os níveis de desempenho e descrevendo o objetivo geral da
            aprendizagem.
          </div>

          <Dialog.Footer>
            <Link href={'/auth/ajuda'}>
              <Button type="submit">Ver tutoriais</Button>
            </Link>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <div className="space-y-0.5">
          <Label>Turma</Label>

          <Select.Root onValueChange={(value) => setValue('classId', value)}>
            <Select.Trigger>
              <Select.Value placeholder="Seleciona a turma" />
            </Select.Trigger>
            <Select.Content>
              {teams?.map((team) => (
                <Fragment key={team.id}>
                  <Select.Item value={team.id}>{team.name}</Select.Item>
                </Fragment>
              ))}
            </Select.Content>
          </Select.Root>
        </div>

        <div className="space-y-0.5">
          <Label>Nome</Label>
          <Input
            {...register('name')}
            placeholder="Ex: Atividade Didática XX.X"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-0.5">
          <Label>Rubrica</Label>
          <Input {...register('rubric')} disabled={isSubmitting} />
        </div>

        <div className="space-y-0.5">
          <Label>Nível</Label>
          <Input {...register('level')} disabled={isSubmitting} />
        </div>

        <div className="space-y-6 md:flex md:gap-5 md:space-y-0">
          <div className="flex flex-col">
            <Label>Data de abertura</Label>
            <Input
              {...register('openingDate')}
              type="datetime-local"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex flex-col">
            <Label>Data de fechamento</Label>
            <Input
              {...register('closingDate')}
              type="datetime-local"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="space-y-0.5">
          <Label>Objetivo Geral</Label>
          <Input {...register('objective')} disabled={isSubmitting} />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <ThreeDots
              width={35}
              height={35}
              color="#fff"
              visible={true}
              ariaLabel="three-dots-loading"
            />
          ) : (
            'Criar atividade'
          )}
        </Button>
      </form>
    </>
  )
}
