export type CreateRubricParams = {
  name: string
  evaluation: {
    name: string
    level: number
    score: number[]
  }
}
