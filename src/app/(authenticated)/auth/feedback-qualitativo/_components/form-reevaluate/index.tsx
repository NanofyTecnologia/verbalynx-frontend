'use client'

import Link from 'next/link'
import { Fragment, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FolderCheck, BoomBox, Camera, Link2, Plus, Play } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Tooltip } from '@/components/ui/tooltip'
import { Textarea } from '@/components/ui/textarea'

import { normalizeSlug } from '@/utils/normalize-slug'
import { useGetByRubricId } from '@/hooks/services/use-get-rubric-by-id'

import { IParams } from '../../[...slug]/content'

import { criterionSchema, type CriterionData } from './_schema'
import { useCreateRevaluation } from './_hooks/use-create-revaluation'

type IProps = {
  taskId: string | undefined
  onReloadFeedback: VoidFunction
}

type Criterion = {
  id: string
  name: string
  level: number
  score: number[]
  comment: string[]
  description: string
}

export default function FormReevaluate(props: IProps) {
  const { taskId, onReloadFeedback } = props

  const dialogClose = useRef<HTMLButtonElement | null>(null)
  const { slug } = useParams<IParams>()
  const { id } = normalizeSlug(slug)
  const inputTipRef = useRef<HTMLInputElement>(null)

  const { mutate: handleCreateRevaluation } = useCreateRevaluation()

  const [selectedTip, setSelectedTip] = useState('')
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
      score: 0,
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
            onValueChange={(value) => {
              const parsedValue = JSON.parse(value)

              setSelectedCriterion(parsedValue)
              setValue('criterionId', parsedValue.id)
            }}
          >
            <Select.Trigger>
              <Select.Value placeholder="Selecione o critério" />
            </Select.Trigger>

            <Select.Content>
              {criteria?.map((item) => (
                <Fragment key={item.id + new Date().toISOString()}>
                  <Select.Item value={JSON.stringify(item)}>
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
          <Label>Comentário nível</Label>

          <Textarea
            disabled
            defaultValue={selectedCritetion?.comment[watch('level') - 1]}
          />
        </div>

        <div className="space-y-0.5">
          <Label>Complemento</Label>

          <Textarea {...register('comment')} />
        </div>

        <div className="space-y-0.5">
          <Label>Dicas para o critério</Label>

          <div className="flex items-center gap-4">
            {tips?.map((item) => {
              const tip = item.split('_')[0]
              const url = item.split('_')[1]

              return (
                <Fragment key={item}>
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger>
                        <Link
                          href={url}
                          target="_blank"
                          className="block rounded-full border border-muted-foreground p-2 data-[active=true]:bg-muted-foreground data-[active=true]:text-white"
                        >
                          {tip === '1' ? (
                            <FolderCheck className="size-4" />
                          ) : tip === '2' ? (
                            <Play className="size-4" />
                          ) : tip === '3' ? (
                            <Camera className="size-4" />
                          ) : (
                            <Link2 className="size-4" />
                          )}
                        </Link>
                      </Tooltip.Trigger>

                      <Tooltip.Content>{url}</Tooltip.Content>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </Fragment>
              )
            })}

            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  className="rounded-full border border-dashed border-muted-foreground p-2 data-[active=true]:bg-muted-foreground data-[active=true]:text-white"
                >
                  <Plus className="size-4" />
                </button>
              </Dialog.Trigger>

              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title className="text-base">
                    Insira a dica para o aluno
                  </Dialog.Title>
                  <Dialog.Description />
                </Dialog.Header>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    data-active={selectedTip === '1'}
                    onClick={() => setSelectedTip('1')}
                    className="rounded-full border border-muted-foreground p-2 data-[active=true]:bg-muted-foreground data-[active=true]:text-white"
                  >
                    <FolderCheck className="size-4" />
                  </button>

                  <button
                    type="button"
                    data-active={selectedTip === '2'}
                    onClick={() => setSelectedTip('2')}
                    className="rounded-full border border-muted-foreground p-2 data-[active=true]:bg-muted-foreground data-[active=true]:text-white"
                  >
                    <Play className="size-4" />
                  </button>

                  <button
                    type="button"
                    data-active={selectedTip === '3'}
                    onClick={() => setSelectedTip('3')}
                    className="rounded-full border border-muted-foreground p-2 data-[active=true]:bg-muted-foreground data-[active=true]:text-white"
                  >
                    <Camera className="size-4" />
                  </button>

                  <button
                    type="button"
                    data-active={selectedTip === '4'}
                    onClick={() => setSelectedTip('4')}
                    className="rounded-full border border-muted-foreground p-2 data-[active=true]:bg-muted-foreground data-[active=true]:text-white"
                  >
                    <Link2 className="size-4" />
                  </button>
                </div>

                <Input placeholder="URL" ref={inputTipRef} />

                <Dialog.Footer>
                  <Dialog.Close asChild>
                    <Button variant="secondary">Cancelar</Button>
                  </Dialog.Close>

                  <Dialog.Close asChild>
                    <Button
                      onClick={() => {
                        if (!inputTipRef.current) return

                        setValue('tips', [
                          ...(watch('tips') ?? []),
                          `${selectedTip}_${inputTipRef.current?.value}`,
                        ])

                        setSelectedTip('')
                        inputTipRef.current.value = ''
                      }}
                    >
                      Salvar
                    </Button>
                  </Dialog.Close>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Root>
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
