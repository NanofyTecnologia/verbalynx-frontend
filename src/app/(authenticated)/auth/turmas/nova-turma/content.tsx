'use client'

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
import { Select } from '@/components/ui/select'
import { Dialog } from '@/components/ui/dialog'

import { ClassData, classSchema } from './schema'
import { useCreateClass } from './_hooks/use-create-class'
import { useState } from 'react'

export default function Content() {
  const { back, replace } = useRouter()

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ClassData>({
    resolver: zodResolver(classSchema),
  })

  const { mutate: handleCreateClass } = useCreateClass()
  const [showDialog, setShowDialog] = useState(false)

  const onSubmit: SubmitHandler<ClassData> = (data) => {
    handleCreateClass(
      { ...data },
      {
        onSuccess: () => {
          toast.success('Turma adicionada com sucesso!')
          replace('/auth/turmas')
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
            da turma, o período letivo e o nível de ensino.
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
            {...register('name')}
            placeholder="Ex: Turma 8ºB"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-0.5">
          <Label>Período</Label>

          <Select.Root
            value={period}
            onValueChange={(value) => setValue('period', value)}
          >
            <Select.Trigger disabled={isSubmitting}>
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
          <Label>Ensino </Label>

          <Select.Root
            value={educationLevel}
            onValueChange={(value) => setValue('educationLevel', value)}
          >
            <Select.Trigger disabled={isSubmitting}>
              <Select.Value placeholder="Selecione o ensino" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="Ensino Fundamental">
                Ensino Fundamental
              </Select.Item>

              <Select.Item value="Ensino Superior">Ensino Superior</Select.Item>

              <Select.Item value="Ensino Médio">Ensino Fundamental</Select.Item>

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
            'Salvar'
          )}
        </Button>
      </form>
    </>
  )
}
