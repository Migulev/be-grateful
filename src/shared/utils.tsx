import {
  Children,
  Context,
  createContext,
  createElement,
  isValidElement,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useState,
} from 'react'

import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { ObjectWithImageUrl } from './config/global-types'

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

export function formatDate(isoString: string) {
  const date = new Date(isoString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
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
