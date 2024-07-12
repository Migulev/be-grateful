import { useRef, useState } from 'react'

import { EllipsisVertical, X } from 'lucide-react'

import { type DurationTW } from '@/shared/global-types'
import { BrowserView, MobileView } from '@/shared/libs/device-type'
import { cn, convertDurationTW, useOutsideClick } from '@/shared/libs/utils'

export const GratitudeLine = ({
  title,
  onDelete,
  isOptimistic = false,
  optimisticDuration = 0,
}: {
  title: string
  onDelete: () => void
  isOptimistic?: boolean
  optimisticDuration?: DurationTW
}) => {
  return (
    <div
      className={cn(
        `group/line relative`,
        `${isOptimistic && 'opacity-50'}`,
        convertDurationTW(optimisticDuration),
      )}
    >
      <div className="flex items-center border-b border-muted py-4 pl-8 pr-0 text-lg sm:pr-2">
        <p className="overflow-hidden break-words text-secondary-foreground">
          {`-  ${title}`}
        </p>
        <BrowserViewDeleteButton onDelete={onDelete} />
        <MobileViewDeleteButton onDelete={onDelete} />
      </div>
    </div>
  )
}

const BrowserViewDeleteButton = ({ onDelete }: { onDelete: () => void }) => {
  return (
    <BrowserView>
      <div className="group/button absolute -left-5 flex h-full w-10 items-center justify-center">
        <X
          className="size-5 cursor-pointer text-destructive opacity-0 group-hover/button:opacity-100"
          onClick={onDelete}
        />
        <EllipsisVertical className="absolute size-5 cursor-pointer opacity-0 group-hover/button:invisible group-hover/line:opacity-50" />
      </div>
    </BrowserView>
  )
}

const MobileViewDeleteButton = ({ onDelete }: { onDelete: () => void }) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const refDiv = useRef<SVGSVGElement>(null)
  useOutsideClick(refDiv, () => setIsOpenDelete(false))
  return (
    <MobileView>
      {!isOpenDelete && (
        <EllipsisVertical
          onClick={() => setIsOpenDelete(true)}
          className="absolute -left-3 size-5 cursor-pointer opacity-50"
        />
      )}
      {isOpenDelete && (
        <X
          className="absolute -left-3 size-5 cursor-pointer text-destructive"
          onClick={onDelete}
          ref={refDiv}
        />
      )}
    </MobileView>
  )
}
