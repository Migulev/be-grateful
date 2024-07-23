import { supabase } from '@/shared/libs/supabase'

export const gratitudeApi = {
  getGratitudeList: async () => {
    const { data: gratitudeList } = await supabase
      .from('gratitudes')
      .select('*')
      .order('created_at', { ascending: true })
      .throwOnError()

    return gratitudeList
  },

  createGratitude: async (title: string) => {
    const newGratitude = {
      created_at: new Date().toISOString(),
      title,
    }

    const { data: createdGratitude } = await supabase
      .from('gratitudes')
      .insert([newGratitude])
      .select()
      .single()
      .throwOnError()

    return createdGratitude
  },

  deleteGratitude: async (id: string) => {
    await supabase.from('gratitudes').delete().eq('id', id).throwOnError()

    return
  },
}
