import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { HttpError } from '@/helpers/http-error'

import { getAllStudents } from './service'

export async function GET(req: NextRequest) {
  try {
    const allStudents = await getAllStudents()

    return NextResponse.json(allStudents, { status: HttpStatusCode.Ok })
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json(JSON.stringify(error), {
      status: HttpStatusCode.InternalServerError,
    })
  }
}
