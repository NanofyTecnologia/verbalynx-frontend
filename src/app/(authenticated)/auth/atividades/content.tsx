'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { SquarePlus } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { NanoEye } from '@/assets/svgs'

import { useGetTasks } from './_hooks/use-get-tasks'

export default function Content() {
  const { data } = useSession()

  const { data: tasks } = useGetTasks()

  console.log(tasks)

  return (
    <>
      {data?.user.role === 'PROFESSOR' && (
        <div className="mt-6 text-end">
          <Button className="shadow" asChild>
            <Link href="/auth/atividades/nova-atividade">
              Nova atividade <SquarePlus />
            </Link>
          </Button>
        </div>
      )}

      <div className="mt-6">
        <Input className="bg-white" placeholder="Pesquisar..." />
      </div>

      <div className="mt-6">
        <div className="rounded-md border bg-white p-4">
          <div className="flex items-start gap-2">
            <span className="size-8 rounded-full border-2"></span>

            <div className="space-y-1">
              <p>
                Atividade: <span className="font-semibold">Didática xx.x</span>
              </p>

              <p>
                Turma: <span className="font-semibold">A</span>
              </p>

              <p>
                Abertura: <span className="font-semibold">dd/mm/yyyy</span>
              </p>

              <p>
                Fechamento: <span className="font-semibold">dd/mm/yyyy</span>
              </p>
            </div>

            <div className="ms-auto">
              {data?.user.role === 'PROFESSOR' && (
                <div className="text-end">
                  <div className="flex items-center gap-2 rounded-md bg-[#8ABF3B] px-2 py-0.5">
                    <NanoEye />
                    <NanoEye />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
