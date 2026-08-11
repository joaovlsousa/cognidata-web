import { CartesianGrid, Dot, Line, LineChart, XAxis, YAxis } from 'recharts'

import { type ChartConfig, ChartContainer } from '@/components/ui/chart'

export const description = 'A line chart with dots and colors'

const chartData = [
  { session: 'Sessão 1', theta: -2.5, fill: 'var(--primary)' },
  { session: 'Sessão 2', theta: -1, fill: 'var(--primary)' },
  { session: 'Sessão 3', theta: 0, fill: 'var(--primary)' },
  { session: 'Sessão 4', theta: 1, fill: 'var(--primary)' },
  { session: 'Sessão 5', theta: 2.5, fill: 'var(--primary)' },
]

const chartConfig = {
  theta: {
    label: 'Theta',
    color: 'var(--primary)',
  },
} satisfies ChartConfig

export function ExampleChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-44">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          right: 32,
        }}
      >
        <CartesianGrid vertical={false} />

        <XAxis dataKey="session" />
        <YAxis
          domain={[-3, 3]}
          label={{ value: 'Theta', angle: -90, position: 'insideLeft' }}
        />
        <Line
          dataKey="theta"
          type="linear"
          stroke="var(--color-primary)"
          strokeWidth={2}
          dot={({ payload, ...props }) => {
            return (
              <Dot
                key={payload.theta}
                r={5}
                cx={props.cx}
                cy={props.cy}
                fill={payload.fill}
                stroke={payload.fill}
              />
            )
          }}
        />
      </LineChart>
    </ChartContainer>
  )
}
