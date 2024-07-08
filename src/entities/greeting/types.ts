import { z } from 'zod'

export const greetingSchema = z.object({
  title: z.string(),
})
export type Greetings = z.infer<typeof greetingSchema>
