import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none border-2",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground border-gray-900 dark:border-gray-100 hover:bg-primary/90',
        destructive:
          'bg-destructive text-white border-destructive hover:bg-destructive/90',
        outline:
          'border-gray-400 dark:border-gray-600 bg-background hover:bg-accent hover:text-accent-foreground hover:border-gray-900 dark:hover:border-gray-100',
        secondary:
          'bg-secondary text-secondary-foreground border-gray-400 dark:border-gray-600 hover:bg-secondary/80',
        ghost:
          'border-transparent hover:bg-accent hover:text-accent-foreground hover:border-gray-400 dark:hover:border-gray-600',
        link: 'text-primary underline-offset-4 hover:underline border-transparent',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean
    }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
