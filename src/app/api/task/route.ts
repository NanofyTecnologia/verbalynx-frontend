import { HttpStatusCode } from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

import { HttpError } from '@/helpers/http-error'

import { createTask } from './service'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const createdTask = await createTask(data)

    return NextResponse.json(createdTask, { status: HttpStatusCode.Ok })
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json('INTERNAL_SERVER_ERROR', {
      status: HttpStatusCode.InternalServerError,
    })
  }
}
