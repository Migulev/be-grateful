import { Trash2 } from 'lucide-react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { BrowserView, MobileView } from '@/shared/libs/device-type'
import { DurationTW } from '@/shared/types'
import { cn, convertDurationTW, formatDate } from '@/shared/utils'

export const GratitudeCard = ({
  date,
  text,
  onDelete,
  isOptimistic = false,
  optimisticDuration = 0,
  isMock = false,
}: {
  date: string
  text: string
  onDelete: () => void
  isOptimistic?: boolean
  optimisticDuration?: DurationTW
  isMock?: boolean
}) => {
  const formattedDate = formatDate(date)

  return (
    <Card
      className={cn(
        // !dev: color hardcode
        `group/trash relative min-h-32 border-pink-200 bg-blue-800/30 transition`,
        `${isOptimistic && 'opacity-50'}`,
        convertDurationTW(optimisticDuration),
      )}
    >
      <CardHeader>
        {/* // !dev: color hardcode */}
        <CardTitle className="font-sans text-xs text-gray-700/80">
          {isMock ? '' : formattedDate}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* // !dev: color hardcode */}
        <p className="break-words text-lg text-gray-200/90">{text}</p>
      </CardContent>
      {/* // !dev: color hardcode */}
      {isMock ? null : (
        <BrowserView>
          <div className="group/circle absolute right-4 top-4 flex size-8 items-center justify-center rounded-full transition hover:bg-red-50">
            <Trash2
              onClick={onDelete}
              // !dev: color hardcode
              className="size-5 cursor-pointer text-blue-700 opacity-0 transition group-hover/circle:text-red-700 group-hover/trash:opacity-100"
            />
          </div>
        </BrowserView>
      )}
    </Card>
  )
}
