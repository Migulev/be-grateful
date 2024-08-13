import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { gratitudeSecondStatsQuery } from '@/entities/gratitude'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/components/ui/chart'
import { Label } from '@/shared/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'

// interface Stat {
//   month: string
//   amount: number
// }

export const SecondStats = () => {
  const [option, setOption] = useState<6 | 3 | 0>(6)
  const { data: stats } = useQuery({ ...gratitudeSecondStatsQuery() })

  const chartData = stats?.slice(option, 12)

  // const bestMonth = chartData?.reduce<Stat | null>((acc, curr) => {
  //   if (!acc || (curr && curr.amount > (acc?.amount ?? 0))) {
  //     return curr
  //   }
  //   return acc
  // }, null)

  const chartConfig: ChartConfig = {
    amount: {
      label: 'благодарность',
      color: 'var(--secondary-foreground)',
    },
  } satisfies ChartConfig

  return (
    <Card className=" min-h-fit w-96">
      <CardHeader>
        <CardTitle>Благодарности по месяцам</CardTitle>
        <RadioGroup
          defaultValue="option-one"
          className="flex pt-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="option-one"
              id="option-one"
              onClick={() => setOption(6)}
            />
            <Label htmlFor="option-one">6 месяцев</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="option-two"
              id="option-two"
              onClick={() => setOption(3)}
            />
            <Label htmlFor="option-two">9 месяцев</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="option-three"
              id="option-three"
              onClick={() => setOption(0)}
            />
            <Label htmlFor="option-three">12 месяцев</Label>
          </div>
        </RadioGroup>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="monthName"
              tickLine={true}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              dataKey="amount"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={18}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <defs>
              <linearGradient
                id="fillGratitude"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="15%"
                  stopColor="var(--secondary-foreground)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--secondary-foreground)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="amount"
              type="bump"
              fill="url(#fillGratitude)"
              fillOpacity={0.4}
              stroke="var(--secondary-foreground)"
              dot={true}
              activeDot={{ r: 6 }}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Месяц - самый благодарный месяц ()
        </div>
      </CardFooter>
    </Card>
  )
}
