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
  }
  feedbackCriterion: {
    id: string
    tips: string[]
    level: number
    score: number
    comment: string
  }[]
}

export type CreateFeedbackParams = {
  taskId: string
  classId: string
  studentId: string
  feedbacks: {
    tips: string[]
    comment: string
    criterionId: string
    level: number
    score: number
  }[]
}
export type CreateFeedbackResponse = {
  id: string
}
