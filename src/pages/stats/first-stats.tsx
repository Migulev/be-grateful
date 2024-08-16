import { useQuery } from '@tanstack/react-query'
import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'

import { gratitudeFirstStatsQuery } from '@/entities/gratitude'
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
import { Spinner } from '@/shared/components/ui/spinner'

export const FirstStats = () => {
  const { data: stats } = useQuery({ ...gratitudeFirstStatsQuery() })
  const chartData = [
    { period: 'за 90 дней', amount: stats?.gratitudeAmount90 },
    { period: 'за 30 дней', amount: stats?.gratitudeAmount30 },
    { period: 'за 7 дней', amount: stats?.gratitudeAmount7 },
  ]

  const previous30 = stats?.gratitudeAmountPrevious30 || 0
  const current30 = stats?.gratitudeAmount30 || 0

  const twoMonthsDifference =
    previous30 !== 0
      ? Math.round(((current30 - previous30) / previous30) * 100)
      : '∞'

  const chartConfig = {
    amount: {
      label: 'благодарность',
    },
    label: {
      color: 'var(--primary-foreground)',
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
    <Card className=" min-h-fit w-96">
      <CardHeader>
        <CardTitle>Благодарности за период</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className=""
          config={chartConfig}
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 26,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="period"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <XAxis
              dataKey="amount"
              type="number"
              hide
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="amount"
              layout="vertical"
              fill="var(--secondary-foreground)"
              radius={4}
            >
              <LabelList
                dataKey="period"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="amount"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <p className="flex gap-2 font-medium leading-none">
          <span className="relative">
            Текущий месяц
            <span className=" absolute -right-1 text-[8px]">*</span>
          </span>{' '}
          превышает предыдущий на {twoMonthsDifference}%
          <TrendingUp className="h-4 w-4" />
        </p>
        <p className="leading-none">
          <span className="relative mr-2">
            Общее <span className=" absolute -right-1 text-[8px]">**</span>
          </span>
          количество благодарностей - {stats?.gratitudeAmountAll}
        </p>
        <p className=" text-[10px] leading-3 text-muted-foreground">
          * 30 дней до сегодняшнего дня
        </p>
        <p className=" text-[10px] leading-3 text-muted-foreground">
          ** с момента регистрации
        </p>
      </CardFooter>
    </Card>
  )
}
