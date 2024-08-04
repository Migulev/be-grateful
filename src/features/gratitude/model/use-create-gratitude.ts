import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  Gratitude,
  gratitude_query_key,
  gratitudeSchema,
} from '@/entities/gratitude'
import { gratitudeApi } from '@/shared/api/gratitude'
import { ValidationError } from '@/shared/libs/errors'
import { toastError } from '@/shared/libs/toast'
import { generateRandomId, getLocalISOTime } from '@/shared/utils'

const create_gratitude_key = 'create_gratitude'

export const useCreateGratitude = (
  optimisticDuration: number,
  date?: string,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [create_gratitude_key],
    mutationFn: (title: string) => {
      return gratitudeApi.createGratitude(title)
    },
    onMutate: title => {
      const optimisticGratitude: Gratitude = {
        id: generateRandomId(),
        title,
        createdAt: getLocalISOTime(),
      }

      const previousGratitudeList = queryClient.getQueryData<Gratitude[]>([
        gratitude_query_key,
        date,
      ])

      queryClient.setQueryData(
        [gratitude_query_key, date],
        (cashedData: Gratitude[]) => {
          if (cashedData === undefined) return [optimisticGratitude]
          return [...cashedData, optimisticGratitude]
        },
      )

      return { previousGratitudeList, optimisticGratitude }
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(
        [gratitude_query_key, date],
        context?.previousGratitudeList,
      )
      toastError()
    },

    onSuccess: async (data, _, context) => {
      const validation = gratitudeSchema.safeParse(data)
      if (validation.error) throw new ValidationError()

      setTimeout(() => {
        queryClient.setQueryData(
          [gratitude_query_key, date],
          (cashedData: Gratitude[]) =>
            cashedData.map(gratitude => {
              if (gratitude.id === context.optimisticGratitude.id)
                return validation.data
              return gratitude
            }),
        )
        queryClient.setQueryData(
          [gratitude_query_key],
          (cashedData: Gratitude[]) => {
            if (cashedData === undefined) return
            return [...cashedData, validation.data]
          },
        )
      }, optimisticDuration)
    },
  })
}
