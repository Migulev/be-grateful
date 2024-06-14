import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { GoogleIcon } from '@/shared/components/icons/google'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { Separator } from '@/shared/components/ui/separator'
import { toastError } from '@/shared/libs/toast'

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'поле обязательно' })
    .email('неверный формат почты'),
})
type FormSchemaType = z.infer<typeof formSchema>

// !todo: separate logic and ui of modal. check paromov implementation

export const SingInModal = ({
  onClose,
  onLogInWithOptAsync,
  isLogging,
}: {
  onClose: () => void
  onLogInWithOptAsync: (email: string) => Promise<void>
  isLogging: boolean
}) => {
  const [checkEmailView, setCheckEmailView] = useState(false)
  const [emailProvidedByUser, setEmailProvidedByUser] = useState('')

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (formValues: FormSchemaType) => {
    try {
      await onLogInWithOptAsync(formValues.email)
      setCheckEmailView(true)
      setEmailProvidedByUser(formValues.email)
    } catch (error) {
      toastError(
        'Что-то пошло не так. Возможно ссылка уже была отправлена на указанную почту',
        7000,
      )
    }
  }

  return (
    <Dialog
      open
      onOpenChange={onClose}
    >
      {/* !dev: hardcode color */}
      <DialogContent className="border-neutral-500 bg-gradient-to-r from-cyan-500/90 to-blue-500/90 px-2 sm:px-10 sm:py-6">
        <DialogHeader className="text-white">
          <DialogTitle>Вход</DialogTitle>
        </DialogHeader>

        {!checkEmailView ? (
          <>
            <Form {...form}>
              <form
                className="mt-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="почта@ya.ru"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* !dev: hardcode color */}
                <Button
                  className=" mt-2 w-full bg-gray-300 text-gray-900 hover:bg-gray-100"
                  type="submit"
                  disabled={isLogging}
                >
                  Войти через Email
                </Button>
              </form>
            </Form>

            <Separator />

            {/* !todo: google auth functionality  */}
            {/* !dev: hardcode color */}

            <Button
              className=" flex gap-2 bg-gray-300 text-gray-900 hover:bg-gray-100"
              disabled={isLogging}
            >
              Войти через GOOGLE
              <GoogleIcon />
            </Button>
          </>
        ) : (
          <>
            <div>
              проверьте почту{' '}
              <span className=" underline">{emailProvidedByUser}</span> вам
              должна прийти ссылка для входа
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
