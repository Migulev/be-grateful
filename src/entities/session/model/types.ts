import { z } from 'zod'

export const sessionSchema = z
  .object({
    id: z.string(),
    avatar_url: z.string(),
    email: z.string(),
    name: z.string(),
  })
  .transform(({ avatar_url, ...rest }) => ({ avatarUrl: avatar_url, ...rest }))

export type Session = z.infer<typeof sessionSchema>
