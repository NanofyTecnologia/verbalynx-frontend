import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { IParams } from '@/app/api/types'
import { HttpError } from '@/helpers/http-error'

import { getStudentsById } from './service'

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const id = params.id

    const task = await getStudentsById(id)

    return NextResponse.json(task, { status: HttpStatusCode.Ok })
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json('INTERNAL_SERVER_ERROR', {
      status: HttpStatusCode.InternalServerError,
    })
  }
}