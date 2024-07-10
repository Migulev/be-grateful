import { Control, UseFormReturn } from 'react-hook-form'

import { Button } from '@/shared/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'

import { NameFormSchemaType } from '../model/types'

export const NameForm = ({
  buttonDisabled,
  onSubmit,
  fieldControl,
  nameForm,
}: {
  buttonDisabled: boolean
  onSubmit: () => void
  fieldControl: Control<NameFormSchemaType, unknown>
  nameForm: UseFormReturn<NameFormSchemaType, undefined>
}) => {
  return (
    <Form {...nameForm}>
      <form onSubmit={onSubmit}>
        <FormField
          control={fieldControl}
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
          className=" bg-gray-300 text-gray-900 hover:bg-gray-100 mt-2 w-full"
          type="submit"
          disabled={buttonDisabled}
        >
          изменить имя
        </Button>
      </form>
    </Form>
  )
}
