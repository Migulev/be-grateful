import { z } from 'zod'

import { supabase } from '@/shared/libs/supabase'

import { SupabaseError, ValidationError } from '../libs/errors'

const gratitudeDtoSchema = z.object({
  id: z.string(),
  title: z.string(),
  created_at: z.string(),
})

const gratitudeDtoArraySchema = z.array(gratitudeDtoSchema)
type GratitudeDto = z.infer<typeof gratitudeDtoSchema>

export const gratitudeApi = {
  getGratitudeList: async (): Promise<GratitudeDto[]> => {
    const { data, error } = await supabase
      .from('gratitudes')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) throw new SupabaseError()

    const validation = gratitudeDtoArraySchema.safeParse(data)
    if (validation.error) throw new ValidationError()
    return validation.data
  },

  createGratitude: async (title: string): Promise<GratitudeDto | null> => {
    const newGratitude = {
      created_at: new Date().toISOString(),
      title,
    } as GratitudeDto

    const { data, error } = await supabase
      .from('gratitudes')
      .insert([newGratitude])
      .select()
      .single()

    if (error) throw new SupabaseError()

    const validation = gratitudeDtoSchema.safeParse(data)
    if (validation.error) throw new ValidationError()

    return validation.data
  },

  deleteGratitude: async (id: string) => {
    const { error } = await supabase.from('gratitudes').delete().eq('id', id)

    if (error) throw new SupabaseError()
    return
  },
}
