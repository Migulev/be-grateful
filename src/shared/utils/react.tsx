import {
  Children,
  Context,
  createContext,
  createElement,
  isValidElement,
  ReactNode,
  RefObject,
  startTransition,
  useContext,
  useEffect,
  useState,
} from 'react'

import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { ObjectWithImageUrl } from '../global-types'
import { Lang } from '../libs/context/i18n-context'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ComposeChildren({ children }: { children: ReactNode }) {
  const array = Children.toArray(children)
  const last = array.pop()

  return (
    <>
      {array.reduceRight(
        (child, element) =>
          isValidElement(element)
            ? createElement(element.type, element.props, child)
            : child,
        last,
      )}
    </>
  )
}

export function generateRandomId(): string {
  return `id_${Math.random().toString(36).slice(2, 11)}_${Date.now().toString(36)}`
}

export function convertDurationTW(duration: number) {
  switch (duration) {
    case 150:
      return 'duration-150'
    case 200:
      return 'duration-200'
    case 300:
      return 'duration-300'
    case 500:
      return 'duration-500'
    case 700:
      return 'duration-700'
    case 1000:
      return 'duration-1000'
    default:
      return 'duration-0'
  }
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString + 'T00:00:00')
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear()).slice(-2)
  return `${day}/${month}/${year}`
}

export const useResizeTextarea = (
  element: RefObject<HTMLTextAreaElement>,
  dependency: string,
) => {
  useEffect(() => {
    if (element.current) {
      element.current.style.height = 'auto'
      element.current.style.height = `${element.current.scrollHeight}px`
    }
  }, [dependency, element])
}

export function createStrictContext<T>() {
  return createContext<T | null>(null)
}

export function useStrictContext<T>(context: Context<T | null>) {
  const value = useContext(context)
  if (value === null) throw new Error('Strict context not passed')
  return value as T
}

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false)

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches)
    }

    const result = matchMedia(query)
    result.addEventListener('change', onChange)
    setValue(result.matches)

    return () => result.removeEventListener('change', onChange)
  }, [query])

  return value
}

// Define the hook type with a generic parameter extending HTMLElement
export const useOutsideClick = <T extends HTMLElement>(
  ref: React.RefObject<T> | React.RefObject<SVGSVGElement>,
  callback: () => void,
): void => {
  useEffect(() => {
    // Event listener to call the callback if clicked outside of the element
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)

    // Remove the event listener on cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback])
}

export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export function preloadImageInObject<T>(
  obj: ObjectWithImageUrl<T>,
): Promise<ObjectWithImageUrl<T>> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = obj.avatarUrl
    img.onload = () => {
      obj.image = img
      resolve(obj)
    }
    img.onerror = err => reject(err)
  })
}

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function convertToHsl(cssValue: string) {
  return 'hsl(' + cssValue + ')'
}

export const getLocalISOTime = () => {
  const now = new Date()
  const localISOTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, -5)
  return localISOTime
}

export const getLocalISOTimeOfYesterday = () => {
  const now = new Date()
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const localISOTime = new Date(
    yesterday.getTime() - yesterday.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .slice(0, -1)
  return localISOTime
}

export const getLocalISOTime_N_DaysBefore = (days: number) => {
  const now = new Date()
  const yesterday = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
  const localISOTime = new Date(
    yesterday.getTime() - yesterday.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .slice(0, -1)
  return localISOTime
}

export const separateFromTime = (date: string) => date.split('T')[0]

export function useAppearance(
  options = {} as {
    delay?: boolean
    appearanceDelay?: number
    instantDisplay?: boolean
    displayTime?: number
  },
) {
  const {
    delay = true,
    appearanceDelay = 350,
    instantDisplay = false,
    displayTime = 500,
  } = options

  const [isShown, setIsShown] = useState(instantDisplay)

  useEffect(() => {
    if (delay) {
      const timer = setTimeout(() => {
        startTransition(() => setIsShown(true))
      }, appearanceDelay)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        startTransition(() => setIsShown(false))
      }, displayTime)
      return () => clearTimeout(timer)
    }
  }, [appearanceDelay, delay, displayTime])

  return isShown
}

export const getYearMonths = (lang: Lang) => {
  const now = new Date()
  const currentMonthIndex = now.getMonth() // 0-11, where 0 is January and 11 is December
  const currentYear = now.getFullYear()
  const monthNames = getMonthNames(lang)

  const monthsBackward = []

  for (let i = 11; i >= 0; i--) {
    const monthIndex = (currentMonthIndex - i + 12) % 12
    const year = currentYear - 1 + Math.floor((12 - i + currentMonthIndex) / 12)
    monthsBackward.push({
      monthName: monthNames[monthIndex],
      monthNumber: monthIndex + 1, // 1-12
      year: year,
    })
  }

  return monthsBackward
}

const getMonthNames = (lang: Lang) => {
  const monthNames: { [key: string]: string[] } = {
    ru: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    en: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  }
  return monthNames[lang] || monthNames['en']
}
