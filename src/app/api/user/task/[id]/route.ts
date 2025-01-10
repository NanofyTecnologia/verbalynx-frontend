import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { HttpError } from '@/helpers/http-error'

import { getTasks } from './service'
import { IParams } from '@/app/api/types'

export async function GET(req: NextRequest, props: IParams) {
  const params = await props.params
  try {
    const id = params.id
    const classId = req.nextUrl.searchParams.get('classId')

    const tasks = await getTasks(id, classId)

    return NextResponse.json(tasks, { status: HttpStatusCode.Ok })
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

    return NextResponse.json(true, { status: HttpStatusCode.Ok })
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json('INTERNAL_SERVER_ERROR', {
      status: HttpStatusCode.InternalServerError,
    })
  }
}
