import { z } from 'zod'

export const sessionSchema = z
  .object({
    id: z.string(),
    avatar_url: z.string().default(''),
    email: z.string(),
    name: z.string().default(''),
    userName: z.string().optional(),
    userAvatarUrl: z.string().optional(),
    greetingSettings: z.boolean().default(true),
  })
  .transform(({ avatar_url, ...rest }) => ({ avatarUrl: avatar_url, ...rest }))

export type Session = z.infer<typeof sessionSchema>
