'use client'

import Link from 'next/link'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Fragment, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { ThreeDots } from 'react-loader-spinner'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'

import Logo from '@/assets/svgs/icon.svg'
import { normalize } from '@/utils/normalize'

import { VideoData, videoSchema } from './_schema'
import { useGetVideos } from './_hooks/use-get-videos'
import { useCreateVideo } from './_hooks/use-create-video'
import { useDeleteVideo } from './_hooks/use-delete-video'

export default function Content() {
  const { data: session } = useSession()

  const [search, setSearch] = useState('')
  const [showDialog, setShowDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: videos, refetch } = useGetVideos()
  const { mutate: handleCreateVideo } = useCreateVideo()
  const { mutate: handleDeleteVideo } = useDeleteVideo()

  const { register, handleSubmit } = useForm<VideoData>({
    resolver: zodResolver(videoSchema),
  })

  const filteredVideos = videos?.filter((video) =>
    normalize(video.title).includes(normalize(search)),
  )

  const highLight = (text: string, search: string) => {
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

  const onSubmit: SubmitHandler<VideoData> = (data) => {
    setIsSubmitting(true)

    handleCreateVideo(
      {
        ...data,
      },
      {
        onSuccess: () => {
          refetch()
          setShowDialog(false)
          setIsSubmitting(false)
        },
        onError: () => {
          setIsSubmitting(false)
          toast.error('Ops! Houve um problema ao adicionar o tutorial!')
        },
      },
    )
  }

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
        </div>

        {session?.user.role === 'ADMIN' && (
          <div className="flex justify-end">
            <Button onClick={() => setShowDialog(!showDialog)}>
              Adicionar video <Plus />
            </Button>
          </div>
        )}

        {filteredVideos &&
          filteredVideos?.map((video, index) => (
            <Fragment key={index}>
              <div>
                <Link href={video.url} className="block" target="blank">
                  <div className="rounded-md bg-white p-4 shadow">
                    <div className="flex justify-center rounded-md bg-[#8ABF3B]/30 py-6">
                      <Image src={Logo} alt="" />
                    </div>

                    <div className="mt-4 flex items-center">
                      <h2 className="font-semibold uppercase">
                        {highLight(video.title, search)}
                      </h2>
                    </div>
                  </div>
                </Link>

                {session?.user.role === 'ADMIN' && (
                  <div className="flex justify-end">
                    <Button
                      onClick={() =>
                        handleDeleteVideo(
                          {
                            id: video.id,
                          },
                          {
                            onSuccess: () => {
                              toast.success('Tutorial deletado com sucesso!')
                            },
                            onError: () => {
                              toast.error(
                                'Ops! Houve um problema ao deletar o tutorial',
                              )
                            },
                          },
                        )
                      }
                      variant="link"
                      className="p-0 text-xs"
                    >
                      Remover video
                    </Button>
                  </div>
                )}
              </div>
            </Fragment>
          ))}

        {filteredVideos?.length === 0 && (
          <div className="text-center">
            <p className="my-12 font-semibold">Nenhum video encontrado</p>
          </div>
        )}
      </div>

      <Dialog.Root open={showDialog} onOpenChange={setShowDialog}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Postar novo vídeo</Dialog.Title>

            <Dialog.Description aria-labelledby="Novo video" />
          </Dialog.Header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-0.5">
              <Label htmlFor="title">Título</Label>

              <Input
                id="title"
                {...register('title')}
                placeholder="Insira um título para o vídeo"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-0.5">
              <Label htmlFor="url">URL do vídeo</Label>

              <Input
                id="url"
                {...register('url')}
                placeholder="Insira a URL do vídeo"
                disabled={isSubmitting}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <ThreeDots
                  width={35}
                  height={35}
                  color="#fff"
                  visible={true}
                  ariaLabel="three-dots-loading"
                />
              ) : (
                'Enviar'
              )}
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
