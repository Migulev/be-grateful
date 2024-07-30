import { ZodError } from 'zod'

import { poopUpApi } from '@/shared/api/poop-up'
import { ValidationError } from '@/shared/libs/errors'

import {
  poopUpCharacterArraySchema,
  poopUpPraseArraySchema,
} from '../model/types'
import { poopUpListQuery } from '../queries'

vi.mock('@/shared/api/poop-up')
vi.mock('../model/types')

describe('poopUpListQuery', () => {
  const mockCharacterList = [
    {
      name: 'Character1',
      gender: 'male' as const,
      image: new Image(),
      avatarUrl: 'url1',
    },
    {
      name: 'Character2',
      gender: 'female' as const,
      image: new Image(),
      avatarUrl: 'url2',
    },
  ]
  const mockPhrasesList = [
    { male: 'Phrase1', female: 'Phrase1' },
    { male: 'Phrase2', female: 'Phrase2' },
  ]

  beforeEach(() => {
    vitest.clearAllMocks()
  })

  it('should return valid character and phrases lists', async () => {
    vi.spyOn(poopUpApi, 'getCharactersList').mockResolvedValue(
      mockCharacterList,
    )
    vi.spyOn(poopUpApi, 'getPhrasesList').mockResolvedValue(mockPhrasesList)

    vi.spyOn(poopUpCharacterArraySchema, 'safeParse').mockReturnValue({
      success: true,
      data: mockCharacterList,
    })

    vi.spyOn(poopUpPraseArraySchema, 'safeParse').mockReturnValue({
      success: true,
      data: mockPhrasesList,
    })

    const query = poopUpListQuery(true)
    const result = await query.queryFn()

    expect(result).toEqual({
      characterList: mockCharacterList,
      phrasesList: mockPhrasesList,
    })
    expect(poopUpApi.getCharactersList).toHaveBeenCalled()
    expect(poopUpApi.getPhrasesList).toHaveBeenCalled()
    expect(poopUpCharacterArraySchema.safeParse).toHaveBeenCalledWith(
      mockCharacterList,
    )
    expect(poopUpPraseArraySchema.safeParse).toHaveBeenCalledWith(
      mockPhrasesList,
    )
  })

  it('should throw a ValidationError for invalid character or phrases list', async () => {
    vi.spyOn(poopUpApi, 'getCharactersList').mockResolvedValue(
      mockCharacterList,
    )
    vi.spyOn(poopUpApi, 'getPhrasesList').mockResolvedValue(mockPhrasesList)

    vi.spyOn(poopUpCharacterArraySchema, 'safeParse').mockReturnValue({
      success: false,
      data: undefined,
      error: new ZodError([]),
    })

    const query = poopUpListQuery(true)
    await expect(query.queryFn()).rejects.toThrow(ValidationError)
  })

  it('should not call poopUpApi methods when isEnabled is false', async () => {
    const query = poopUpListQuery(false)
    await query.queryFn()

    expect(poopUpApi.getCharactersList).not.toHaveBeenCalled()
    expect(poopUpApi.getPhrasesList).not.toHaveBeenCalled()
  })
})
