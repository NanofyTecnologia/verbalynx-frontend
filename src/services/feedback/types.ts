export type GetFeedbackByIdParams = {
  id: string | undefined
}
export type GetFeedbackByIdResponse = {
  student: {
    name: string
  }
  class: {
    name: string
  }
  task: {
    id: string
    name: string
    rubric: {
      criterion: {
        score: number[]
        comment: string[]
      }[]
    }
  }
  feedbackCriterion: {
    id: string
    tips: string[]
    level: number
    score: number
    comment: string
    criterion: {
      name: string
      comment: string[]
    }
  }[]
}

export type GetFeedbackDetailsParams = {
  taskId: string
  userId: string
  teamId: string
}
export type GetFeedBackDetailsResponse = {
  task: {
    id: string
    name: string
  }
  user: {
    id: string
    name: string
  }
  team: {
    id: string
    name: string
  }
}

export type CreateFeedbackParams = {
  taskId: string
  classId: string
  studentId: string
  feedbacks: {
    tips: string[]
    comment?: string
    criterionId: string
    level: number
    score: number
  }[]
}
export type CreateFeedbackResponse = {
  id: string
}

export type CreateRevaluationParams = {
  id: string | undefined
  level: number
  score: number
  comment: string
  criterionId: string
  tips?: string[] | undefined
}
export type CreateRevaluationResponse = {
  id: string
}

export type UpdateFeedbackParams = Partial<CreateFeedbackParams> & {
  id: string
  isClosed: boolean
}
export type UpdateFeedbackResponse = { id: string }
