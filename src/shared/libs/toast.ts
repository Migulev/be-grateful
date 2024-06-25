import { toast } from 'sonner'

export const toastError = (
  message = 'что-то пошло не так',
  duration?: number, // ms
) => {
  return toast.error(message, { duration })
}

export const toastSuccess = (message: string, duration?: number) => {
  return toast.success(message, { duration })
}
