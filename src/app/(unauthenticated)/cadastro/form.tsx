'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AtSign, GraduationCap, User } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

import { RegisterData } from './_schema'
import { useCreateUser } from './_hooks/use-create-user'

export default function Form() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitSuccessful, setIsSubmittingSuccessful] = useState(false)

  const { mutate: handleCreateUser } = useCreateUser()

  const { watch, setValue, register, handleSubmit } = useForm<RegisterData>()

  const onSubmit: SubmitHandler<RegisterData> = (data) => {
    setIsSubmitting(true)

    handleCreateUser(
      { ...data },
      {
        onSuccess() {
          setIsSubmitting(false)
          setIsSubmittingSuccessful(true)
        },
        onError() {
          setIsSubmitting(false)
        },
      },
    )
  }

  const { graduation } = watch()

  return (
    <>
      {!isSubmitSuccessful && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div className="relative flex items-center">
            <User className="absolute left-2 size-4" />

            <Input
              {...register('name')}
              placeholder="Nome completo"
              className="h-10 ps-7"
            />
          </div>

          <div className="relative flex items-center">
            <AtSign className="absolute left-2 size-4" />

            <Input
              {...register('email')}
              placeholder="E-mail"
              className="h-10 ps-7"
            />
          </div>

          <div className="relative flex items-center">
            <Select.Root
              value={graduation}
              onValueChange={(value) => setValue('graduation', value)}
            >
              <Select.Trigger className="h-10 justify-start px-2">
                <GraduationCap className="me-1 size-4" />

                <Select.Value
                  className="ml-auto"
                  placeholder="Selecione o ensino"
                />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="Ensino Superior">
                  Ensino Superior
                </Select.Item>

                <Select.Item value="Ensino Médio">Ensino Médio</Select.Item>

                <Select.Item value="Ensino Fundamental">
                  Ensino Fundamental
                </Select.Item>

                <Select.Item value="Outro">Outro</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>

          <Button type="submit" className="w-full">
            {isSubmitting ? (
              <ThreeDots
                width={35}
                height={35}
                color="#fff"
                visible={true}
                ariaLabel="three-dots-loading"
              />
            ) : (
              'Criar conta'
            )}
          </Button>
        </form>
      )}

      {isSubmitSuccessful && (
        <div className="space-y-6 text-start">
          <h2 className="text-lg font-bold uppercase">Parabéns</h2>

          <p>
            Você realizou com sucesso seu cadastro na{' '}
            <span className="uppercase">Verbalynx</span>.
          </p>

          <p className="font-semibold">
            Em breve o seu acesso completo será liberado pelo administrador!
          </p>
        </div>
      )}

      <div className="mt-6">
        <Link href="/">Voltar para login</Link>
      </div>
    </>
  )
}
