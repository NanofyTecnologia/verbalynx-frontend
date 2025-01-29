'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ChevronLeft, Info } from 'lucide-react'
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Dialog } from '@/components/ui/dialog'

import { ClassData, classSchema } from './schema'
import { useCreateClass } from './_hooks/use-create-class'

export default function Content() {
  const { back, replace } = useRouter()

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassData>({
    resolver: zodResolver(classSchema),
  })

  const [showDialog, setShowDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutate: handleCreateClass } = useCreateClass()

  const onSubmit: SubmitHandler<ClassData> = (data) => {
    setIsSubmitting(true)

    handleCreateClass(
      { ...data, isActive: true },
      {
        onSuccess: () => {
          setIsSubmitting(false)
          toast.success('Turma adicionada com sucesso!')
          replace('/auth/turmas')
        },
        onError: () => {
          setIsSubmitting(false)

          toast.error('Ops! Houve algum problema ao cadastrar a nova turma.')
        },
      },
    )
  }

  const { period, educationLevel } = watch()

  return (
    <>
      <div className="flex items-center justify-between">
        <Button size="icon" onClick={() => back()}>
          <ChevronLeft className="size-5" />
        </Button>

        <h2 className="text-lg font-semibold">Nova Turma</h2>

        <button onClick={() => setShowDialog(true)}>
          <Info className="text-zinc-500" />
        </button>
      </div>

      <Dialog.Root open={showDialog} onOpenChange={setShowDialog}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Info - Nova Turma</Dialog.Title>
          </Dialog.Header>

          <div className="text-sm">
            Crie novas turmas e organize seu ambiente de ensino. Informe o nome
            da turma, o turno e o nível de ensino.
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
          <Label>Nome</Label>

          <Input
            error={errors.name?.message}
            {...register('name')}
            placeholder="Insira o nome da turma"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-0.5">
          <Label>Turno</Label>

          <Select.Root
            value={period}
            onValueChange={(value) => setValue('period', value)}
          >
            <Select.Trigger
              error={errors.period?.message}
              disabled={isSubmitting}
            >
              <Select.Value placeholder="Selecione o período" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="Manhã">Manhã</Select.Item>

              <Select.Item value="Tarde">Tarde</Select.Item>

              <Select.Item value="Noite">Noite</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        <div className="space-y-0.5">
          <Label>Nível de Ensino</Label>

          <Select.Root
            value={educationLevel}
            onValueChange={(value) => setValue('educationLevel', value)}
          >
            <Select.Trigger
              error={errors.educationLevel?.message}
              disabled={isSubmitting}
            >
              <Select.Value placeholder="Selecione o Nível de Ensino" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="Fundamental">Ensino Fundamental</Select.Item>

              <Select.Item value="Ensino Médio">Ensino Médio</Select.Item>

              <Select.Item value="Ensino Superior">Ensino Superior</Select.Item>

              <Select.Item value="Outro">Outro</Select.Item>
            </Select.Content>
          </Select.Root>
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
            'Criar turma'
          )}
        </Button>
      </form>
    </>
  )
}
