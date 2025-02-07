'only-server'

import { HttpStatusCode } from 'axios'
import { createTransport } from 'nodemailer'
import { User } from '@prisma/client'

import { env } from '@/lib/env/index.mjs'
import { HttpError } from '@/helpers/http-error'

const providerServer = {
  host: env.SMTP_HOST,
  port: 587,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
  from: 'contato@nanofy.com.br',
}

async function sendEmailRecover(
  user: Pick<User, 'name' | 'email'> & { token: string },
) {
  const { email, name, token } = user

  const transport = createTransport(providerServer)

  const result = await transport.sendMail({
    to: email,
    from: 'no-reply@nanofy.com.br',
    subject: 'Redefinição de Senha – Verbalynx',
    text: text(),
    html: html({ name, token }),
  })

  const failed = result.rejected.concat(result.pending).filter(Boolean)

  if (failed.length) {
    throw new HttpError('BAD_REQUEST', HttpStatusCode.BadRequest)
  }
}

function text() {
  return `Cadastrado na plataforma Verbalynx`
}

type HTMLParams = {
  name: string | null
  token: string
}

function html(params: HTMLParams) {
  const { name, token } = params

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
            <b>Recuperação de senha</b>
          </p>
        </td>
      </tr>

      <tr>
        <td align="left"
          style="padding: 10px 0px; font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #000;padding: 24px;">
            Olá ${name ?? ''}!
        </td>
      </tr>

      <tr>
        <td align="left"
          style="padding: 10px 0px; font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #000;padding: 0px 24px;">
          Recebemos sua solicitação para redefinir a senha da sua conta na Verbalynx. Para definir uma nova senha, clique no botão abaixo:
        </td>
      </tr>

      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="#73D997"><a href="${env.NEXT_PUBLIC_APP}/nova-senha?token=${token}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; text-decoration: none; border-radius: 5px; padding: 10px 24px; display: inline-block; font-weight: medium;">Alterar senha</a></td>
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
          Link: <a href="${env.NEXT_PUBLIC_APP}/nova-senha?token=${token}"
          target="_blank">${env.NEXT_PUBLIC_APP}/nova-senha?token=${token}</a>
        </td>
      </tr>

      <tr>
        <td align="left"
          style="padding: 10px 0px; font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #000;padding: 0px 24px;">
           Se você não solicitou essa alteração, ignore este e-mail. Por motivos de segurança, o link expirará em breve.
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

export { sendEmailRecover }
