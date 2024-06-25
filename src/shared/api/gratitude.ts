import { z } from 'zod'

import { supabase } from '@/shared/libs/supabase'

const gratitudeDtoSchema = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.string(),
})
const gratitudeDtoArraySchema = z.array(gratitudeDtoSchema)
type GratitudeDto = z.infer<typeof gratitudeDtoSchema>

export const gratitudeApi = {
  getGratitudeList: async (): Promise<GratitudeDto[]> => {
    const { data, error } = await supabase
      .from('gratitude')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) {
      throw new Error()
    }

    const parsedData = gratitudeDtoArraySchema.safeParse(data)

    if (parsedData.success) {
      return parsedData.data
    }

    return []
  },

  createGratitude: async (text: string): Promise<GratitudeDto | null> => {
    const { data, error } = await supabase
      .from('gratitude')
      .insert([{ createdAt: new Date().toISOString(), text }])
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
    const { error } = await supabase.from('gratitude').delete().eq('id', id)

    if (error) {
      throw new Error()
    }
    return
  },
}
