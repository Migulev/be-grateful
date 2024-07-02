import { z } from 'zod'

import { ACCEPTED_AVATAR_TYPES, MAX_AVATAR_SIZE } from '@/entities/profile'

export const nameFormSchema = z.object({
  name: z.string().max(30, { message: 'максимум 30 символов' }),
})
export type NameFormSchemaType = z.infer<typeof nameFormSchema>

export const avatarFromSchema = z
  .instanceof(File)
  .refine(file => {
    return file.size <= MAX_AVATAR_SIZE
  }, 'файл должен быть менее 3MB')
  .refine(file => {
    return ACCEPTED_AVATAR_TYPES.includes(file.type)
  }, 'файл должен быть png или jpeg')
