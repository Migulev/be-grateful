import { useQuery } from '@tanstack/react-query'
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

import { useI18n } from './i18n'

export const FirstStats = () => {
  const { t } = useI18n()
  const { data: stats } = useQuery({ ...gratitudeFirstStatsQuery() })

  const chartData = [
    { period: t('days90'), amount: stats?.gratitudeAmount90 },
    { period: t('days60'), amount: stats?.gratitudeAmount60 },
    { period: t('days30'), amount: stats?.gratitudeAmount30 },
    { period: t('days7'), amount: stats?.gratitudeAmount7 },
  ]

  const previous30 = stats?.gratitudeAmountPrevious30 || 0
  const current30 = stats?.gratitudeAmount30 || 0

  const twoMonthsDifference =
    previous30 !== 0
      ? Math.round(((current30 - previous30) / previous30) * 100)
      : '∞'

  const chartConfig = {
    amount: {
      label: t('gratitude'),
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
        <CardTitle>{t('cardTitle')}</CardTitle>
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
      <CardFooter className="flex-col items-start gap-2  text-sm">
        {t('footer_1', { twoMonthsDifference })}
        {t('footer_2', { gratitudeAmountAll: stats.gratitudeAmountAll })}

        <p className=" text-[10px] leading-3 text-muted-foreground">
          * {t('comment')}
        </p>
      </CardFooter>
    </Card>
  )
}
