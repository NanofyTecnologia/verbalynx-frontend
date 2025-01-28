'use client'

import { Fragment, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ChevronLeft, Info, CirclePlus } from 'lucide-react'
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { useGetClassesById } from '@/hooks/services/use-get-classes-by-id'

import { TaskData, taskSchema } from './_schema'
import { useCreateTask } from './_hooks/use-create-task'
import json from '@/data/points.json'

interface Criterion {
  name: string
  description: string
  level: number
  score: number[]
  comment: string[]
}

const points = json.points

export default function Content() {
  const { back, replace } = useRouter()
  const { data: teams } = useGetClassesById()

  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TaskData>({
    resolver: zodResolver(taskSchema),
  })

  const { mutate: handleCreateTask } = useCreateTask()
  const [showDialog, setShowDialog] = useState(false)

  const [criteria, setCriteria] = useState<Criterion[]>([
    { name: '', description: '', level: 1, score: [], comment: [] },
  ])

  const onSubmit: SubmitHandler<TaskData> = (data) => {
    handleCreateTask(
      {
        ...data,
        isActive: true,
        rubric: {
          ...data.rubric,
          evaluation: criteria,
        },
      },
      {
        onSuccess: () => {
          toast.success('Atividade adicionada com sucesso!')
          replace('/auth/atividades')
        },
      },
    )
  }

  const addCriterion = () => {
    if (criteria.length < 30) {
      setCriteria((prev) => [
        ...prev,
        { name: '', description: '', level: 1, score: [], comment: [] },
      ])
    }
  }

  const removeCriterion = (index: number) => {
    setCriteria((prev) => prev.filter((_, i) => i !== index))
  }

  const updateCriterion = (
    index: number,
    key: keyof Criterion,
    value: string | number | number[] | string[],
  ) => {
    setCriteria((prev) =>
      prev.map((criterion, i) =>
        i === index ? { ...criterion, [key]: value } : criterion,
      ),
    )
  }

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
            definindo os níveis de qualidade e descrevendo o objetivo geral da
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

          <Select.Root
            onValueChange={(value) => setValue('classId', value)}
            disabled={isSubmitting}
          >
            <Select.Trigger>
              <Select.Value placeholder="Selecione a turma" />
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
          <Label>Nome da atividade</Label>
          <Input
            {...register('name')}
            placeholder="Informe o nome da atividade"
            disabled={isSubmitting}
          />
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
          <Label>Objetivo geral da atividade</Label>
          <Textarea
            {...register('objective')}
            disabled={isSubmitting}
            placeholder="Escreva o objetivo geral da atividade"
          />
        </div>

        <div className="space-y-0.5">
          <Label>Nome da rubrica</Label>
          <Input
            {...register('rubric.name')}
            placeholder="Insira o nome da rubrica"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-6 border-t border-muted-foreground pt-4">
          {criteria.map((criterion, index) => (
            <Fragment key={index}>
              <div className="relative space-y-6 border-b border-muted-foreground pb-4">
                {index > 0 && (
                  <Button
                    onClick={() => removeCriterion(index)}
                    disabled={isSubmitting}
                  >
                    Excluir
                  </Button>
                )}

                <div className="space-y-0.5">
                  <Label> Título do critério {index + 1}</Label>
                  <Input
                    placeholder="Insira o título do critério"
                    value={criterion.name}
                    onChange={(e) =>
                      updateCriterion(index, 'name', e.target.value)
                    }
                    error={`Insira um título para o critério ${index + 1}`}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-0.5">
                  <Label>Descrição do critério {index + 1}</Label>
                  <Textarea
                    placeholder="Descreva sobre o critério criado para a rubrica"
                    onChange={(e) =>
                      updateCriterion(index, 'description', e.target.value)
                    }
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-0.5">
                  <Label>N° de níveis de qualidade</Label>
                  <Select.Root
                    onValueChange={(value) => {
                      updateCriterion(index, 'level', Number(value))
                    }}
                    disabled={isSubmitting}
                  >
                    <Select.Trigger>
                      <Select.Value placeholder={`${criterion.level}`} />
                    </Select.Trigger>
                    <Select.Content>
                      {['1', '2', '3', '4', '5', '6'].map((num) => (
                        <Fragment key={num}>
                          <Select.Item value={num}>{num}</Select.Item>
                        </Fragment>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </div>

                <div className="space-y-6">
                  {Array.from({ length: criterion.level }, (_, levelIndex) => (
                    <Fragment key={levelIndex}>
                      <div className="flex items-center gap-2">
                        <Input
                          type="text"
                          placeholder={`Nível de Qualidade ${levelIndex + 1}`}
                          disabled
                        />

                        <Select.Root
                          onValueChange={(value) => {
                            const updatedScores = [...criterion.score]
                            updatedScores[levelIndex] = Number(value)
                            updateCriterion(index, 'score', updatedScores)
                          }}
                          disabled={isSubmitting}
                        >
                          <Select.Trigger>
                            <Select.Value
                              placeholder={
                                criterion.score[levelIndex]
                                  ? `${criterion.score[levelIndex]} pontos`
                                  : '0 pontos'
                              }
                            />
                          </Select.Trigger>
                          <Select.Content>
                            {points.map((num) => (
                              <Fragment key={num + new Date().toISOString()}>
                                <Select.Item value={num}>
                                  {num} pontos
                                </Select.Item>
                              </Fragment>
                            ))}
                          </Select.Content>
                        </Select.Root>
                      </div>

                      <div className="space-y-0.5">
                        <Label>
                          Comentário do nível de qualidade {levelIndex + 1}
                        </Label>
                        <Textarea
                          onChange={(prev) => {
                            const updateComment = [...criterion.comment]
                            updateComment[levelIndex] = String(
                              prev.target.value,
                            )
                            updateCriterion(index, 'comment', updateComment)
                          }}
                          placeholder={`Faça um comentário acerca do nível de qualidade ${levelIndex + 1}`}
                          disabled={isSubmitting}
                        />
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </Fragment>
          ))}

          {criteria.length < 30 && (
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault()
                addCriterion()
              }}
              className="mt-4 h-10 w-full"
              disabled={isSubmitting}
            >
              <span>Adicionar critério</span>
              <CirclePlus className="ml-1" size={20} />
            </Button>
          )}
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
