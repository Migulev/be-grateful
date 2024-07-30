export const customTextMatcher =
  (text: string) => (_: unknown, element: Element | null) => {
    const hasText = (node: Element | null) => node?.textContent === text
    const nodeHasText = hasText(element)
    const childrenDontHaveText = Array.from(element?.children || []).every(
      child => !hasText(child),
    )
    return nodeHasText && childrenDontHaveText
  }
