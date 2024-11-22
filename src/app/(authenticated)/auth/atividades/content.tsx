'use client'

import Link from 'next/link'
import { Fragment } from 'react'
import { useSession } from 'next-auth/react'
import { SquarePlus } from 'lucide-react'
import { NanoEye } from '@/assets/svgs'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { useGetTasks } from './_hooks/use-get-tasks'

export default function Content() {
  const { data } = useSession()

  const { data: tasks, isLoading } = useGetTasks()

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
        <div className="mt-2 space-y-4">
          {isLoading &&
            Array.from({ length: 8 }).map((_, item) => (
              <Fragment key={item}>
                <div className="flex h-[66px] items-center gap-4 rounded-md">
                  <Skeleton className="h-[66px] w-full" />
                </div>
              </Fragment>
            ))}

          {!isLoading &&
            tasks?.map((item) => (
              <Fragment key={item.id}>
                <Link
                  href={`/auth/turmas/${item.id}`}
                  style={{ borderColor: '#49BE25' }}
                  className="flex items-center gap-4 rounded-md border-s-4 bg-white px-4 py-2.5"
                >
                  <div className="rounded-md border bg-white p-4">
                    <div className="flex items-start gap-2">
                      <span className="size-8 rounded-full border-2"></span>

                      <div className="space-y-1">
                        <p>
                          Atividade:{' '}
                          <span className="font-semibold">{item.name}</span>
                        </p>

                        <p>
                          Turma: <span className="font-semibold">XX.X</span>
                        </p>

                        {/* <p>
                          Abertura:{' '}
                          <span className="font-semibold">
                            {item.openingDate}
                          </span>
                        </p>

                        <p>
                          Fechamento:{' '}
                          <span className="font-semibold">
                            {item.closingDate}
                          </span>
                        </p> */}
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
                </Link>
              </Fragment>
            ))}
        </div>
      </div>
    </>
  )
}
