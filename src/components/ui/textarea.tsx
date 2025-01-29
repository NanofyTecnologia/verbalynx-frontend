import * as React from 'react'

import { cn } from '@/lib/shadcn'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-0.5">
        <textarea
          data-error={!!error}
          className={cn(
            'flex min-h-[60px] w-full rounded-md border border-input bg-transparent bg-white px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[error=true]:border-destructive md:text-sm',
            className,
          )}
          ref={ref}
          {...props}
        />

        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
