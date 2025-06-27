import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { HttpError } from '@/helpers/http-error'

import { getAllStudents } from './service'
import { Role } from '@prisma/client'

export async function GET(req: NextRequest) {
  try {
    const role = req.nextUrl.searchParams.get('role') as Role
    const teamId = req.nextUrl.searchParams.get('teamId')

    const allStudents = await getAllStudents({ teamId, role })

    return NextResponse.json(allStudents, { status: HttpStatusCode.Ok })
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.message, { status: error.status })
    }

    return NextResponse.json(JSON.stringify(error), {
      status: HttpStatusCode.InternalServerError,
    })
  }
}
