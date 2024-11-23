'use client'

import Image from 'next/image'
import { Fragment, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import Logo from '@/assets/svgs/icon.svg'
import { normalize } from '@/utils/normalize'
import { Highlight } from '@/utils/highlight'

const videos = [
  {
    name: 'Como inserir estudantes',
  },
  {
    name: 'Como inserir atividades',
  },
]

export default function Content() {
  const { data } = useSession()
  const [search, setSearch] = useState('')

  const filteredData = videos.filter((item) =>
    normalize(item.name).includes(normalize(search)),
  )

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex flex-1 items-center">
            <Search className="absolute left-2 size-4" />

            <Input
              placeholder="Pesquisar..."
              className="h-10 bg-white ps-8"
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
          </div>

          {data?.user.role === 'ADMIN' && (
            <Button>
              <Plus />
            </Button>
          )}
        </div>

        {filteredData.map((item, index) => (
          <Fragment key={index}>
            <div className="rounded-md bg-white p-4 shadow">
              <div className="flex justify-center rounded-md bg-[#8ABF3B]/30 py-6">
                <Image src={Logo} alt="" />
              </div>

              <h2 className="mt-4 font-semibold uppercase">
                <Highlight text={item.name} search={search} />
              </h2>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  )
}
