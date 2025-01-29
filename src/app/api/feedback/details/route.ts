import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { HttpError } from '@/helpers/http-error'

import { getFeedbackDetails } from './service'

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId')
    const teamId = req.nextUrl.searchParams.get('teamId')
    const taskId = req.nextUrl.searchParams.get('taskId')

    const feedbackDetails = await getFeedbackDetails({ userId, teamId, taskId })

    return NextResponse.json(feedbackDetails, { status: HttpStatusCode.Ok })
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json('INTERNAL_SERVER_ERROR', {
      status: HttpStatusCode.InternalServerError,
    })
  }
}
