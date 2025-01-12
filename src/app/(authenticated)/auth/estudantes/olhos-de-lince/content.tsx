'use client'

import Link from 'next/link'
import { Fragment, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { SubmitHandler, useFieldArray, useFormContext } from 'react-hook-form'
import {
  BoomBox,
  Camera,
  ChevronLeft,
  CircleHelp,
  FolderCheck,
  Link2,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Carousel } from '@/components/ui/carousel'

import { useGetByRubricId } from '@/hooks/services/use-get-rubric-by-id'

import { FeedbackData } from '../_schema'
import { useCreateFeedback } from './_hooks/use-create-feedback'
import { useGetFeedbackDetails } from './_hooks/use-get-feedback-details'
import { team } from '@/services/class'
import { task } from '@/services/task'

export interface IParams {
  [key: string]: string[]
}

export default function Content() {
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  const { watch, setValue, register, control, handleSubmit } =
    useFormContext<FeedbackData>()
  const { teamId, userId, taskId, feedback } = watch()

  const { data: feedbackDetails } = useGetFeedbackDetails({
    userId,
    teamId,
    taskId,
  })

  const { mutate: handleCreateFeedback } = useCreateFeedback()
  const { fields, append, remove } = useFieldArray<FeedbackData>({
    control,
    name: 'feedback',
  })

  const handleAppend = () =>
    append({
      comment: '',
      criterion: {
        id: '',
        description: '',
        score: [],
        level: 0,
        name: '',
      },
      criterionId: '',
      level: 0,
      score: 0,
      tips: [],
    })

  const handleRemove = (index: number) => remove(index)

  const { data: criteria } = useGetByRubricId({
    id: taskId,
  })

  const onSubmit: SubmitHandler<FeedbackData> = (data) => {
    const { userId, teamId, taskId } = data

    handleCreateFeedback(
      {
        taskId,
        classId: teamId,
        studentId: userId,
        feedbacks: data.feedback.map(({ criterion, ...restItem }) => ({
          ...restItem,
        })),
      },
      {
        onSuccess: (data) => {
          replace(`/auth/feedback-qualitativo/${data.id}`)
        },
      },
    )
  }

  const onSelectTip = (tip: string, index: number) => {
    const oldTips = watch(`feedback.${index}.tips`)

    if (oldTips.includes(tip)) {
      setValue(`feedback.${index}.tips`, [
        ...oldTips.filter((item) => item !== tip),
      ])

      return
    }

    setValue(`feedback.${index}.tips`, [...oldTips, tip])
  }

  const isSelectedTip = (tip: string, index: number) => {
    const selectedTips = watch(`feedback.${index}.tips`)

    return !!selectedTips.includes(tip)
  }

  useEffect(() => {
    if (!teamId || !userId || !taskId) {
      return replace('/auth/estudantes')
    }
  }, [watch, replace])

  if (!team || !userId || !task) {
    return <></>
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Button size="icon" asChild>
          <Link href="/auth/estudantes">
            <ChevronLeft className="size-5" />
          </Link>
        </Button>

        <h2 className="text-lg font-semibold">Olhos de Lince</h2>

        <button>
          <CircleHelp className="text-zinc-500" />
        </button>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2">
          <Badge className="w-full max-w-24 justify-center p-1.5">Turma:</Badge>

          <Badge variant="outline" className="w-full bg-white p-1.5">
            {feedbackDetails?.team.name}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="w-full max-w-24 justify-center p-1.5">
            Estudante:
          </Badge>

          <Badge variant="outline" className="w-full bg-white p-1.5">
            {feedbackDetails?.user.name}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="w-full max-w-24 justify-center p-1.5">
            Atividade:
          </Badge>

          <Badge variant="outline" className="w-full bg-white p-1.5">
            {feedbackDetails?.task.name}
          </Badge>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-white p-4">
        <div className="flex justify-end">
          <Button size="sm" onClick={handleAppend}>
            Adicionar critério
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Carousel.Root className="mt-4">
            <Carousel.Content>
              {fields.map((field, index) => {
                return (
                  <Fragment key={field.id}>
                    <Carousel.Item>
                      <div className="space-y-4">
                        <div className="space-y-0.5">
                          <div className="flex justify-between">
                            <Label>Critério</Label>

                            <button
                              className="text-xs"
                              disabled={index === 0}
                              onClick={() => handleRemove(index)}
                            >
                              Remover critério
                            </button>
                          </div>

                          <Select.Root
                            onValueChange={(value) => {
                              setValue(
                                `feedback.${index}.criterion`,
                                JSON.parse(value),
                              )

                              setValue(
                                `feedback.${index}.criterionId`,
                                JSON.parse(value).id,
                              )
                            }}
                          >
                            <Select.Trigger>
                              <Select.Value placeholder="Selecione o critério" />
                            </Select.Trigger>
                            <Select.Content>
                              {criteria?.map(
                                ({ id, name, description, level, score }) => (
                                  <Fragment key={id + new Date().toISOString()}>
                                    <Select.Item
                                      value={JSON.stringify({
                                        id,
                                        name,
                                        score,
                                        level,
                                        description,
                                      })}
                                    >
                                      {name}
                                    </Select.Item>
                                  </Fragment>
                                ),
                              )}
                            </Select.Content>
                          </Select.Root>
                        </div>

                        <div className="space-y-0.5">
                          <Label>Descrição</Label>

                          <Input
                            disabled
                            {...register(
                              `feedback.${index}.criterion.description`,
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-6 gap-4">
                          <div className="col-span-4 space-y-0.5">
                            <Label>Nível de Qualidade</Label>

                            <Select.Root
                              onValueChange={(value) => {
                                setValue(
                                  `feedback.${index}.level`,
                                  Number(value),
                                )
                                setValue(
                                  `feedback.${index}.score`,
                                  feedback[index].criterion.score[
                                    Number(value) - 1
                                  ],
                                )
                              }}
                            >
                              <Select.Trigger
                                disabled={
                                  feedback && !feedback[index]?.criterion.id
                                }
                              >
                                <Select.Value placeholder="Selecione o nível de qualidade" />
                              </Select.Trigger>
                              <Select.Content>
                                {Array.from({
                                  length: feedback
                                    ? feedback[index]?.criterion.level
                                    : 0,
                                }).map((_, index) => (
                                  <Fragment key={index + 'level'}>
                                    <Select.Item value={String(index + 1)}>
                                      Nível {index + 1}
                                    </Select.Item>
                                  </Fragment>
                                ))}
                              </Select.Content>
                            </Select.Root>
                          </div>

                          <div className="col-span-2 space-y-0.5">
                            <Label>Pontos</Label>

                            <Input
                              disabled
                              {...register(`feedback.${index}.score`)}
                            />
                          </div>
                        </div>

                        <div className="space-y-0.5">
                          <Label>Comentário</Label>

                          <Textarea
                            {...register(`feedback.${index}.comment`)}
                          />
                        </div>

                        <div className="space-y-0.5">
                          <Label>Dicas para o critério</Label>

                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              data-active={isSelectedTip('1', index)}
                              onClick={() => onSelectTip('1', index)}
                              className="rounded-full border border-muted-foreground p-2 data-[active=true]:bg-muted-foreground data-[active=true]:text-white"
                            >
                              <FolderCheck className="size-5" />
                            </button>

                            <button
                              type="button"
                              data-active={isSelectedTip('2', index)}
                              onClick={() => onSelectTip('2', index)}
                              className="rounded-full border border-muted-foreground p-2 data-[active=true]:bg-muted-foreground data-[active=true]:text-white"
                            >
                              <BoomBox className="size-5" />
                            </button>

                            <button
                              type="button"
                              data-active={isSelectedTip('3', index)}
                              onClick={() => onSelectTip('3', index)}
                              className="rounded-full border border-muted-foreground p-2 data-[active=true]:bg-muted-foreground data-[active=true]:text-white"
                            >
                              <Camera className="size-5" />
                            </button>

                            <button
                              type="button"
                              data-active={isSelectedTip('4', index)}
                              onClick={() => onSelectTip('4', index)}
                              className="rounded-full border border-muted-foreground p-2 data-[active=true]:bg-muted-foreground data-[active=true]:text-white"
                            >
                              <Link2 className="size-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Carousel.Item>
                  </Fragment>
                )
              })}
            </Carousel.Content>

            <div className="mt-6 flex items-center justify-between py-2">
              <Carousel.Previous asChild>
                <Button size="sm">Critério anterior</Button>
              </Carousel.Previous>

              <Carousel.Next asChild>
                <Button size="sm">Próximo critério</Button>
              </Carousel.Next>
            </div>
          </Carousel.Root>

          <Button type="submit" className="w-full">
            Concluir avaliação
          </Button>
        </form>
      </div>
    </>
  )
}
