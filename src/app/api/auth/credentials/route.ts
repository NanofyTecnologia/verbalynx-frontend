import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { HttpError } from '@/helpers/http-error'

import { authenticateUser } from './service'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const user = await authenticateUser(body)

    return NextResponse.json(user, { status: HttpStatusCode.Ok })
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json('INTERNAL_SERVER_ERROR', {
      status: HttpStatusCode.InternalServerError,
    })
  }
}
