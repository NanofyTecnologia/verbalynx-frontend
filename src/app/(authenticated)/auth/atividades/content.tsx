'use client'

import Link from 'next/link'
import { Fragment, useState } from 'react'
import { useSession } from 'next-auth/react'
import { SquarePlus, Search } from 'lucide-react'
import { format } from 'date-fns'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { NanoEye } from '@/assets/svgs'
import { normalize } from '@/utils/normalize'
import { Highlight } from '@/utils/highlight'

import { useGetTasks } from './_hooks/use-get-tasks'

export default function Content() {
  const { data } = useSession()
  const [search, setSearch] = useState('')

  const { data: tasks, isLoading } = useGetTasks()

  const filteredData = tasks?.filter((item) =>
    normalize(item.name).includes(normalize(search)),
  )

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
        <div className="flex items-center gap-4">
          <div className="relative flex flex-1 items-center">
            <Search className="absolute left-2 size-4" />

            <Input
              placeholder="Pesquisar..."
              className="h-10 bg-white ps-8"
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
          </div>
        </div>
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
            filteredData?.map((item) => (
              <Fragment key={item.id}>
                <Link href={`/auth/atividades/${item.id}`}>
                  <div className="rounded-md border bg-white p-4">
                    <div className="flex items-start gap-2">
                      <span className="size-8 rounded-full border-2"></span>

                      <div className="space-y-1">
                        <p>
                          Atividade:{' '}
                          <span className="font-semibold">
                            <Highlight text={item.name} search={search} />
                          </span>
                        </p>

                        <p>
                          Turma:
                          <span className="font-semibold">
                            {item.class.name}
                          </span>
                        </p>

                        <p>
                          Abertura:{' '}
                          <span className="text-xs font-semibold">
                            {format(item.openingDate, 'dd/MM/yyyy - HH:mm')}
                          </span>
                        </p>

                        <p>
                          Fechamento:{' '}
                          <span className="text-xs font-semibold">
                            {format(item.closingDate, 'dd/MM/yyyy - HH:mm')}
                          </span>
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
                </Link>
              </Fragment>
            ))}
        </div>
      </div>
    </>
  )
}
