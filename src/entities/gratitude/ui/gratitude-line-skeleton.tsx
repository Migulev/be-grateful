import { Skeleton } from '@/shared/components/ui/skeleton'

export const GratitudeLineSkeleton = () => {
  return (
    <div className="flex items-center gap-[6px]">
      <Skeleton className="h-1 w-2" />
      <Skeleton className="h-5 w-full rounded-[50px]" />
    </div>
  )
}
