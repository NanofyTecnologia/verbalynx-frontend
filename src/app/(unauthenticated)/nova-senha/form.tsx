'use client'

import Link from 'next/link'
import { useState } from 'react'
import { KeyRound } from 'lucide-react'
import { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { recoverPasswordSchema, RecoverPasswordData } from './_schema'
import { useResetPassword } from './_hooks/use-reset-password'

export default function Form() {
  const { replace } = useRouter()

  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const { mutate: handleResetPassword } = useResetPassword()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoverPasswordData>({
    resolver: zodResolver(recoverPasswordSchema),
  })

  const onSubmit: SubmitHandler<RecoverPasswordData> = (data) => {
    setIsSubmitting(true)
    // setIsSubmittingSuccessful(true)

    if (!token) return
    const { confirmPassword: _, ...restData } = data

    handleResetPassword(
      { ...restData, token },
      {
        onSuccess: () => {
          setIsSubmitting(false)
          toast.success('Senha alterada com sucesso!', {
            position: 'bottom-center',
          })
          replace('/')
        },
        onError: (error) => {
          setIsSubmitting(false)
          if (error instanceof AxiosError) {
            toast.error(error.response?.data, { position: 'bottom-center' })

            return
          }

          toast.error(
            'Ops! Houve algum problema durante o processo de recuperação.',
            { position: 'bottom-center' },
          )
        },
      },
    )
  }

  return (
    <>
      <div className="w-full text-start">
        <h1 className="text-lg font-semibold">Alterar senha</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <Input
          type="password"
          placeholder="Nova senha"
          {...register('password')}
          className="h-10 ps-7"
          error={errors.password?.message}
          startIcon={<KeyRound className="absolute left-2 z-50 size-4" />}
        />

        <Input
          type="password"
          placeholder="Confirmar senha"
          {...register('confirmPassword')}
          className="h-10 ps-7"
          error={errors.confirmPassword?.message}
          startIcon={<KeyRound className="absolute left-2 z-50 size-4" />}
        />

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
            'Enviar'
          )}
        </Button>
      </form>

      <div className="mt-6 flex items-center text-center">
        <Link href="/" className="block text-sm hover:underline">
          Acessar plataforma
        </Link>
      </div>
    </>
  )
}
