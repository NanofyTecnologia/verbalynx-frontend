'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AtSign } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { recoverPasswordSchema, RecoverPasswordData } from './_schema'
import { useSendEmail } from './_hooks'

export default function Form() {
  const { mutate: handleSendEmail } = useSendEmail()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitSuccessful, setIsSubmittingSuccessful] = useState(false)

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoverPasswordData>({
    resolver: zodResolver(recoverPasswordSchema),
  })

  const onSubmit: SubmitHandler<RecoverPasswordData> = (data) => {
    setIsSubmitting(true)

    handleSendEmail(
      { ...data },
      {
        onSuccess: () => {
          setIsSubmitting(false)
          setIsSubmittingSuccessful(true)
        },
        onError: () => {
          setIsSubmitting(false)

          toast.error('Ops! Houve algum problema durante o processo de envio.')
        },
      },
    )
  }

  return (
    <>
      <div className="w-full text-start">
        <h1 className="text-lg font-semibold">Recuperação de senha</h1>
      </div>

      {isSubmitSuccessful && (
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">E-mail enviado com sucesso!</h1>
          <p className="text-sm font-medium text-zinc-500">
            Confira sua caixa de entrada para encontrar o link de recuperação de
            senha.
          </p>

          <div className="flex items-center justify-center">
            <Button
              onClick={() => {
                reset()
                setIsSubmittingSuccessful(false)
              }}
              variant="link"
            >
              Enviar novamente
            </Button>
          </div>
        </div>
      )}

      {!isSubmitSuccessful && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <Input
            placeholder="E-mail"
            {...register('email')}
            className="h-10 ps-7"
            error={errors.email?.message}
            startIcon={<AtSign className="absolute left-2 z-50 size-4" />}
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
      )}

      <div className="mt-6 flex items-center text-center">
        <Link href="/" className="block text-sm hover:underline">
          Acessar plataforma
        </Link>
      </div>
    </>
  )
}
