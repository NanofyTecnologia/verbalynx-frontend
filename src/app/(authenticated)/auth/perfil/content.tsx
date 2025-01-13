'use client'

import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormMask } from 'use-mask-input'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RadioGroup } from '@/components/ui/radio-group'

import { useGetUser } from '@/hooks/services/use-get-user'

import { UserData, userSchema } from './_schema'
import { useUpdateUser } from './_hooks/use-update-user'

export default function Content() {
  const { update, data: session } = useSession()

  const { data: user } = useGetUser()
  const { mutate: handleUpdateUser } = useUpdateUser()

  const {
    watch,
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(userSchema),
  })
  const registerWithMask = useHookFormMask(register)

  const handleDefaultValues = () => {
    if (!user) {
      return
    }

    const { name, email, cpf, pronoun } = user

    reset({ name: name ?? '', email, cpf: cpf ?? '', pronoun: pronoun ?? '' })
  }

  const onSubmit: SubmitHandler<UserData> = (data) => {
    const { name, email, pronoun } = data

    handleUpdateUser(
      {
        pronoun,
      },
      {
        onSuccess: () => {
          update({ name, email })
          toast.success('Perfil atualizado com sucesso!')
        },
      },
    )
  }

  const { pronoun } = watch()

  useEffect(handleDefaultValues, [user, reset])

  return (
    <>
      <h2 className="text-center text-lg font-semibold">Visualizar perfil</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div className="space-y-0.5">
          <Label>Nome</Label>

          <Input
            {...register('name')}
            error={errors.name?.message}
            disabled={session?.user.role === 'STUDENT'}
          />
        </div>

        <div className="space-y-0.5">
          <Label>E-mail</Label>

          <Input
            {...register('email')}
            error={errors.email?.message}
            disabled={session?.user.role === 'STUDENT'}
          />
        </div>

        <div className="space-y-0.5">
          <Label>CPF</Label>

          <Input
            {...registerWithMask('cpf', ['999.999.999-99'], {
              showMaskOnFocus: false,
              showMaskOnHover: false,
            })}
            error={errors.cpf?.message}
            disabled={session?.user.role === 'STUDENT'}
          />
        </div>

        <div className="space-y-0.5">
          <Label>Pronome</Label>

          <div className="space-y-0.5">
            <RadioGroup.Root
              value={pronoun}
              onValueChange={(value) => setValue('pronoun', value)}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-2">
                <RadioGroup.Item id="he" value="Ele/Dele" />

                <Label htmlFor="he">Ele/Dele</Label>
              </div>

              <div className="flex items-center gap-2">
                <RadioGroup.Item id="she" value="Ela/Dela" />

                <Label htmlFor="she">Ela/Dela</Label>
              </div>
            </RadioGroup.Root>

            {errors.pronoun && (
              <p className="text-xs text-destructive">
                {errors.pronoun.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </>
  )
}
