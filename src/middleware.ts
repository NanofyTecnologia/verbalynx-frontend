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
      '/auth/atividades/ver-rubricas/:path*': ['PROFESSOR', 'STUDENT'],
      '/auth/:path*': ['ADMIN', 'STUDENT', 'PROFESSOR'],
      '/aguardando-aprovacao': ['PENDING_APPROVAL'],
    }

    const matchedRoute = Object.keys(allowedRolesForRoute).find((route) => {
      const routeRegex = new RegExp(`^${route.replace(/:[^/]+(\*)?/g, '.*')}$`)
      return routeRegex.test(req.nextUrl.pathname)
    })

    if (userRole === 'PENDING_APPROVAL') {
      return NextResponse.redirect(new URL('/aguardando-aprovacao', req.url))
    }

    if (!matchedRoute) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    if (!allowedRolesForRoute[matchedRoute]?.includes(userRole)) {
      if (token?.id) {
        return NextResponse.redirect(new URL('/auth', req.url))
      }

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
