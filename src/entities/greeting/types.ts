import { z } from 'zod'

export const greetingSchema = z.object({
  ru: z.string(),
  en: z.string(),
})
export type Greetings = z.infer<typeof greetingSchema>
