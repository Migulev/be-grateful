import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Profile, ProfileAvatar, UploadInputButton } from '@/entities/profile'
import {
  useDeleteAvatar,
  useUpdateProfileAvatar,
  useUpdateProfileName,
} from '@/features/profile'
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from '@/shared/components/credenza'
import { Button } from '@/shared/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'

const nameFormSchema = z.object({
  name: z.string().max(30, { message: 'максимум 30 символов' }),
})
type NameFormSchemaType = z.infer<typeof nameFormSchema>

export const SettingsModal = ({
  onClose,
  profile,
}: {
  onClose: () => void
  profile: Profile
}) => {
  const nameForm = useForm<NameFormSchemaType>({
    resolver: zodResolver(nameFormSchema),
    defaultValues: { name: profile.name ? profile.name : '' },
  })

  const { mutate: updateName, isPending: isUpdatingName } =
    useUpdateProfileName()
  const onNameSubmit = (formValues: NameFormSchemaType) => {
    updateName(formValues.name)
  }

  const { mutate: updateProfileAvatar, isPending: isUpdatingAvatar } =
    useUpdateProfileAvatar()
  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    updateProfileAvatar(file)
  }

  const { mutate: deleteAvatar, isPending: isDeletingAvatar } =
    useDeleteAvatar()

  const isUnderAvatarMutation = isUpdatingAvatar || isDeletingAvatar

  return (
    <Credenza
      open
      onOpenChange={onClose}
    >
      {/* !dev: color hardcoded */}
      <CredenzaContent className="border-neutral-500 bg-gradient-to-r from-cyan-500/90 to-blue-500/90 px-2 sm:px-10 sm:py-6">
        <CredenzaHeader>
          <CredenzaTitle>Настройки</CredenzaTitle>
        </CredenzaHeader>
        <div className="mt-2 flex flex-col gap-6">
          <div className=" flex w-full items-center justify-center gap-6">
            <ProfileAvatar
              className=" size-14"
              profile={profile}
              loading={isUnderAvatarMutation}
            />
            {/* !dev: color hardcoded */}
            {/* !todo: add react hook form */}
            <div className="flex gap-4">
              <UploadInputButton
                className=" p-0 text-sky-300"
                onChange={onInputChange}
                disabled={isUnderAvatarMutation}
              />
              {/* !dev: color hardcoded */}
              <Button
                variant={'link'}
                className=" p-0 text-red-500"
                onClick={() => deleteAvatar()}
                disabled={isUnderAvatarMutation}
              >
                удалить
              </Button>
            </div>
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
                disabled={isUpdatingName}
              >
                изменить имя
              </Button>
            </form>
          </Form>
        </div>
      </CredenzaContent>
    </Credenza>
  )
}
