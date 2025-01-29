'use client'

import { useEffect, useState, Fragment } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form'
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { ChevronLeft, CirclePlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { normalizeSlug } from '@/utils/normalize-slug'
import { zodResolver } from '@hookform/resolvers/zod'

import { useGetTaskById } from '../../_hooks/use-get-task-by-id'
import { TaskEditData, taskEditSchema } from './_schema'
import { useUpdateTask } from './_hooks/use-update-task'
import { useDeleteCriterion } from './_hooks/use-delete-criterion'
import json from '@/data/points.json'

export interface IParams {
  [key: string]: string[]
}

interface Criterion {
  name: string
  description: string
  level: number
  comment: string[]
  score: number[]
}

const points = json.points

export default function Content() {
  const { replace, back } = useRouter()
  const { slug } = useParams<IParams>()
  const { id } = normalizeSlug(slug)

  const { data: tasks } = useGetTaskById({ id })
  const { mutate: handleUpdateTask } = useUpdateTask()
  const { mutate: handleDeleteCriterion } = useDeleteCriterion()

  const {
    watch,
    reset,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TaskEditData>({
    resolver: zodResolver(taskEditSchema),
  })

  const { fields, append, remove } = useFieldArray<TaskEditData>({
    control,
    name: 'criterion',
  })

  const handleDefaultValues = () => {
    if (!tasks) {
      return
    }

    const { name, objective, openingDate, closingDate, rubric } = tasks

    const formatTimestampToDate = (timestamp: Date) => {
      return new Date(timestamp).toISOString().slice(0, 16)
    }

    reset({
      name,
      objective: objective ?? '',
      openingDate: formatTimestampToDate(openingDate),
      closingDate: formatTimestampToDate(closingDate),
      rubric,
      criterion: rubric.criterion,
    })
  }

  const onSubmit: SubmitHandler<TaskEditData> = (data) => {
    if (!id) return

    // const { selectedComment } = data

    handleUpdateTask(
      {
        id,
        ...data,
        rubric: { ...data.rubric },
      },
      {
        onSuccess: () => {
          toast.success('Perfil do estudante atualizado com sucesso!')
          replace(`/auth/atividades/${id}`)
        },
      },
    )
  }

  const updateCriterion = (
    index: number,
    key: keyof Criterion,
    value: string | number | number[] | string[],
  ) => {
    return fields.map((criterion, i) =>
      i === index ? { ...criterion, [key]: value } : criterion,
    )
  }

  useEffect(handleDefaultValues, [tasks, reset])

  const { criterion } = watch()

  if (!tasks) {
    return null
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Button size="icon" onClick={() => back()}>
          <ChevronLeft className="size-5" />
        </Button>

        <h2 className="text-lg font-semibold">Editar atividade</h2>

        <div />
      </div>

      <div className="mt-6 flex items-center gap-2">
        <Badge className="w-full max-w-36 justify-center p-1.5">Turma:</Badge>

        <Badge variant="outline" className="w-full bg-white p-1.5">
          {tasks.class.name}
        </Badge>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div className="space-y-0.5">
          <Label>Nome da atividade</Label>
          <Input
            {...register('name')}
            placeholder="Informe o nome para a nova atividade"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-0.5">
          <Label>Objetivo geral da atividade</Label>
          <Input
            {...register('objective')}
            placeholder="Escreva o objetivo geral da atividade"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-6 pt-2 md:flex md:gap-5 md:space-y-0 md:pt-0">
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
          <Label>Nome da rubrica</Label>
          <Input
            {...register('rubric.name')}
            placeholder="Insira o nome da rubrica"
            disabled={isSubmitting}
          />
        </div>

        <div>
          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <div className="mt-4 border-t border-zinc-700 pb-4 first:border-none">
                {index > 0 && (
                  <Button
                    type="button"
                    onClick={() => {
                      if (criterion[index].id) {
                        handleDeleteCriterion(
                          { id: criterion[index].id },
                          {
                            onSuccess: () => {
                              remove(index)
                            },
                            onError: (error) => {
                              if (error instanceof AxiosError) {
                                toast.error(
                                  error.response?.status === 400
                                    ? 'Ops! Há um feedback utilizando esse critério.'
                                    : 'Ops! Houve um erro ao tentar remover o critério',
                                )
                              }

                              return error
                            },
                          },
                        )

                        return
                      }

                      remove(index)
                    }}
                    className="my-4"
                    disabled={isSubmitting}
                  >
                    Excluir
                  </Button>
                )}

                <div className="space-y-4">
                  <div className="space-y-0.5">
                    <Label>Criterio {index + 1}</Label>
                    <Input
                      {...register(`criterion.${index}.name`)}
                      placeholder=""
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-0.5">
                    <Label>Descrição do critério {index + 1}</Label>
                    <Textarea
                      {...register(`criterion.${index}.description`)}
                      placeholder=""
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-0.5">
                    <Label>N° de níveis de qualidade</Label>
                    <Select.Root
                      onValueChange={(value) => {
                        setValue(`criterion.${index}.level`, Number(value))
                      }}
                      disabled={isSubmitting}
                    >
                      <Select.Trigger>
                        <Select.Value placeholder={`${field.level}`} />
                      </Select.Trigger>
                      <Select.Content>
                        {['1', '2', '3', '4', '5', '6'].map((num) => (
                          <Select.Item key={num} value={num}>
                            {num}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                  </div>

                  <div className="space-y-2">
                    {Array.from(
                      { length: criterion[index].level },
                      (_, levelIndex) => (
                        <Fragment key={levelIndex}>
                          <div className="flex items-center gap-2">
                            <Input
                              type="text"
                              placeholder={`Nível ${levelIndex + 1}`}
                              disabled
                            />
                            <Select.Root
                              onValueChange={(value) => {
                                const currentScores =
                                  watch(`criterion.${index}.score`) || []
                                const updatedScores = [...currentScores]
                                updatedScores[levelIndex] = Number(value)
                                updateCriterion(index, 'score', updatedScores)

                                setValue(
                                  `criterion.${index}.score`,
                                  updatedScores,
                                )
                              }}
                              disabled={isSubmitting}
                            >
                              <Select.Trigger>
                                <Select.Value
                                  placeholder={
                                    field.score[levelIndex]
                                      ? `${field.score[levelIndex]} pontos`
                                      : '0 pontos'
                                  }
                                />
                              </Select.Trigger>
                              <Select.Content>
                                {points.map((num) => (
                                  <Select.Item key={num} value={num}>
                                    {num} pontos
                                  </Select.Item>
                                ))}
                              </Select.Content>
                            </Select.Root>
                          </div>

                          <div className="space-y-0.5 pb-4">
                            <Label>Comentário do nível {levelIndex + 1}</Label>
                            <Textarea
                              {...register(
                                `criterion.${index}.comment.${levelIndex}`,
                              )}
                            />
                          </div>
                        </Fragment>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </Fragment>
          ))}

          {fields.length < 30 && (
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  name: '',
                  description: '',
                  level: 1,
                  score: [],
                  comment: [],
                })
              }
              className="h-10 w-full bg-white"
              disabled={isSubmitting}
            >
              <span>Adicionar critério</span>
              <CirclePlus className="ml-1" size={20} />
            </Button>
          )}
        </div>

        <div className="pt-6">
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
              'Atualizar atividade'
            )}
          </Button>
        </div>
      </form>
    </>
  )
}
