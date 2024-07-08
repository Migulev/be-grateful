export type DurationTW = 0 | 150 | 200 | 300 | 500 | 700 | 1000

export type WithImageUrl<T> = T & {
  avatarUrl: string
  image?: HTMLImageElement
}
