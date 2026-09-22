import { CartesianGrid, Dot, Line, LineChart, XAxis, YAxis } from 'recharts'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart'

interface ThetaLineChartProps {
  data: {
    session: string
    theta: number
    fill?: string
  }[]
}

const chartConfig = {
  theta: {
    label: 'Theta',
    color: 'var(--primary)',
  },
} satisfies ChartConfig

export function ThetaLineChart({ data }: ThetaLineChartProps) {
  data.forEach((item) => {
    if (item.fill === undefined) {
      item.fill = 'var(--primary)'
    }
  })

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          top: 12,
          right: 12,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} />

        <XAxis dataKey="session" tickMargin={6} />
        <YAxis domain={[-3, 3]} width={30} tickMargin={6} tickCount={7} />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" nameKey="theta" />}
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
                r={4}
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
