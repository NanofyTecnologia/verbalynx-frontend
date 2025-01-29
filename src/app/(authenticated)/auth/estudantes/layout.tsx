'use client'

import { Suspense, type PropsWithChildren } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { FeedbackData, feedbackSchema } from './_schema'

export default function Layout({ children }: PropsWithChildren) {
  const methods = useForm<FeedbackData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      feedback: [
        {
          comment: '',
          criterion: {
            id: '',
            description: '',
            score: [],
            comment: [],
            level: 0,
            name: '',
          },
          criterionId: '',
          level: -1,
          score: 0,
          tips: [],
        },
      ],
    },
  })

  return (
    <FormProvider {...methods}>
      <Suspense>{children}</Suspense>
    </FormProvider>
  )
}
