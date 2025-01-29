import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { IParams } from '@/app/api/types'
import { HttpError } from '@/helpers/http-error'

import { createStudentsInTeam, deleteStudentsInTeam } from './service'

export async function POST(req: NextRequest, props: IParams) {
  const params = await props.params
  try {
    const id = params.id
    const data = await req.json()

    await createStudentsInTeam(id, data)

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

export async function PUT(req: NextRequest, props: IParams) {
  const params = await props.params
  try {
    const id = params.id
    const data = await req.json()

    await deleteStudentsInTeam(id, data.userId)

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
