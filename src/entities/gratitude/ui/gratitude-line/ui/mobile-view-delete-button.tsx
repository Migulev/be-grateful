import { useRef, useState } from 'react'

import { EllipsisVertical, X } from 'lucide-react'

import { MobileView } from '@/shared/libs/device-type'
import { useOutsideClick } from '@/shared/utils'

export const MobileViewDeleteButton = ({
  onDelete,
}: {
  onDelete: () => void
}) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const refDiv = useRef<SVGSVGElement>(null)
  useOutsideClick(refDiv, () => setIsOpenDelete(false))
  return (
    <MobileView>
      {!isOpenDelete && (
        <EllipsisVertical
          onClick={() => setIsOpenDelete(true)}
          className="absolute -left-3 size-5 cursor-pointer opacity-50"
          role="mobile-view-delete-button"
        />
      )}
      {isOpenDelete && (
        <X
          className="absolute -left-3 size-5 cursor-pointer text-destructive"
          onClick={onDelete}
          ref={refDiv}
          role="x-delete-button"
        />
      )}
    </MobileView>
  )
}
