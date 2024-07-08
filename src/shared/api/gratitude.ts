import { z } from 'zod'

import { supabase } from '@/shared/libs/supabase'

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
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error()
    }

    const parsedData = gratitudeDtoArraySchema.safeParse(data)

    if (parsedData.success) {
      return parsedData.data
    }

    return []
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

    if (error) {
      throw new Error()
    }

    const parsedData = gratitudeDtoSchema.safeParse(data)

    if (parsedData.success) {
      return parsedData.data
    }
    return null
  },

  deleteGratitude: async (id: string) => {
    const { error } = await supabase.from('gratitudes').delete().eq('id', id)

    if (error) {
      throw new Error()
    }
    return
  },
}
