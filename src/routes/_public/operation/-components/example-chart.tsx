import { ThetaLineChart } from '@/components/theta-line-chart'

export const description = 'A line chart with dots and colors'

const chartData = [
  { session: 'Sessão 1', theta: -2.5 },
  { session: 'Sessão 2', theta: -1 },
  { session: 'Sessão 3', theta: 0 },
  { session: 'Sessão 4', theta: 1 },
  { session: 'Sessão 5', theta: 2.5 },
]

export function ExampleChart() {
  return <ThetaLineChart data={chartData} />
}
