'use client'

import { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { ThreeDots } from 'react-loader-spinner'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AtSign } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { signInSchema, type SignInData } from './schema'

export default function SignIn() {
  const { data } = useSession()
  const { replace } = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    setIsSubmitting(true)

    await signIn('email', {
      ...data,
      redirect: false,
    })

    setIsSubmitting(false)
  }

  useEffect(() => {
    if (data?.user.id) {
      replace('/auth')
    }
  }, [data, replace])

  return (
    <>
      {isSubmitSuccessful && (
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">E-mail enviado com sucesso!</h1>
          <p className="text-sm font-medium text-zinc-500">
            Confira sua caixa de entrada para encontrar o link de acesso à
            plataforma.
          </p>

          <div className="flex items-center justify-center">
            <Button onClick={() => reset()} variant="link">
              Enviar novamente
            </Button>
          </div>
        </div>
      )}

      {!isSubmitSuccessful && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div className="relative flex items-center">
            <AtSign className="absolute left-2 size-4" />

            <Input
              {...register('email')}
              placeholder="E-mail"
              className="h-10 ps-7"
              disabled={isSubmitting}
            />
          </div>

          <Button
            type="submit"
            className="h-10 w-full text-black"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ThreeDots
                width={35}
                height={35}
                color="#000"
                visible={true}
                ariaLabel="three-dots-loading"
              />
            ) : (
              'Acessar'
            )}
          </Button>
        </form>
      )}
    </>
  )
}
