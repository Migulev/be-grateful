import { supabase } from '@/shared/libs/supabase'

import { SupabaseError } from '../libs/errors'

export const gratitudeApi = {
  getGratitudeList: async () => {
    const { data: gratitudeList, error } = await supabase
      .from('gratitudes')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) throw new SupabaseError()

    return gratitudeList
  },

  createGratitude: async (title: string) => {
    const newGratitude = {
      created_at: new Date().toISOString(),
      title,
    }

    const { data: createdGratitude, error } = await supabase
      .from('gratitudes')
      .insert([newGratitude])
      .select()
      .single()

    if (error) throw new SupabaseError()

    return createdGratitude
  },

  deleteGratitude: async (id: string) => {
    const { error } = await supabase.from('gratitudes').delete().eq('id', id)

    if (error) throw new SupabaseError()
    return
  },
}
