import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { HttpError } from '@/helpers/http-error'

import { IParams } from '../../types'
import { deleteCriterion } from './service'

export async function DELETE(req: NextRequest, props: IParams) {
  const params = await props.params
  try {
    const id = params.id

    const deletedCriterion = await deleteCriterion(id)

    return NextResponse.json(deletedCriterion, { status: HttpStatusCode.Ok })
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json('INTERNAL_SERVER_ERROR', {
      status: HttpStatusCode.InternalServerError,
    })
  }
}
