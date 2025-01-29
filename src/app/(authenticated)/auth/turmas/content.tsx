'use client'

import Link from 'next/link'
import { Fragment, useState } from 'react'
import { useSession } from 'next-auth/react'
import { GraduationCap, SquarePlus, Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { useGetClassesById } from '@/hooks/services/use-get-classes-by-id'
import { normalize } from '@/utils/normalize'
import { Highlight } from '@/utils/highlight'

export default function Content() {
  const { data } = useSession()
  const [search, setSearch] = useState('')

  const { data: classes, isLoading } = useGetClassesById()

  const filteredData = classes?.filter((item) =>
    normalize(item.name).includes(normalize(search)),
  )

  return (
    <>
      {data?.user.role === 'PROFESSOR' && (
        <div className="mt-6 text-end">
          <Button className="shadow" asChild>
            <Link href="/auth/turmas/nova-turma">
              Nova turma <SquarePlus />
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
        <h3 className="font-semibold">Minhas turmas</h3>

        <div className="mt-2 space-y-4">
          {filteredData?.length === 0 && (
            <div className="text-center">
              <p className="my-12 font-semibold">Nenhuma turma cadastrada</p>
            </div>
          )}

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
                <Link
                  href={`/auth/turmas/${item.id}`}
                  style={{ borderColor: '#49BE25' }}
                  className="flex items-center gap-4 rounded-md border-s-4 bg-white px-4 py-2.5"
                >
                  <span
                    style={{ borderColor: '#49BE25' }}
                    className="rounded-full border p-3"
                  >
                    <GraduationCap
                      style={{ color: '#49BE25' }}
                      className="size-5"
                    />
                  </span>

                  <p>
                    <Highlight text={item.name} search={search} />
                  </p>
                </Link>
              </Fragment>
            ))}
        </div>
      </div>
    </>
  )
}
