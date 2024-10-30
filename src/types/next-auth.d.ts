import { type DefaultSession } from 'next-auth'

type Role = 'ADMIN' | 'STUDENT' | 'PROFESSOR'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: Role
    } & DefaultSession['user']
  }

  interface User {
    id: string
    role: Role
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: Role
  }
}
