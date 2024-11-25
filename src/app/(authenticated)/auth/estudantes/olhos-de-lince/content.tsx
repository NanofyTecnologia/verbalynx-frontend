'use client'

import { Fragment, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { ChevronLeft, CircleHelp } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { SearchData } from '../_schema'
import { useGetByRubricId } from './_hooks/use-get-rubric-by-id'
import { Carousel } from '@/components/ui/carousel'

export default function Content() {
  const { replace, back } = useRouter()
  const { watch, setValue, register, control } = useFormContext<SearchData>()

  const { fields, append, remove } = useFieldArray<SearchData>({
    control,
    name: 'feedback',
  })

  const handleAppend = () =>
    append({ comment: '', criterionId: '', level: NaN, score: NaN, tips: [] })

  const handleRemove = (index: number) => remove(index)

  const { team, student, task, evaluation } = watch()

  const { data: evaluations } = useGetByRubricId({ id: task?.id ?? '' })

  useEffect(() => {
    if (!team || !student || !task) {
      return replace('/auth/estudantes')
    }
  }, [watch, replace])

  if (!team || !student || !task) {
    return <></>
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Button size="icon" onClick={() => back()}>
          <ChevronLeft className="size-5" />
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
            {team.name}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="w-full max-w-24 justify-center p-1.5">Aluno:</Badge>

          <Badge variant="outline" className="w-full bg-white p-1.5">
            {student.name}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="w-full max-w-24 justify-center p-1.5">
            Atividade:
          </Badge>

          <Badge variant="outline" className="w-full bg-white p-1.5">
            {task.name}
          </Badge>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-white p-4">
        <div className="flex justify-end">
          <Button size="sm" onClick={handleAppend}>
            Adicionar critério
          </Button>
        </div>

        <Carousel.Root className="mt-4">
          <Carousel.Content>
            {fields.map((field, index) => (
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
                        onValueChange={(value) =>
                          setValue('evaluation', JSON.parse(value))
                        }
                      >
                        <Select.Trigger>
                          <Select.Value placeholder="Selecione o critério" />
                        </Select.Trigger>
                        <Select.Content>
                          {evaluations?.map(
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

                      <Input disabled {...register('evaluation.description')} />
                    </div>

                    <div className="grid grid-cols-6 gap-4">
                      <div className="col-span-4 space-y-0.5">
                        <Label>Nível de Qualidade</Label>

                        <Select.Root
                        /* onValueChange={(value) => setValue('level', Number(value))} */
                        >
                          <Select.Trigger disabled={!evaluation?.id}>
                            <Select.Value placeholder="Selecione o nível de qualidade" />
                          </Select.Trigger>
                          <Select.Content>
                            {Array.from({ length: evaluation?.level }).map(
                              (_, index) => (
                                <Fragment key={index + 'level'}>
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

                        <Input
                          disabled /* value={level ? evaluation.score[level - 1] : 0} */
                        />
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <Label>Comentário</Label>

                      <Textarea /* {...register('comment')}  */ />
                    </div>
                  </div>
                </Carousel.Item>
              </Fragment>
            ))}
          </Carousel.Content>

          <div className="flex items-center justify-between py-2">
            <Carousel.Previous asChild>
              <Button size="sm">Critério anterior</Button>
            </Carousel.Previous>

            <Carousel.Next asChild>
              <Button size="sm">Próximo critério</Button>
            </Carousel.Next>
          </div>
        </Carousel.Root>

        <Button className="w-full">Concluir avaliação</Button>
      </div>
    </>
  )
}
