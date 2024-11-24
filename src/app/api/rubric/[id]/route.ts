import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { HttpError } from '@/helpers/http-error'

import { IParams } from '../../types'
import { getRubricByTaskId } from './service'

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const id = params.id

    const rubric = await getRubricByTaskId(id)

    return NextResponse.json(rubric, { status: HttpStatusCode.Ok })
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json('INTERNAL_SERVER_ERROR', {
      status: HttpStatusCode.InternalServerError,
    })
  }
}
