import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { HttpError } from '@/helpers/http-error'

import { getTasks } from './service'
import { IParams } from '@/app/api/types'

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const id = params.id

    const tasks = await getTasks(id)

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
