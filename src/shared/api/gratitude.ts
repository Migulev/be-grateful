import { supabase } from '@/shared/libs/supabase'

import {
  getLocalISOTime,
  getLocalISOTime_N_DaysBefore,
  separateFromTime,
} from '../utils'

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

  getGratitudesAmountTotal: async () => {
    const { count } = await supabase
      .from('gratitudes')
      .select('*', { count: 'exact', head: true })
      .throwOnError()
    return count
  },

  getGratitudesAmount_N_Days: async (days: number) => {
    const { count } = await supabase
      .from('gratitudes')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', separateFromTime(getLocalISOTime_N_DaysBefore(days)))
      .throwOnError()
    return count
  },
  getGratitudesAmountForRangeOfPreviousDays: async (
    startDaysBefore: number,
    numberOfDays: number,
  ) => {
    const { count } = await supabase
      .from('gratitudes')
      .select('*', { count: 'exact', head: true })
      .gte(
        'created_at',
        separateFromTime(getLocalISOTime_N_DaysBefore(startDaysBefore)),
      )
      .lt(
        'created_at',
        separateFromTime(
          getLocalISOTime_N_DaysBefore(startDaysBefore - numberOfDays),
        ),
      )
      .throwOnError()
    return count
  },

  getGratitudesAmountForMonth: async (month: number, year: number) => {
    const nextMonth = month === 12 ? 1 : month + 1
    const nextYear = month === 12 ? year + 1 : year

    const { count } = await supabase
      .from('gratitudes')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', `${year}-${month}-01T00:00:00.000Z`)
      .lt('created_at', `${nextYear}-${nextMonth}-01T00:00:00.000Z`)
      .throwOnError()
    return count
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
