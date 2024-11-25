'use client'

import { type PropsWithChildren } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { SearchData, searchSchema } from './_schema'

export default function Layout({ children }: PropsWithChildren) {
  const methods = useForm<SearchData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      feedback: [
        {
          comment: '',
          criterionId: '',
          level: NaN,
          score: NaN,
          tips: [],
        },
      ],
    },
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}
