'use client'

import { type ReactNode } from 'react'
import NextLink, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/shadcn'

interface Props extends LinkProps {
  className?: string
  children: ReactNode
}

export default function Link(props: Props) {
  const { href, className, ...restProps } = props

  const pathname = usePathname()

  const isActive = href === pathname

  return (
    <>
      <NextLink
        href={href}
        data-active={isActive}
        className={cn(
          'flex items-center gap-2 rounded-md p-2 data-[active=true]:bg-secondary [&_svg]:size-5',
          className,
        )}
        {...restProps}
      ></NextLink>
    </>
  )
}
