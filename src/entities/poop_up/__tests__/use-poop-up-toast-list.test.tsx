import { useQuery } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, Mock, vi } from 'vitest'

import { preloadImageInObject } from '@/shared/utils'

import { PoopUpCharacter, PoopUpPhrase } from '../model/types'
import { usePoopUpToastList } from '../model/use-poop-up-toast-list'

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}))

vi.mock('@/shared/utils', () => ({
  preloadImageInObject: vi.fn(),
  shuffleArray: vi.fn(arr => arr),
}))

vi.mock('../queries', () => ({
  poopUpListQuery: vi.fn(),
}))

describe('usePoopUpToastList', () => {
  it('should return an empty list when data is not available', () => {
    ;(useQuery as Mock).mockReturnValue({ data: null })

    const { result } = renderHook(() => usePoopUpToastList(true))

    expect(result.current.poopUpToastList).toBeUndefined()
  })

  it('should prepare the list when data is available', async () => {
    const mockCharacters: PoopUpCharacter[] = [
      {
        name: 'Character1',
        image: new Image(),
        gender: 'male',
        avatarUrl: '',
      },
      {
        name: 'Character2',
        image: new Image(),
        gender: 'female',
        avatarUrl: '',
      },
    ]
    const mockPhrases: PoopUpPhrase[] = [
      { male: 'Hello, sir!', female: "Hello, ma'am!" },
      { male: 'Hi, sir!', female: "Hi, ma'am!" },
    ]
    ;(useQuery as Mock).mockReturnValue({
      data: { characterList: mockCharacters, phrasesList: mockPhrases },
    })
    ;(preloadImageInObject as Mock).mockImplementation(character =>
      Promise.resolve(character),
    )

    const { result } = renderHook(() => usePoopUpToastList(true))

    await waitFor(() => result.current.poopUpToastList !== undefined)

    expect(result.current.poopUpToastList).toEqual([
      {
        image: mockCharacters[0].image,
        name: 'Character1',
        title: 'Hello, sir!',
      },
      {
        image: mockCharacters[1].image,
        name: 'Character2',
        title: "Hi, ma'am!",
      },
    ])
  })
})
