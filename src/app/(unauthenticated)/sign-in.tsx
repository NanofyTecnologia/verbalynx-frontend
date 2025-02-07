'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { ThreeDots } from 'react-loader-spinner'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AtSign, Dot, KeyRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { signInSchema, type SignInData } from './_schema'

export default function SignIn() {
  const { data } = useSession()
  const { replace } = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    setIsSubmitting(true)

    const req = await signIn('credentials', {
      ...data,
      redirect: false,
    })

    if (req?.status === 401) {
      setIsSubmitting(false)
      setIsInvalidCredentials(true)
    }
  }

  useEffect(() => {
    if (data?.user.id) {
      replace('/auth')
    }
  }, [data, replace])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <Input
          {...register('email')}
          placeholder="E-mail"
          className="h-10 ps-7"
          disabled={isSubmitting}
          error={errors.email?.message}
          startIcon={<AtSign className="absolute left-2 z-50 size-4" />}
        />

        <Input
          type="password"
          {...register('password')}
          placeholder="Senha"
          className="h-10 ps-7"
          disabled={isSubmitting}
          error={errors.password?.message}
          startIcon={<KeyRound className="absolute left-2 z-50 size-4" />}
        />

        {isInvalidCredentials && (
          <p className="text-center text-sm font-medium text-destructive">
            E-mail ou senha incorretos. Verifique suas credenciais e tente
            novamente.
          </p>
        )}

        <Button
          type="submit"
          className="h-10 w-full text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ThreeDots
              width={35}
              height={35}
              color="#fff"
              visible={true}
              ariaLabel="three-dots-loading"
            />
          ) : (
            'Acessar'
          )}
        </Button>
      </form>

      <div className="mt-6 flex items-center text-center">
        <Link href="/recuperar-senha" className="block text-sm hover:underline">
          Esqueceu a senha?
        </Link>

        <Dot />

        <Link href="/cadastro" className="block text-sm hover:underline">
          Criar uma conta
        </Link>
      </div>
    </>
  )
}
