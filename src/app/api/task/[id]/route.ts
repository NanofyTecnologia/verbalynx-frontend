import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { HttpError } from '@/helpers/http-error'

import { updateTask } from './service'

import { IParams } from '../../types'

export async function PUT(req: NextRequest, { params }: IParams) {
  try {
    const id = params.id
    const data = await req.json()

    await updateTask(id, data)

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
