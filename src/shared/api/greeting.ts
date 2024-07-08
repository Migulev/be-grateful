import { SupabaseError } from '../libs/errors'
import { supabase } from '../libs/supabase'

export const greetingApi = {
  getGreetingsList: async () => {
    const { data: greeting, error } = await supabase
      .from('greetings')
      .select('*')
    if (error) throw new SupabaseError()

    return greeting
  },
}
