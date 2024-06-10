// import { Plus } from 'lucide-react'
// import { FC, useState } from 'react'

// // import { useCreateGratitude } from '@/client_services/models/gratitude'
// import { Button } from '@/shared/components/ui/button'
// import { Input } from '@/shared/components/ui/input'
// import { cn } from '@/shared/utils'

// type Props = {
//   className?: string
// }

// export const HeroAction: FC<Props> = ({ className }) => {
//   const [gratitude, setGratitude] = useState('')
//   const { mutateAsync: createGratitudeAsync, isPending } = useCreateGratitude()

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     if (gratitude) {
//       await createGratitudeAsync(gratitude)
//       setGratitude('')
//     }
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className={cn(className, 'flex w-full max-w-xl')}
//     >
//       {/* !todo: replace input with textarea */}
//       <Input
//         onChange={e => setGratitude(e.target.value)}
//         value={gratitude}
//         placeholder="За что ты сегодня благодарен/а?"
//         autoFocus
//       />
//       <Button
//         type="submit"
//         className="ml-2 bg-blue-600 text-white hover:bg-blue-700"
//         disabled={isPending}
//       >
//         <Plus className="h-4" />
//       </Button>
//     </form>
//   )
// }
