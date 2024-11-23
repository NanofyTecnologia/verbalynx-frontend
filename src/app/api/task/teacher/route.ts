import { HttpStatusCode } from 'axios'
import { NextResponse } from 'next/server'

import { HttpError } from '@/helpers/http-error'

import { getTaskByTeacher } from './service'

export async function GET() {
  try {
    const tasks = await getTaskByTeacher()

    return NextResponse.json(tasks, { status: HttpStatusCode.Ok })
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json('INTERNAL_SERVER_ERROR', {
      status: HttpStatusCode.InternalServerError,
    })
  }
}
