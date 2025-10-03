import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={cn('border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin', sizeClasses[size], className)} />
  )
}

export function createClickHandler(handler: () => void) {
  return (e: React.MouseEvent) => {
    e.preventDefault()
    handler()
  }
}

export function getButtonVariant(condition: boolean) {
  return condition ? 'default' : 'outline'
}

export function renderIf(condition: boolean, element: React.ReactNode) {
  return condition ? element : null
}

export function createSkeleton(count: number) {
  return Array.from({ length: count }, (_, i) => i)
}
