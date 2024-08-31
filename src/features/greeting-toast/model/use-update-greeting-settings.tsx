import { useMutation } from '@tanstack/react-query'

import { profileApi } from '@/shared/api/profile'

export const useUpdateGreetingSettings = () => {
  return useMutation({
    mutationFn: profileApi.updateGreeting,
  })
}
