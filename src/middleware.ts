import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

import { env } from './lib/env/index.mjs'

type AllowedRoles = { [key: string]: string[] }

export default withAuth(
  async (req) => {
    const token = await getToken({ req, secret: env.NEXTAUTH_SECRET })
    const userRole = token?.role || ''

    const allowedRolesForRoute: AllowedRoles = {
      '/auth': ['ADMIN', 'STUDENT', 'PROFESSOR'],
      '/auth/:path*': ['ADMIN', 'STUDENT', 'PROFESSOR'],
    }

    const matchedRoute = Object.keys(allowedRolesForRoute).find((route) => {
      const routeRegex = new RegExp(`^${route.replace(/:[^/]+(\*)?/g, '.*')}$`)
      return routeRegex.test(req.nextUrl.pathname)
    })

    if (!matchedRoute) {
      console.log('!matchedRoute')
      return NextResponse.redirect(new URL('/', req.url))
    }

    if (!allowedRolesForRoute[matchedRoute]?.includes(userRole)) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
  },
  {
    secret: env.NEXTAUTH_SECRET,
    pages: {
      signIn: '/',
      signOut: '/',
      error: '/',
    },
  },
)

export const config = {
  matcher: ['/auth/:path*'],
}
