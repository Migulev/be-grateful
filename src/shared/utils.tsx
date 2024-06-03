import { ClassValue, clsx } from 'clsx'
import { Children, createElement, isValidElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

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
