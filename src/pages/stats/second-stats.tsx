import { useEffect, useState } from 'react'

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
import { Spinner } from '@/shared/components/ui/spinner'

const MONTH_OPTION_STORAGE_KEY = 'month-option'
type MonthOptionType = 'option-one' | 'option-two' | 'option-three'

interface Stat {
  monthName: string
  amount: number | null
}

export const SecondStats = () => {
  const [option, setOption] = useState<MonthOptionType>(
    localStorage.getItem(
      MONTH_OPTION_STORAGE_KEY,
    ) as unknown as MonthOptionType,
  )

  useEffect(() => {
    localStorage.setItem(MONTH_OPTION_STORAGE_KEY, option)
  }, [option])
  const { data: stats } = useQuery({ ...gratitudeSecondStatsQuery() })

  const chartData = stats?.gratitudeMonthData.slice(
    option === 'option-one' ? 6 : option === 'option-two' ? 3 : 0,
    12,
  )

  const findMostAmountMonth = (stats: Stat[]): Stat | null => {
    if (!stats || stats.length === 0) return null

    return stats.reduce<Stat | null>((acc, curr) => {
      if (
        !acc ||
        (curr.amount !== null &&
          (acc.amount === null || curr.amount > acc.amount))
      ) {
        return curr
      }
      return acc
    }, null)
  }

  const countTotalAmounts = (stats: Stat[]): number => {
    return stats.reduce((total, curr) => {
      return total + (curr.amount ?? 0)
    }, 0)
  }

  const bestMonth = findMostAmountMonth(stats?.gratitudeMonthData || [])
  const totalAmount = countTotalAmounts(chartData || [])

  const chartConfig: ChartConfig = {
    amount: {
      label: 'благодарность',
      color: 'var(--secondary-foreground)',
    },
  } satisfies ChartConfig

  if (!stats) {
    return (
      <Card className="flex size-96 items-center justify-center">
        <Spinner />
      </Card>
    )
  }

  return (
    <Card className="min-h-fit w-96">
      <CardHeader>
        <CardTitle>Благодарности по месяцам</CardTitle>
        <RadioGroup
          defaultValue={option}
          className="flex pt-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="option-one"
              id="option-one"
              onClick={() => setOption('option-one')}
            />
            <Label htmlFor="option-one">6 месяцев</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="option-two"
              id="option-two"
              onClick={() => setOption('option-two')}
            />
            <Label htmlFor="option-two">9 месяцев</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="option-three"
              id="option-three"
              onClick={() => setOption('option-three')}
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
        <p className="flex gap-2 font-medium leading-none">
          {bestMonth ? `${bestMonth.monthName}` : ''} - самый благодарный месяц
          - {bestMonth?.amount || ' '}
        </p>
        <p className="flex gap-2 font-medium leading-none">
          За{' '}
          {option === 'option-one' ? '6' : option === 'option-two' ? '9' : '12'}{' '}
          месяцев благодарностей - {totalAmount}
        </p>
      </CardFooter>
    </Card>
  )
}
