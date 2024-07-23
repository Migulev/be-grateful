import { supabase } from '../libs/supabase'

export const greetingApi = {
  getGreetingsList: async () => {
    const { data: greeting } = await supabase
      .from('greetings')
      .select('*')
      .throwOnError()

    return greeting
  },
}
