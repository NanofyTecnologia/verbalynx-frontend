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
