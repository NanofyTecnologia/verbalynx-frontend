import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import { Providers } from '@/providers'

import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Verbalynx',
    template: '%s | Verbalynx',
  },
  description: 'Avaliação de alunos e feedbacks de atividades',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
