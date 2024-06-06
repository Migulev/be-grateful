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
import { supabase } from '@/shared/libs/supabase'

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'поле обязательно' })
    .email('неверный формат почты'),
})
type FormSchemaType = z.infer<typeof formSchema>

export const SingInModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
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
    const { error } = await supabase.auth.signInWithOtp(formValues)
    if (error) {
      // !todo: error implement
      //   console.error(error)
      //   toastError(
      //     'Что-то пошло не так. Возможно ссылка уже была отправлена на указанную почту',
      //     7000,
      //   )
    } else {
      setCheckEmailView(true)
      setEmailProvidedByUser(formValues.email)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => setIsOpen(false)}
    >
      <DialogContent className="border-neutral-500 bg-gradient-to-r from-cyan-500/90 to-blue-500/90 px-10 py-6">
        <DialogHeader className="text-white">
          <DialogTitle>Вход</DialogTitle>
        </DialogHeader>

        {checkEmailView ? (
          <>
            <div>
              проверьте почту{' '}
              <span className=" underline">{emailProvidedByUser}</span> вам
              должна была прийти ссылка для подтверждения входа
            </div>
          </>
        ) : (
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
                {/* !todo: implement loader or disable button */}
                <Button
                  className=" mt-2 w-full bg-gray-300 text-gray-900 hover:bg-gray-100"
                  type="submit"
                >
                  Войти через Email
                </Button>
              </form>
            </Form>

            <Separator />

            {/* !todo: google auth functionality  */}
            <Button className=" flex gap-2 bg-gray-300 text-gray-900 hover:bg-gray-100">
              Войти через GOOGLE
              <GoogleIcon />
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
