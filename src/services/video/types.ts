export type Video = {
  id: string
  url: string
  title: string
}

export type GetVideoResponse = Video[]

export type CreateVideoParams = Partial<Video>
export type CreateVideoResponse = Video

export type DeleteVideoParams = {
  id: string
}
