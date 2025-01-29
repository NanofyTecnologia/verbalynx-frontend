import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { HttpError } from '@/helpers/http-error'

import { deleteClass } from './service'
import { IParams } from '../../types'

export async function DELETE(req: NextRequest, props: IParams) {
  const params = await props.params
  try {
    const id = params.id

    await deleteClass(id)

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
