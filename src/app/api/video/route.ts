import { HttpStatusCode } from 'axios'
import { type NextRequest, NextResponse } from 'next/server'

import { HttpError } from '@/helpers/http-error'

import { createVideo, getVideos } from './service'

export async function GET() {
  try {
    const videos = await getVideos()

    return NextResponse.json(videos, { status: HttpStatusCode.Ok })
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json('INTERNAL_SERVER_ERROR', {
      status: HttpStatusCode.InternalServerError,
    })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const createdVideo = await createVideo(body)

    return NextResponse.json(createdVideo, { status: HttpStatusCode.Ok })
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json('INTERNAL_SERVER_ERROR', {
      status: HttpStatusCode.InternalServerError,
    })
  }
}
