'use client'

import Image from 'next/image'
import { Fragment, useState } from 'react'
import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'

import { normalize } from '@/utils/normalize'
import Logo from '@/assets/svgs/icon.svg'

const videos = [
  {
    title: 'Como inserir estudantes',
  },
  {
    title: 'Como inserir atividades',
  },
]

export default function Content() {
  const [search, setSearch] = useState('')

  const filteredVideos = videos.filter((video) =>
    normalize(video.title).includes(normalize(search)),
  )

  function highLight(text: string, search: string) {
    if (!search.length) return <>{text}</>

    const normalizeTitle = normalize(text)
    const normalizeSearch = normalize(search)

    if (!normalizeTitle.includes(normalizeSearch)) return <>{text}</>

    const split = normalizeTitle.split(normalizeSearch)
    let cursor = 0

    return split.map((sl, index) => {
      const fragment = text.substring(cursor, cursor + sl.length)

      if (index !== split.length - 1) {
        cursor += sl.length

        const final = (
          <Fragment key={Date.now().toString() + index}>
            {fragment}

            <span className="rounded-md bg-[#8ABF3B]/50">
              {text.substring(cursor, cursor + normalizeSearch.length)}
            </span>
          </Fragment>
        )

        cursor += normalizeSearch.length
        return final
      }

      return fragment
    })
  }

  return (
    <>
      <div className="space-y-4">
        <div className="relative flex items-center">
          <Search className="absolute left-2 size-4" />

          <Input
            placeholder="Pesquisar..."
            className="h-10 bg-white ps-8"
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
        </div>

        {filteredVideos.map((video, index) => (
          <Fragment key={index}>
            <div className="rounded-md bg-white p-4 shadow">
              <div className="flex justify-center rounded-md bg-[#8ABF3B]/30 py-6">
                <Image src={Logo} alt="" />
              </div>

              <h2 className="mt-4 font-semibold uppercase">
                {highLight(video.title, search)}
              </h2>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  )
}
