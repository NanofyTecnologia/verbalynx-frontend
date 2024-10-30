import { HelpCircle } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-center justify-between font-semibold">
          <h2 className="font-semibold">O que fazer agora?</h2>

          <HelpCircle className="text-zinc-500" />
        </div>

        <Link
          href="/"
          className="rounded-md bg-[#73D997] p-2 text-center font-semibold"
        >
          Editar perfil
        </Link>

        <Link
          href="/"
          className="rounded-md bg-[#73D997] p-2 text-center font-semibold"
        >
          Turmas
        </Link>

        <Link
          href="/"
          className="rounded-md bg-[#73D997] p-2 text-center font-semibold"
        >
          Estudantes
        </Link>

        <Link
          href="/"
          className="rounded-md bg-[#73D997] p-2 text-center font-semibold"
        >
          Atividades
        </Link>
      </div>
    </>
  )
}
