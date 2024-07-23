import { supabase } from '../libs/supabase'

export const poopUpApi = {
  getCharactersList: async () => {
    const { data: poop_up } = await supabase
      .from('poop-up_characters')
      .select('*')
      .throwOnError()
    return poop_up
  },
  getPhrasesList: async () => {
    const { data: poop_up_phrase } = await supabase
      .from('poop-up_phrases')
      .select('*')
      .throwOnError()
    return poop_up_phrase
  },
}
