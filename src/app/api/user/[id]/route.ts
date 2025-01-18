import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { deleteUserById, updateUser } from './service'
import { HttpError } from '@/helpers/http-error'

import { IParams } from '../../types'

export async function PUT(req: NextRequest, props: IParams) {
  const params = await props.params
  try {
    const id = params.id
    const data = await req.json()

    const user = await updateUser(id, data)

    return NextResponse.json(user)
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json('INTERNAL_SERVER_ERROR', {
      status: HttpStatusCode.InternalServerError,
    })
  }
}

export async function DELETE(req: NextRequest, props: IParams) {
  const params = await props.params
  try {
    const id = params.id

    const user = await deleteUserById(id)

    return NextResponse.json(user)
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json('INTERNAL_SERVER_ERROR', {
      status: HttpStatusCode.InternalServerError,
    })
  }
}
