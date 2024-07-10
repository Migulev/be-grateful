import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { preloadImageInObject, shuffleArray } from '@/shared/libs/utils'

import { poopUpListQuery } from '../queries'
import { PoopUpCharacter, PoopUpPhrase, PoopUpToast } from './types'

export const usePoopUpToastList = (isEnabled: boolean) => {
  const [poopUpToastList, setPoopUpToastList] = useState<PoopUpToast[]>()
  const { data } = useQuery({
    ...poopUpListQuery(isEnabled),
  })

  useEffect(() => {
    if (data) {
      prepareList(data.characterList, data.phrasesList)
    }
  }, [data])

  async function prepareList(
    characterList: PoopUpCharacter[],
    phrasesList: PoopUpPhrase[],
  ) {
    const shuffledAndSlicedCharacterList = shuffleArray(characterList).slice(
      0,
      10,
    )
    const preloadedCharacterList = await preloadImagesInPoopUpList(
      shuffledAndSlicedCharacterList,
    )
    const shuffledPhrasesList = shuffleArray(phrasesList)

    const readyPoopUpToastList: PoopUpToast[] = []

    for (let i = 0; i < preloadedCharacterList.length; i++) {
      const character = preloadedCharacterList[i]
      const phrase = shuffledPhrasesList[i][character.gender]

      readyPoopUpToastList.push({
        image: character.image,
        name: character.name,
        title: phrase,
      })
    }

    setPoopUpToastList(readyPoopUpToastList)
  }

  return { poopUpToastList }
}

async function preloadImagesInPoopUpList(
  characters: PoopUpCharacter[],
): Promise<PoopUpCharacter[]> {
  const results = await Promise.allSettled(
    characters.map(character => preloadImageInObject(character)),
  )
  return results
    .filter(result => result.status === 'fulfilled')
    .map(result => (result as PromiseFulfilledResult<PoopUpCharacter>).value)
}
