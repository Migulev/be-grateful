import { supabase } from '@/shared/libs/supabase'

import { getLocalISOTime } from '../utils'

export const gratitudeApi = {
  getGratitudeList: async () => {
    const { data: gratitudeList } = await supabase
      .from('gratitudes')
      .select('*')
      .order('created_at', { ascending: true })
      .throwOnError()

    return gratitudeList
  },

  getGratitudeListOnDate: async (date: string) => {
    const startOfDay = `${date}T00:00:00.000Z`
    const endOfDay = `${date}T23:59:59.999Z`

    const { data } = await supabase
      .from('gratitudes')
      .select('*')
      .gte('created_at', startOfDay)
      .lte('created_at', endOfDay)
      .order('created_at', { ascending: true })
      .throwOnError()

    return data
  },

  getGratitudeDates: async () => {
    const { data } = await supabase
      .from('gratitudes')
      .select('created_at')
      .order('created_at', { ascending: false })
      .throwOnError()
    return data
  },

  createGratitude: async (title: string) => {
    const newGratitude = {
      created_at: getLocalISOTime(),
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
