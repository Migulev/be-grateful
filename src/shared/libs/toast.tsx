import { CircleAlert, CircleCheck } from 'lucide-react'
import { toast } from 'sonner'

// !dev: color hardcoded
export const toastError = (
  message = 'что-то пошло не так',
  duration?: number, // ms
) => {
  return toast.error(message, {
    duration,
    icon: <CircleAlert className=" size-5 text-red-600" />,
  })
}

// !dev: color hardcoded
export const toastSuccess = (message: string, duration?: number) => {
  return toast.success(message, {
    duration,
    icon: <CircleCheck className=" size-5 text-green-600" />,
  })
}
