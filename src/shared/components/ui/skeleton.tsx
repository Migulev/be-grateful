import { cn } from '@/shared/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded bg-muted', className)}
      {...props}
    />
  )
}

export { Skeleton }
