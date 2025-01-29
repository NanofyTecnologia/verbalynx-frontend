export type CreateRubricParams = {
  name: string
  evaluation: {
    name: string
    description: string
    level: number
    comment: string[]
    score: number[]
  }[]
}

export type GetRubricByIdParams = {
  id: string | undefined
}
export type GetRubricByIdResponse = {
  id: string
  name: string
  description: string
  level: number
  comment: string[]
  score: number[]
}[]
