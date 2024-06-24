import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { toastError } from '@/shared/libs/toast'

const nameFormSchema = z.object({
  name: z.string().max(30, { message: 'максимум 30 символов' }),
})
type NameFormSchemaType = z.infer<typeof nameFormSchema>

export const SettingsModal = ({
  onClose,
  profileAvatar,
  name,
}: {
  onClose: () => void
  profileAvatar: ReactNode
  name: string
}) => {
  const nameForm = useForm<NameFormSchemaType>({
    resolver: zodResolver(nameFormSchema),
    defaultValues: { name },
  })

  const onNameSubmit = async (formValues: NameFormSchemaType) => {
    try {
      // !todo: implement logic
      console.log(formValues)
    } catch (error) {
      toastError()
    }
  }
  return (
    <Dialog
      open
      onOpenChange={onClose}
    >
      {/* !dev: color hardcoded */}
      <DialogContent className="border-neutral-500 bg-gradient-to-r from-cyan-500/90 to-blue-500/90 px-2 sm:px-10 sm:py-6">
        <DialogHeader>
          <DialogTitle>Настройки</DialogTitle>
        </DialogHeader>
        <div className="mt-2 flex flex-col gap-6">
          <div className=" flex w-full items-center justify-center gap-2">
            {profileAvatar}
            {/* !dev: hardcode color */}
            <Button
              className=" text-sky-300"
              variant={'link'}
              onClick={() => {
                // !todo implement logic
              }}
            >
              изменить
            </Button>
          </div>
          <Form {...nameForm}>
            <form onSubmit={nameForm.handleSubmit(onNameSubmit)}>
              <FormField
                control={nameForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="новое имя"
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
              >
                изменить имя
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
