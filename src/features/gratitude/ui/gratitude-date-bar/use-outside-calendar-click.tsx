import { useEffect } from 'react'

export function useOutsideCalendarClick(
  ref: React.RefObject<HTMLDivElement>,
  buttonRef: React.RefObject<HTMLButtonElement>,
  callback: () => void,
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside as EventListener)
    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside as EventListener,
      )
    }
  }, [ref, buttonRef, callback])
}
