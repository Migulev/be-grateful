import { EllipsisVertical, X } from 'lucide-react'
import { useRef, useState } from 'react'

import { DurationTW } from '@/shared/global-types'
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
      {/* // !dev: color hardcoded */}
      <div className="flex items-center border-b border-[#a8a29e] py-4 pl-8 pr-0 text-lg sm:pr-2">
        {/* <div className="flex items-center border-b border-stone-400/70 py-4 pl-8 pr-0 text-lg sm:pr-2"> */}
        <p
          // !dev: color hardcoded
          className=" overflow-hidden break-words text-secondary-foreground"
        >
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
      <div className="group/button absolute -left-5 flex h-full items-center justify-center">
        <div
          // !dev: color hardcode
          onClick={onDelete}
          className="flex size-10 cursor-pointer items-center justify-center rounded-md group-hover/button:bg-blue-300"
        >
          <X
            // !dev: color hardcode
            className="size-5 text-red-700 opacity-0 group-hover/button:opacity-100"
          />
          <EllipsisVertical className="absolute size-5 text-stone-600 opacity-0 group-hover/button:invisible  group-hover/line:opacity-70" />
        </div>
      </div>
    </BrowserView>
  )
}

const MobileViewDeleteButton = ({ onDelete }: { onDelete: () => void }) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const refDiv = useRef<HTMLDivElement>(null)
  useOutsideClick(refDiv, () => setIsOpenDelete(false))
  return (
    <MobileView>
      {!isOpenDelete && (
        <EllipsisVertical
          onClick={() => setIsOpenDelete(true)}
          className="absolute -left-5 size-5 cursor-pointer text-stone-600 opacity-70"
        />
      )}
      {isOpenDelete && (
        <div
          // !dev: color hardcode
          onClick={onDelete}
          ref={refDiv}
          className="absolute -left-5 flex size-10 cursor-pointer items-center justify-center rounded-md bg-blue-300"
        >
          <X
            // !dev: color hardcode
            className="size-5 text-red-700"
          />
        </div>
      )}
    </MobileView>
  )
}
