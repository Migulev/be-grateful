import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  Gratitude,
  gratitude_query_key,
  gratitudeSchema,
} from '@/entities/gratitude'
import { gratitudeApi } from '@/shared/api/gratitude'
import { ValidationError } from '@/shared/libs/errors'
import { toastError } from '@/shared/libs/toast'
import { generateRandomId } from '@/shared/libs/utils'

const create_gratitude_key = 'create_gratitude'

export const useCreateGratitude = (optimisticDuration: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [create_gratitude_key],
    mutationFn: (text: string) => {
      return gratitudeApi.createGratitude(text)
    },
    onMutate: variables => {
      const optimisticGratitude: Gratitude = {
        id: generateRandomId(),
        title: variables,
        createdAt: new Date().toISOString(),
      }

      const previousGratitudeList = queryClient.getQueryData<Gratitude[]>([
        gratitude_query_key,
      ])

      queryClient.setQueryData(
        [gratitude_query_key],
        (cashedData: Gratitude[]) => {
          if (cashedData === undefined) return [optimisticGratitude]
          return [...cashedData, optimisticGratitude]
        },
      )

      return { previousGratitudeList, optimisticGratitude }
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(
        [gratitude_query_key],
        context?.previousGratitudeList,
      )
      toastError()
    },

    onSuccess: async (data, _, context) => {
      const validation = gratitudeSchema.safeParse(data)
      if (validation.error) throw new ValidationError()

      setTimeout(() => {
        queryClient.setQueryData(
          [gratitude_query_key],
          (cashedData: Gratitude[]) =>
            cashedData.map(gratitude => {
              if (gratitude.id === context.optimisticGratitude.id)
                return validation.data
              return gratitude
            }),
        )
      }, optimisticDuration)
    },
  })
}
