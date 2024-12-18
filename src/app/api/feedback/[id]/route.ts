import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { HttpError } from '@/helpers/http-error'

import { IParams } from '../../types'
import {
  getById,
  updateFeedback,
  createRevaluationByFeedbackID,
} from './service'

export async function GET(req: NextRequest, props: IParams) {
  const params = await props.params
  try {
    const id = params.id

    const rubric = await getById(id)

    return NextResponse.json(rubric, { status: HttpStatusCode.Ok })
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

    const revaluation = await createRevaluationByFeedbackID(id, body)

    return NextResponse.json(revaluation, { status: HttpStatusCode.Ok })
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
    const body = await req.json()

    const revaluation = await updateFeedback(id, body)

    return NextResponse.json(revaluation, { status: HttpStatusCode.Ok })
  } catch (error) {
    console.log(error)
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json('INTERNAL_SERVER_ERROR', {
      status: HttpStatusCode.InternalServerError,
    })
  }
}
