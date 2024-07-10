import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useUpdateProfileName } from '@/features/profile'
import { Profile } from '@/entities/profile'

import { nameFormSchema, NameFormSchemaType } from './types'

export const useHandleNameForm = ({ profile }: { profile: Profile }) => {
  const nameForm = useForm<NameFormSchemaType>({
    resolver: zodResolver(nameFormSchema),
    defaultValues: { name: profile.userName ?? profile.name ?? '' },
  })

  const { mutate: updateName, isPending: isUpdatingName } =
    useUpdateProfileName()

  const onNameSubmit = (formValues: NameFormSchemaType) => {
    updateName(formValues.name)
  }
  return { nameForm, onNameSubmit, isUpdatingName }
}
