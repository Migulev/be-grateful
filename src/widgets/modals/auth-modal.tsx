import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useLoginWithGoogle, useLoginWithOtp } from '@/features/auth'
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from '@/shared/components/credenza'
import { GoogleIcon } from '@/shared/components/icons/google'
import { Button } from '@/shared/components/ui/button'
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

const emailFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'поле обязательно' })
    .email('неверный формат почты'),
})
type EmailFormSchemaType = z.infer<typeof emailFormSchema>

export const AuthModal = ({ onClose }: { onClose: () => void }) => {
  const [checkEmailView, setCheckEmailView] = useState(false)
  const [emailProvidedByUser, setEmailProvidedByUser] = useState('')

  const mailForm = useForm<EmailFormSchemaType>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: '',
    },
  })
  const { mutate: logInWithGoogle, isPending: isPendingGoogle } =
    useLoginWithGoogle()
  const { mutateAsync: logInWithOptAsync, isPending: isPendingOtp } =
    useLoginWithOtp()

  const isLogging = isPendingGoogle || isPendingOtp

  const onEmailSubmit = async (formValues: EmailFormSchemaType) => {
    try {
      await logInWithOptAsync(formValues.email)
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
    <Credenza
      open
      onOpenChange={onClose}
    >
      <CredenzaContent className="bg-gradient px-2 sm:px-10 sm:py-6">
        <CredenzaHeader>
          <CredenzaTitle>Вход</CredenzaTitle>
        </CredenzaHeader>

        {!checkEmailView ? (
          <>
            <Form {...mailForm}>
              <form
                className="mt-2"
                onSubmit={mailForm.handleSubmit(onEmailSubmit)}
              >
                <FormField
                  control={mailForm.control}
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
                <Button
                  className="mt-2 w-full"
                  variant="secondary"
                  type="submit"
                  disabled={isLogging}
                >
                  Войти через Email
                </Button>
              </form>
            </Form>

            <Separator />

            <Button
              className="flex gap-2"
              variant="secondary"
              disabled={isLogging}
              onClick={() => logInWithGoogle()}
            >
              Войти через GOOGLE
              <GoogleIcon />
            </Button>
          </>
        ) : (
          <>
            <div>
              проверьте почту{' '}
              <span className="underline">{emailProvidedByUser}</span> вам
              должна прийти ссылка для входа
            </div>
          </>
        )}
      </CredenzaContent>
    </Credenza>
  )
}
