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
          criterion: {
            id: '',
            description: '',
            score: [],
            level: 0,
            name: '',
          },
          level: 0,
          score: 0,
          tips: [],
        },
      ],
    },
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}
