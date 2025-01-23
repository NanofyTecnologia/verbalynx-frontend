import { type DefaultSession } from 'next-auth'

type Role = 'ADMIN' | 'STUDENT' | 'PROFESSOR' | 'PENDING_APPROVAL'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: Role
      registrationCode: string
    } & DefaultSession['user']
  }

  interface User {
    id: string
    role: Role
    registrationCode: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: Role
    registrationCode: string
  }
}
