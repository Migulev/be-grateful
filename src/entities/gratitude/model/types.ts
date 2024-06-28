import { z } from 'zod'

export const gratitudeSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    created_at: z.string(),
  })
  .transform(({ created_at, ...rest }) => ({ createdAt: created_at, ...rest }))

export const gratitudeArraySchema = z.array(gratitudeSchema)
export type Gratitude = z.infer<typeof gratitudeSchema>
