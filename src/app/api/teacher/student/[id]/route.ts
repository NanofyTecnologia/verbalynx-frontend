import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { HttpError } from '@/helpers/http-error'

import { IParams } from '../../../types'
import { updateStudent } from './service'

export async function PUT(req: NextRequest, props: IParams) {
  const params = await props.params
  try {
    const id = params.id
    const data = await req.json()

    const updatedStudent = await updateStudent(id, data)

    return NextResponse.json(updatedStudent, { status: HttpStatusCode.Ok })
  } catch (error) {
    console.log(error.stack)
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json('INTERNAL_SERVER_ERROR', {
      status: HttpStatusCode.InternalServerError,
    })
  }
}
