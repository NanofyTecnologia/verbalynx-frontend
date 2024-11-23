'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { ChevronLeft, CircleHelp } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { SearchData } from '../_schema'

export default function Page() {
  const { replace, back } = useRouter()
  const { watch } = useFormContext<SearchData>()

  const { team, student, task } = watch()

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
    </>
  )
}
