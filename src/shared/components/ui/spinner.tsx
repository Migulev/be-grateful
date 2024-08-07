import { Loader } from 'lucide-react'

import { cn } from '@/shared/utils'

export const Spinner = ({ className }: { className?: string }) => {
  return (
    <Loader
      className={cn(className, 'animate-spin-slow opacity-50')}
      role="loader"
    />
  )
}
