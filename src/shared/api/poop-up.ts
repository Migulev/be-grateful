import { supabase } from '../libs/supabase'

export const poopUpApi = {
  getCharactersList: async () => {
    const { data: poop_up, error } = await supabase.from('poop_up').select('*')
    if (error) throw new Error()
    return poop_up
  },
  getPhrasesList: async () => {
    const { data: poop_up_phrase, error } = await supabase
      .from('poop_up_phrase')
      .select('*')
    if (error) throw new Error()
    return poop_up_phrase
  },
}
