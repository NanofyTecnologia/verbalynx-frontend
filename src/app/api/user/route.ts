import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { HttpError } from '@/helpers/http-error'

import { createUser, getUserById } from './service'

export async function GET() {
  try {
    const user = await getUserById()

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

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    await createUser(data)

    return NextResponse.json('ok', { status: HttpStatusCode.Ok })
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json(JSON.stringify(error), {
      status: HttpStatusCode.InternalServerError,
    })
  }
}
