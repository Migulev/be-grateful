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
      <div className="flex items-center border-b border-stone-400/70 py-2 pl-8 pr-0 text-lg sm:pr-2">
        <p
          // !dev: color hardcoded
          className="break-all  text-stone-600"
        >
          {`-  ${title}`}
        </p>
        <BrowserViewDeleteButton onDelete={onDelete} />
        <MobileViewDeleteButton onDelete={onDelete} />
      </div>
    </div>
  )
}

// !todo: add dropdown for delete function with conformation
// !todo: hover effect check

const BrowserViewDeleteButton = ({ onDelete }: { onDelete: () => void }) => {
  return (
    <BrowserView>
      <div
        // !dev: color hardcode
        onClick={onDelete}
        className="group/button absolute -left-5 flex size-10 cursor-pointer items-center justify-center rounded-md transition hover:bg-blue-300"
      >
        <X
          // !dev: color hardcode
          className="size-5 text-red-700 opacity-0 group-hover/button:opacity-100"
        />
        <EllipsisVertical className="absolute size-5 text-stone-600 opacity-0 transition group-hover/button:invisible group-hover/line:opacity-70" />
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
