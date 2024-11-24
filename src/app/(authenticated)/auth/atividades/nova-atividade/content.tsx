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

import { useGetClassesById } from '@/hooks/services/use-get-classes-by-id'

import { TaskData, taskSchema } from './_schema'
import { useCreateTask } from './_hooks/use-create-task'

const points = [
  '0',
  '5',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55',
  '60',
  '65',
  '70',
  '75',
  '80',
  '85',
  '90',
  '95',
  '100',
]

interface Criterion {
  name: string
  description: string
  level: number
  score: number[]
}

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
    { name: '', description: '', level: 1, score: [] },
  ])

  console.log(criteria)

  const onSubmit: SubmitHandler<TaskData> = (data) => {
    handleCreateTask(
      {
        ...data,
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
        { name: '', description: '', level: 1, score: [] },
      ])
    }
  }

  const removeCriterion = (index: number) => {
    setCriteria((prev) => prev.filter((_, i) => i !== index))
  }

  const updateCriterion = (
    index: number,
    key: keyof Criterion,
    value: string | number | number[],
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
          <Label>Nome da Atividade</Label>
          <Input
            {...register('name')}
            placeholder="Ex: Atividade Didática XX.X"
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
          <Label>Objetivo Geral da Atividade</Label>
          <Input {...register('objective')} disabled={isSubmitting} />
        </div>

        <div className="space-y-0.5">
          <Label>Nome da Rubrica</Label>
          <Input
            {...register('rubric.name')}
            placeholder="Ex: Atividade Didática XX.X"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-6">
          {/* Mapeamento da quantidade de critérios */}
          {criteria.map((criterion, index) => (
            <div key={index} className="relative space-y-4 border-b pb-4">
              {/* Botão de Exclusão */}
              {index > 0 && (
                <Button onClick={() => removeCriterion(index)}>Excluir</Button>
              )}

              {/* Nome do Critério */}
              <div className="space-y-0.5">
                <Label>Critério {index + 1}</Label>
                <Input
                  placeholder="Insira um nome para o critério..."
                  value={criterion.name}
                  onChange={(e) =>
                    updateCriterion(index, 'name', e.target.value)
                  }
                />
              </div>

              <div className="space-y-0.5">
                <Label>Descrição do Critério {index + 1}</Label>
                <Input
                  placeholder="Ex: Este critério tem por finalidade..."
                  onChange={(e) =>
                    updateCriterion(index, 'description', e.target.value)
                  }
                />
              </div>

              {/* Seleção do Número de Níveis */}
              <div className="space-y-0.5">
                <Label>N° de níveis</Label>
                <Select.Root
                  onValueChange={(value) => {
                    updateCriterion(index, 'level', Number(value))
                  }}
                >
                  <Select.Trigger>
                    <Select.Value placeholder={`${criterion.level}`} />
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

              {/* Níveis e Pontuações */}
              <div className="space-y-2">
                {Array.from({ length: criterion.level }, (_, levelIndex) => (
                  <div key={levelIndex} className="flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder={`Nível ${levelIndex + 1}`}
                      disabled
                    />
                    <Select.Root
                      onValueChange={(value) => {
                        const updatedScores = [...criterion.score]
                        updatedScores[levelIndex] = Number(value)
                        updateCriterion(index, 'score', updatedScores)
                      }}
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
                          <Select.Item key={num} value={num}>
                            {num} pontos
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Botão Adicionar Critério */}
          {criteria.length < 30 && (
            <button
              onClick={(e) => {
                e.preventDefault()
                addCriterion()
              }}
              className="flex w-full items-center justify-center rounded-md border-2 border-dashed py-2 text-black/50"
            >
              <span>Adicionar Critério</span>
              <CirclePlus className="ml-1" size={20} />
            </button>
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
