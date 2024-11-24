export type CreateRubricParams = {
  name: string
  evaluation: {
    name: string
    description: string
    level: number
    score: number[]
  }
}

export type GetRubricByIdParams = {
  id: string
}
