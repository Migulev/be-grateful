import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { Gratitude, gratitudeListQuery } from '@/entities/gratitude'

import { MockGratitude } from './types'

export const useGratitudeList = () => {
  const { data: gratitudeListQueryResult } = useQuery({
    ...gratitudeListQuery(),
  })
  const [gratitudeList, setGratitudeList] = useState<Gratitude[] | undefined>(
    [],
  )
  const [isShortVersion, setIsShortVersion] = useState(true)
  const [canLoadMore, setCanLoadMore] = useState(false)

  useEffect(() => {
    if (gratitudeListQueryResult === undefined) return
    if (gratitudeListQueryResult.length <= 10) {
      const mockGratitudeListLength = 10 - gratitudeListQueryResult.length
      const mockGratitudeList = new Array<MockGratitude>(
        mockGratitudeListLength,
      ).fill({
        id: 'mock-id',
        text: '',
        createdAt: new Date().toISOString(),
      })

      setGratitudeList([...gratitudeListQueryResult, ...mockGratitudeList])
      setCanLoadMore(false)
    }

    if (gratitudeListQueryResult.length > 10 && isShortVersion) {
      setGratitudeList(gratitudeListQueryResult.slice(0, 10))
      setCanLoadMore(true)
    } else {
      // setGratitudeList(gratitudeListQueryResult)
      setCanLoadMore(false)
    }
  }, [gratitudeListQueryResult, isShortVersion])

  return { gratitudeList, canLoadMore, setIsShortVersion }
}
