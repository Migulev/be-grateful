import { poopUpApi } from '@/shared/api/poop-up'

import {
  poopUpCharacterArraySchema,
  poopUpPraseArraySchema,
} from './model/types'

const poop_up_list_query_key = 'poop_up_list'

export const poopUpListQuery = () => ({
  queryKey: [poop_up_list_query_key],
  queryFn: async () => {
    const [characterList, phrasesList] = await Promise.all([
      poopUpApi.getCharactersList(),
      poopUpApi.getPhrasesList(),
    ])

    const characterValidation =
      poopUpCharacterArraySchema.safeParse(characterList)
    const phraseValidation = poopUpPraseArraySchema.safeParse(phrasesList)
    if (characterValidation.error || phraseValidation.error) throw new Error()

    return {
      characterList: characterValidation.data,
      phrasesList: phraseValidation.data,
    }
  },
  refetchOnWindowFocus: false,
  staleTime: Infinity,
})
