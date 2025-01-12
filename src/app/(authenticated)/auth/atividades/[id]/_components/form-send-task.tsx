'use client'

import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

import { type IParams } from '@/types/params'
import { normalizeSlug } from '@/utils/normalize-slug'

import { useSendTask } from '../_hooks/use-send-task'
import { SendTaskData, sendTaskSchema } from './_schema'

export default function FormSendTask() {
  const params = useParams<IParams>()
  const { id } = normalizeSlug(params.slug)

  const { mutate: handleSendTask } = useSendTask()

  const { handleSubmit, register } = useForm<SendTaskData>({
    resolver: zodResolver(sendTaskSchema),
  })

  const onSubmit: SubmitHandler<SendTaskData> = (data) => {
    handleSendTask(
      { id, ...data },
      {
        onSuccess: () => {
          toast.success('Atividade enviada com sucesso!')
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-0.5">
        <Label htmlFor="title">Título</Label>

        <Input id="title" {...register('title')} />
      </div>

      <div className="space-y-0.5">
        <Label htmlFor="url">URL</Label>

        <Input id="url" {...register('url')} />
      </div>

      <div className="space-y-0.5">
        <Label htmlFor="description">Descrição</Label>

        <Textarea id="description" {...register('description')} />
      </div>

      <Dialog.Footer className="gap-y-4">
        <Dialog.Close asChild>
          <Button variant="secondary">Cancelar</Button>
        </Dialog.Close>

        <Button type="submit">Enviar</Button>
      </Dialog.Footer>
    </form>
  )
}
