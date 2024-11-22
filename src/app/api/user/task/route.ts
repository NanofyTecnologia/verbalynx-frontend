import { HttpStatusCode } from 'axios'
import { NextResponse } from 'next/server'

import { HttpError } from '@/helpers/http-error'

import { getTasks } from './service'

export async function GET() {
  try {
    const tasks = await getTasks()

    return NextResponse.json(tasks, { status: HttpStatusCode.Ok })
  } catch (error) {
    console.log(error)
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json('INTERNAL_SERVER_ERROR', {
      status: HttpStatusCode.InternalServerError,
    })
  }
}
