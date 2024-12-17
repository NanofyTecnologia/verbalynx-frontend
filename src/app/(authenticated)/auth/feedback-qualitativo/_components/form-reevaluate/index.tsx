'use client'

import { Fragment, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FolderCheck, BoomBox, Camera, Link2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

import { normalizeSlug } from '@/utils/normalize-slug'
import { useGetByRubricId } from '@/hooks/services/use-get-rubric-by-id'

import { IParams } from '../../[...slug]/content'

import { criterionSchema, type CriterionData } from './_schema'
import { useCreateRevaluation } from './_hooks/use-create-revaluation'
import { toast } from 'react-toastify'

type IProps = {
  taskId: string | undefined
  onReloadFeedback: () => void
}

type Criterion = {
  id: string
  name: string
  level: number
  score: number[]
  description: string
}

export default function FormReevaluate(props: IProps) {
  const { taskId, onReloadFeedback } = props

  const dialogClose = useRef<HTMLButtonElement | null>(null)

  const { slug } = useParams<IParams>()
  const { id } = normalizeSlug(slug)

  const { mutate: handleCreateRevaluation } = useCreateRevaluation()

  const [selectedCritetion, setSelectedCriterion] = useState<Criterion | null>(
    null,
  )
  const { data: criteria } = useGetByRubricId({
    id: taskId ?? '',
  })

  const { watch, setValue, register, handleSubmit } = useForm<CriterionData>({
    resolver: zodResolver(criterionSchema),
    defaultValues: {
      tips: [],
    },
  })

  const { tips } = watch()

  const onSubmit: SubmitHandler<CriterionData> = (data) => {
    handleCreateRevaluation(
      { id, ...data },
      {
        onSuccess: () => {
          onReloadFeedback()
          toast.success('Feedback enviado com sucesso!')
          dialogClose.current?.click()
        },
      },
    )
  }

  const onSelectTip = (tip: string) => {
    const isTipAlreadySelected = tips?.includes(tip)

    if (isTipAlreadySelected) {
      setValue(
        'tips',
        tips?.filter((item) => item !== tip),
      )

      return
    }

    setValue('tips', [...(tips ?? []), tip])
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-0.5">
          <Label>Critério</Label>

          <Select.Root
            onValueChange={(value) => setValue('criterionId', value)}
          >
            <Select.Trigger>
              <Select.Value placeholder="Selecione o critério" />
            </Select.Trigger>

            <Select.Content>
              {criteria?.map((item) => (
                <Fragment key={item.id + new Date().toISOString()}>
                  <Select.Item
                    value={item.id}
                    onClick={() => setSelectedCriterion(item)}
                  >
                    {item.name}
                  </Select.Item>
                </Fragment>
              ))}
            </Select.Content>
          </Select.Root>
        </div>

        <div className="space-y-0.5">
          <Label>Descrição</Label>

          <Input defaultValue={selectedCritetion?.description} disabled />
        </div>

        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-4 space-y-0.5">
            <Label>Nível de Qualidade</Label>

            <Select.Root
              onValueChange={(value) => {
                setValue('level', Number(value))
                setValue(
                  'score',
                  selectedCritetion?.score[Number(value) - 1] ?? 0,
                )
              }}
            >
              <Select.Trigger>
                <Select.Value placeholder="Selecione o nível de qualidade" />
              </Select.Trigger>
              <Select.Content>
                {Array.from({ length: selectedCritetion?.level ?? 0 }).map(
                  (_, index) => (
                    <Fragment key={index + new Date().toISOString()}>
                      <Select.Item value={String(index + 1)}>
                        Nível {index + 1}
                      </Select.Item>
                    </Fragment>
                  ),
                )}
              </Select.Content>
            </Select.Root>
          </div>

          <div className="col-span-2 space-y-0.5">
            <Label>Pontos</Label>

            <Input {...register('score')} disabled />
          </div>
        </div>

        <div className="space-y-0.5">
          <Label>Comentário</Label>

          <Textarea {...register('comment')} />
        </div>

        <div className="space-y-0.5">
          <Label>Dicas para o critério</Label>

          <div className="flex items-center gap-4">
            <button
              type="button"
              data-active={!!tips?.includes('1')}
              onClick={() => onSelectTip('1')}
              className="rounded-full border border-muted-foreground p-2 data-[active=true]:bg-muted-foreground data-[active=true]:text-white"
            >
              <FolderCheck className="size-5" />
            </button>

            <button
              type="button"
              data-active={!!tips?.includes('2')}
              onClick={() => onSelectTip('2')}
              className="rounded-full border border-muted-foreground p-2 data-[active=true]:bg-muted-foreground data-[active=true]:text-white"
            >
              <BoomBox className="size-5" />
            </button>

            <button
              type="button"
              data-active={!!tips?.includes('3')}
              onClick={() => onSelectTip('3')}
              className="rounded-full border border-muted-foreground p-2 data-[active=true]:bg-muted-foreground data-[active=true]:text-white"
            >
              <Camera className="size-5" />
            </button>

            <button
              type="button"
              data-active={!!tips?.includes('4')}
              onClick={() => onSelectTip('4')}
              className="rounded-full border border-muted-foreground p-2 data-[active=true]:bg-muted-foreground data-[active=true]:text-white"
            >
              <Link2 className="size-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Dialog.Close asChild ref={dialogClose}>
            <Button variant="ghost">Cancelar</Button>
          </Dialog.Close>

          <Button type="submit">Concluir avaliação</Button>
        </div>
      </form>
    </>
  )
}
