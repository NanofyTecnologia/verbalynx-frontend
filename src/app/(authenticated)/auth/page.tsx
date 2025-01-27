import Link from 'next/link'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'

export default async function Page() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-center justify-center font-semibold">
          <h2 className="font-semibold">O que fazer agora?</h2>
        </div>

        {session?.user.role === 'PROFESSOR' && (
          <>
            <Link
              href="/auth/perfil"
              className="rounded-md bg-[#73D997] p-2 text-center font-semibold"
            >
              Editar perfil
            </Link>

            <Link
              href="/auth/turmas"
              className="rounded-md bg-[#73D997] p-2 text-center font-semibold"
            >
              Turmas
            </Link>

            <Link
              href="/auth/estudantes"
              className="rounded-md bg-[#73D997] p-2 text-center font-semibold"
            >
              Estudantes
            </Link>

            <Link
              href="/auth/atividades"
              className="rounded-md bg-[#73D997] p-2 text-center font-semibold"
            >
              Atividades
            </Link>
          </>
        )}

        {session?.user.role === 'STUDENT' && (
          <>
            <Link
              href="/auth/perfil"
              className="rounded-md bg-[#73D997] p-2 text-center font-semibold"
            >
              Editar perfil
            </Link>

            <Link
              href="/auth/atividades"
              className="rounded-md bg-[#73D997] p-2 text-center font-semibold"
            >
              Ver Minhas Atividades
            </Link>
          </>
        )}

        {session?.user.role === 'ADMIN' && (
          <>
            <Link
              href="/auth/usuarios"
              className="rounded-md bg-[#73D997] p-2 text-center font-semibold"
            >
              Usuários
            </Link>

            <Link
              href="/auth/ajuda"
              className="rounded-md bg-[#73D997] p-2 text-center font-semibold"
            >
              Ajuda
            </Link>
          </>
        )}
      </div>
    </>
  )
}
