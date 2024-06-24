import { z } from 'zod'

export const sessionSchema = z.object({
  avatar_url: z.string().default(''),
  email: z.string(),
  name: z.string().default(''),
})

export type Session = z.infer<typeof sessionSchema>
