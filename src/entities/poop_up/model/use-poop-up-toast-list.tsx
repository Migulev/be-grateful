import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { Lang, useLang } from '@/shared/libs/context/i18n-context'
import { preloadImageInObject, shuffleArray } from '@/shared/utils'

import { poopUpListQuery } from '../queries'
import { PoopUpCharacter, PoopUpPhrase, PoopUpToast } from './types'

const NUMBER_OF_POOP_UP_TOASTS = 3

export const usePoopUpToastList = (isEnabled: boolean) => {
  const [poopUpToastList, setPoopUpToastList] = useState<PoopUpToast[]>()
  const { data } = useQuery({
    ...poopUpListQuery(isEnabled),
  })

  const { lang } = useLang()

  useEffect(() => {
    if (data) {
      prepareList(data.characterList, data.phrasesList, lang)
    }
  }, [data, lang])

  async function prepareList(
    characterList: PoopUpCharacter[],
    phrasesList: PoopUpPhrase[],
    lang: Lang,
  ) {
    const shuffledAndSlicedCharacterList = shuffleArray(characterList).slice(
      0,
      NUMBER_OF_POOP_UP_TOASTS,
    )
    const preloadedCharacterList = await preloadImagesInPoopUpList(
      shuffledAndSlicedCharacterList,
    )
    const shuffledPhrasesList = shuffleArray(phrasesList)

    const readyPoopUpToastList: PoopUpToast[] = []

    for (let i = 0; i < preloadedCharacterList.length; i++) {
      const character = preloadedCharacterList[i]
      const phraseKey = lang + '_' + character.gender
      const phrase = shuffledPhrasesList[i][phraseKey as keyof PoopUpPhrase]
      const characterName =
        lang === 'ru' ? character.ru_name : character.en_name

      readyPoopUpToastList.push({
        image: character.image,
        name: characterName,
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
