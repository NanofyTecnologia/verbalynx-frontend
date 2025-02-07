import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import { TokenExpiredError } from 'jsonwebtoken'

import { HttpError } from '@/helpers/http-error'

import { resetPassword } from './service'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    await resetPassword(body)

    return NextResponse.json('Ok', { status: HttpStatusCode.Ok })
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return NextResponse.json('Token inválido', {
        status: HttpStatusCode.BadRequest,
      })
    }

    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json(JSON.stringify(error), {
      status: HttpStatusCode.InternalServerError,
    })
  }
}
