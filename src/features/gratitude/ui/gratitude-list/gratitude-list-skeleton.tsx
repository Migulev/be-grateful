import { GratitudeLineSkeleton } from '@/entities/gratitude'
import { useAppearance } from '@/shared/utils'

export const GratitudeListSkeleton = ({ date }: { date?: string }) => {
  const isShown = useAppearance()
  if (!isShown) return null

  return (
    <div className="my-6 space-y-8 px-8">
      {date === 'all' ? (
        <>
          {new Array(4).fill(null).map((_, index) => (
            <GratitudeLineSkeleton key={index} />
          ))}
        </>
      ) : (
        <>
          {new Array(2).fill(null).map((_, index) => (
            <GratitudeLineSkeleton key={index} />
          ))}
        </>
      )}
    </div>
  )
}
