'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { SquarePlus } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Content() {
  const { data } = useSession()

  return (
    <>
      {data?.user.role === 'PROFESSOR' && (
        <div className="mt-6 text-end">
          <Button className="shadow" asChild>
            <Link href="">
              Novo estudante <SquarePlus />
            </Link>
          </Button>
        </div>
      )}

      <div className="mt-6 space-y-6">
        <div className="space-y-0.5">
          <Label>Turma</Label>
          <Input placeholder="Ex: Turma 8ºB" />
        </div>

        <div className="space-y-0.5">
          <Label>Estudante</Label>
          <Input placeholder="Ex: Ana Maria Souza" />
        </div>

        <div className="space-y-0.5">
          <Label>Atividade</Label>
          <Input placeholder="Ex: Atividade Didática XX.X" />
        </div>

        <Button type="submit" className="w-full">
          Avaliar agora
        </Button>
      </div>
    </>
  )
}
