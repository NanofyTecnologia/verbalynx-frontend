'use client'

import { Fragment, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { ChevronLeft, CircleHelp } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { SearchData } from '../_schema'
import { useGetByRubricId } from './_hooks/use-get-rubric-by-id'

export default function Content() {
  const { replace, back } = useRouter()
  const { watch, setValue, register } = useFormContext<SearchData>()

  const { team, student, task, evaluation, level } = watch()

  const { data: evaluations } = useGetByRubricId({ id: task?.id ?? '' })

  useEffect(() => {
    if (!team || !student || !task) {
      return replace('/auth/estudantes')
    }
  }, [watch, replace])

  if (!team || !student || !task) {
    return <></>
  }

  console.log(level)

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
        <form className="space-y-4">
          <div className="space-y-0.5">
            <Label>Critério</Label>

            <Select.Root
              onValueChange={(value) =>
                setValue('evaluation', JSON.parse(value))
              }
            >
              <Select.Trigger>
                <Select.Value placeholder="Selecione o critério" />
              </Select.Trigger>
              <Select.Content>
                {evaluations?.map(({ id, name, description, level, score }) => (
                  <Fragment key={id}>
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
                ))}
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
                onValueChange={(value) => setValue('level', Number(value))}
              >
                <Select.Trigger disabled={!evaluation?.id}>
                  <Select.Value placeholder="Selecione o nível de qualidade" />
                </Select.Trigger>
                <Select.Content>
                  {Array.from({ length: evaluation?.level }).map((_, index) => (
                    <Fragment key={index + new Date().toDateString()}>
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

              <Input disabled value={level ? evaluation.score[level - 1] : 0} />
            </div>
          </div>

          <div className="space-y-0.5">
            <Label>Comentário</Label>

            <Textarea {...register('comment')} />
          </div>

          <Button className="w-full">Concluir avaliação</Button>
        </form>
      </div>
    </>
  )
}
