'use client'

import Link from 'next/link'
import { Fragment } from 'react'
import { useSession } from 'next-auth/react'
import { GraduationCap, SquarePlus } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { useGetClassesById } from './_hooks/use-get-classes-by-id'

export default function Content() {
  const { data } = useSession()

  const { data: classes, isLoading } = useGetClassesById({ id: data?.user.id })

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
        <Input className="bg-white" placeholder="Pesquisar..." />
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">Minhas turmas</h3>

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
            classes?.map((item) => (
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

                  {item.name}
                </Link>
              </Fragment>
            ))}
        </div>
      </div>
    </>
  )
}
