import { Adapter } from 'next-auth/adapters'
import { createTransport } from 'nodemailer'
import { type NextAuthOptions, Theme } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { prisma } from '@/config/prisma'

import { env } from '@/lib/env/index.mjs'

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: env.SMTP_HOST,
        port: 587,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
        from: 'contato@nanofy.com.br',
      },
      async sendVerificationRequest(params) {
        const { identifier, url, provider, theme } = params
        const { host } = new URL(url)

        const transport = createTransport(provider.server)

        const user = await prisma.user.findUnique({
          where: {
            email: identifier,
          },
        })

        const result = await transport.sendMail({
          to: identifier,
          from: 'no-reply@nanofy.com.br',
          subject: 'Verificação de e-mail',
          text: text({ url, host }),
          html: html({
            url,
            host,
            theme,
            name: user?.name ?? 'Aluno / Estudante',
          }),
        })

        const failed = result.rejected.concat(result.pending).filter(Boolean)

        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ user, token, trigger, session }) => {
      if (user) {
        token.id = user.id
        token.role = user.role
      }

      if (trigger === 'update') {
        token = { ...token, ...session }

        return token
      }

      return token
    },
    session: async ({ session, token }) => {
      session.user.id = token.id
      session.user.role = token.role

      return session
    },
  },
}

type HTMLParams = {
  url: string
  host: string
  theme: Theme
  name: string
}

type TextParams = {
  url: string
  host: string
}

function text({ url, host }: TextParams) {
  return `Autenticar-se em ${host}\n${url}\n\n`
}

function html(params: HTMLParams) {
  const { url, name } = params

  return `
    <body style="background: #f9f9f9;">

    <table width="100%" border="0" cellspacing="0" cellpadding="0"
      style="background: #fff; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center"
          style="padding: 32px 0px;border-radius: 12px 12px 0 0; font-family: Helvetica, Arial, sans-serif; color: #000; background: #73D997;">
          <p style="font-weight: 700;color: white; font-size: 32px;margin: 0;">VERBALYNX</p>
          <p style="font-size: 12px;color: white;font-weight: 600;">
            <strong>AVALIAÇÃO COM OLHAR DE LINCE</strong>
          </p>
        </td>
      </tr>
    
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: #000;">
          <p style="margin-top: 32px;font-size: 32px;font-weight: 600;">
            Solicitação de entrada na <br> Plataforma <span style="color: #73D997;">VERBALYNX</span>
          </p>
        </td>
      </tr>

      <tr>
        <td align="left"
          style="padding: 10px 0px; font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #000;padding: 24px;">
            Olá ${name}!
        </td>
      </tr>

      <tr>
        <td align="left"
          style="padding: 10px 0px; font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #000;padding: 0px 24px;">
          Você solicitou acesso à sua conta na Verbalynx. Para fazer login basta clicar no botão abaixo:
        </td>
      </tr>

      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="#73D997"><a href="${url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; text-decoration: none; border-radius: 5px; padding: 10px 24px; display: inline-block; font-weight: medium;">Acessar plataforma</a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="left"
          style="padding: 10px 0px; font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #000;padding: 0px 24px;">
          Caso o botão não funcione, copie e cole o seguinte link no navegador
        </td>
      </tr>

      <tr>
        <td align="left"
          style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #000;padding: 24px 24px;">
          Link: <a href="${url}"
          target="_blank">${url}</a>
        </td>
      </tr>

      <tr>
        <td align="left"
          style="padding: 10px 0px; font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #000;padding: 0px 24px;">
          Este link é válido por tempo limitado. Se você não solicitou este login, por favor, ignore este e-mail.
        </td>
      </tr>

      <tr>
        <td align="left"
          style=" font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #000;padding: 24px 24px;">
          - Equipe Verbalynx.
        </td>
      </tr>

      <tr>
        <td align="center"
          style=" font-size: 14px; font-family: Helvetica, Arial, sans-serif; color: #000;padding: 12px 24px;">
          Se você tiver qualquer dúvida ou precisar de ajuda, nossa equipe de <br> suporte está à disposição para ajudá-lo.
        </td>
      </tr>

      <tr>
        <td align="center"
          style=" font-size: 14px; font-family: Helvetica, Arial, sans-serif; color: #000;padding: 8px 24px;">
          <a href="mailto:suporte@nanofy.com.br"
          target="_blank">suporte@nanofy.com.br</a>
        </td>
      </tr>
    </table>
  </body>
  `
}
