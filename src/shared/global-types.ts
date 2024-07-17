export type DurationTW = 0 | 150 | 200 | 300 | 500 | 700 | 1000

export type ObjectWithImageUrl<T> = T & {
  avatarUrl: string
  image?: HTMLImageElement
}
