import { HttpStatusCode } from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

import { IParams } from '@/app/api/types'
import { HttpError } from '@/helpers/http-error'

import { getClassById } from './service'

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const classes = await getClassById(params.id)

    return NextResponse.json(classes, { status: HttpStatusCode.Ok })
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json('INTERNAL_SERVER_ERROR', {
      status: HttpStatusCode.InternalServerError,
    })
  }
}
