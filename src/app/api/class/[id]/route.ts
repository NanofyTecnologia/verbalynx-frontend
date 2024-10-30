import { HttpStatusCode } from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

import { HttpError } from '@/helpers/http-error'

import { getClassesByUserId } from './service'

import { IParams } from '../../types'

export async function GET(req: NextRequest, { params }: IParams) {
  try {
    const classes = await getClassesByUserId(params.id)

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
