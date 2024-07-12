import { CircleAlert, CircleCheck } from 'lucide-react'
import { toast } from 'sonner'

export type ToastPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center'

export const toastError = (
  message = 'что-то пошло не так',
  duration?: number, // ms
) => {
  return toast.error(message, {
    duration,
    icon: <CircleAlert className="size-5 text-destructive" />,
  })
}

export const toastSuccess = (message: string, duration?: number) => {
  return toast.success(message, {
    duration,
    icon: <CircleCheck className="size-5 text-success" />,
  })
}
