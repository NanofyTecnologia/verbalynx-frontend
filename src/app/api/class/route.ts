import { HttpStatusCode } from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

import { HttpError } from '@/helpers/http-error'

import { createClass, getClassesByUserId } from './service'

export async function GET() {
  try {
    const classes = await getClassesByUserId()

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

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const createdClass = await createClass(data)

    return NextResponse.json(createdClass, { status: HttpStatusCode.Ok })
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json('INTERNAL_SERVER_ERROR', {
      status: HttpStatusCode.InternalServerError,
    })
  }
}
