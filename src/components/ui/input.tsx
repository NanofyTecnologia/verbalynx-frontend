'use client'

import * as React from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { cn } from '@/lib/shadcn'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | undefined
  startIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, startIcon, ...props }, ref) => {
    const [show, setShow] = React.useState(false)

    return (
      <div className="w-full space-y-0.5">
        <div className="relative flex items-center">
          {startIcon && startIcon}

          <input
            type={show ? 'text' : type}
            data-error={!!error}
            className={cn(
              'flex h-9 w-full rounded-md border border-input bg-transparent bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[error=true]:border-destructive data-[error=true]:ring-0',
              className,
            )}
            ref={ref}
            {...props}
          />

          {type === 'password' && (
            <button
              type="button"
              className="absolute right-4"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          )}
        </div>

        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
