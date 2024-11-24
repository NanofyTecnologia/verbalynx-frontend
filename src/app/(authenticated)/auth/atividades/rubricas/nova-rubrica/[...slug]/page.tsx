'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ChevronLeft, HelpCircle, CirclePlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

import { normalizeSlug } from '@/utils/normalize-slug'

import { useGetTaskById } from '../../../_hooks/use-get-tasks-by-id'

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
  scores: number[]
}

export interface IParams {
  [key: string]: string[]
}

export default function Page() {
  const { back } = useRouter()
  const { slug } = useParams<IParams>()
  const { id } = normalizeSlug(slug)

  const { data: tasks } = useGetTaskById({ id })
  const [showDialogHelp, setShowDialogHelp] = useState(false)

  const [criteria, setCriteria] = useState<Criterion[]>([
    { name: '', description: '', level: 1, scores: [] },
  ])

  const addCriterion = () => {
    if (criteria.length < 3) {
      setCriteria((prev) => [
        ...prev,
        { name: '', description: '', level: 1, scores: [] },
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

  if (!tasks) {
    return null
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Button size="icon" onClick={() => back()}>
          <ChevronLeft className="size-5" />
        </Button>

        <h2 className="text-lg font-semibold">Nova Rubrica</h2>

        <button onClick={() => setShowDialogHelp(true)}>
          <HelpCircle className="text-zinc-500" />
        </button>
      </div>

      <Dialog.Root open={showDialogHelp} onOpenChange={setShowDialogHelp}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Ajuda - Nova rubrica</Dialog.Title>
          </Dialog.Header>

          <div className="text-sm">
            Nesta página o professor poderá criar uma nova rubrica para a
            atividade em questão, informando um nome, critérios e níveis.
          </div>

          <Dialog.Footer>
            <Link href={'/auth/ajuda'}>
              <Button type="submit">Ver tutoriais</Button>
            </Link>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>

      <form className="mt-6 space-y-6 text-sm">
        <div className="space-y-0.5">
          <Label>Atividade</Label>
          <Input defaultValue={tasks.name} disabled />
        </div>

        <div className="space-y-0.5">
          <Label>Nome da rubrica</Label>
          <Input placeholder="Insira um nome para a rubrica..." />
        </div>

        <div className="space-y-0.5">
          <Label>Turma</Label>
          <Input defaultValue={tasks.class.name} disabled />
        </div>

        <div className="space-y-0.5">
          <Label>Objetivo</Label>
          <Input placeholder="Ex: Avaliar conhecimento" />
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
                <Input placeholder="Ex: Este critério tem por finalidade..." />
              </div>

              {/* Seleção do Número de Níveis */}
              <div className="space-y-0.5">
                <Label>N° de níveis</Label>
                <Select.Root
                  onValueChange={(value) =>
                    updateCriterion(index, 'level', Number(value))
                  }
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
                        const updatedScores = [...criterion.scores]
                        updatedScores[levelIndex] = Number(value)
                        updateCriterion(index, 'scores', updatedScores)
                      }}
                    >
                      <Select.Trigger>
                        <Select.Value
                          placeholder={
                            criterion.scores[levelIndex]
                              ? `${criterion.scores[levelIndex]} pontos`
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
          {criteria.length < 3 && (
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
      </form>
    </>
  )
}
