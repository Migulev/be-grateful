import { supabase } from '../libs/supabase'

export const poopUpApi = {
  getCharactersList: async () => {
    const { data: poop_up, error } = await supabase
      .from('poop-up_characters')
      .select('*')
    if (error) throw new Error()
    return poop_up
  },
  getPhrasesList: async () => {
    const { data: poop_up_phrase, error } = await supabase
      .from('poop-up_phrases')
      .select('*')
    if (error) throw new Error()
    return poop_up_phrase
  },
}
