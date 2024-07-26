import { EllipsisVertical, X } from 'lucide-react'

import { BrowserView } from '@/shared/libs/device-type'

export const BrowserViewDeleteButton = ({
  onDelete,
}: {
  onDelete: () => void
}) => {
  return (
    <BrowserView>
      <div
        data-testid="browser-view-delete-button"
        className="group/button absolute -left-5 flex h-full w-10 items-center justify-center"
      >
        <X
          className="size-5 cursor-pointer text-destructive opacity-0 group-hover/button:opacity-100"
          onClick={onDelete}
          data-testid="x-delete-button"
        />
        <EllipsisVertical className="absolute size-5 cursor-pointer opacity-0 group-hover/button:invisible group-hover/line:opacity-50" />
      </div>
    </BrowserView>
  )
}
