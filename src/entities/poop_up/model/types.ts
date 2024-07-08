import { z } from 'zod'

const poopUpCharacterSchema = z
  .object({
    name: z.string(),
    avatar_url: z.string(),
    gender: z.union([z.literal('male'), z.literal('female')]),
    image: z.custom<HTMLImageElement>().default(new Image()),
  })
  .transform(({ avatar_url, ...rest }) => ({ avatarUrl: avatar_url, ...rest }))
export const poopUpCharacterArraySchema = z.array(poopUpCharacterSchema)
export type PoopUpCharacter = z.infer<typeof poopUpCharacterSchema>

const poopUpPraseSchema = z.object({
  male: z.string(),
  female: z.string(),
})
export const poopUpPraseArraySchema = z.array(poopUpPraseSchema)
export type PoopUpPhrase = z.infer<typeof poopUpPraseSchema>

export type PoopUpToast = {
  image: HTMLImageElement
  name: string
  title: string
}
