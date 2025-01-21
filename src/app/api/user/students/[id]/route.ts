import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { IParams } from '@/app/api/types'
import { HttpError } from '@/helpers/http-error'

import { createManyStudents, getStudentById } from './service'

export async function GET(req: NextRequest, props: IParams) {
  const params = await props.params
  try {
    const id = params.id

    const student = await getStudentById(id)

    return NextResponse.json(student, { status: HttpStatusCode.Ok })
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json('INTERNAL_SERVER_ERROR', {
      status: HttpStatusCode.InternalServerError,
    })
  }
}

export async function POST(req: NextRequest, props: IParams) {
  const params = await props.params
  try {
    const id = params.id
    const body = await req.json()

    await createManyStudents(body, id)

    return NextResponse.json('', { status: HttpStatusCode.Ok })
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json('INTERNAL_SERVER_ERROR', {
      status: HttpStatusCode.InternalServerError,
    })
  }
}
