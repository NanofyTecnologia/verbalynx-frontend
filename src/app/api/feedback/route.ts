import { HttpStatusCode } from 'axios'
import { type NextRequest, NextResponse } from 'next/server'

import { HttpError } from '@/helpers/http-error'

import { createFeedback } from './service'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const createdFeedback = await createFeedback(data)

    return NextResponse.json(createdFeedback, {
      status: HttpStatusCode.Created,
    })
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json('INTERNAL_SERVER_ERROR', {
      status: HttpStatusCode.InternalServerError,
    })
  }
}
