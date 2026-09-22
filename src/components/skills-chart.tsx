import { cn } from '@/lib/utils'
import { Progress, ProgressLabel, ProgressValue } from './ui/progress'

export interface SkillsChartValues {
  alliteration: number
  segmentation: number
  visualMemory: number
  rhyme: number
  visualMotorCoordination: number
}

interface SkillsChartProps {
  values: SkillsChartValues
}

export function SkillsChart({ values }: SkillsChartProps) {
  function getSkillColorByValue(value: number): string {
    if (value < -1) {
      return 'bg-destructive'
    }

    if (value >= -1 && value < 0) {
      return 'bg-amber-300'
    }

    return 'bg-primary'
  }

  return (
    <div className="space-y-3">
      <Progress
        value={values.alliteration}
        min={-3}
        max={3}
        className={cn(
          'w-full gap-2',
          `**:data-[slot='progress-indicator']:${getSkillColorByValue(values.alliteration)}`
        )}
      >
        <ProgressLabel>Aliteração</ProgressLabel>
        <ProgressValue>{(_, value) => value}</ProgressValue>
      </Progress>

      <Progress
        value={values.segmentation}
        min={-3}
        max={3}
        className={cn(
          'w-full gap-2',
          `**:data-[slot='progress-indicator']:${getSkillColorByValue(values.segmentation)}`
        )}
      >
        <ProgressLabel>Segmentação</ProgressLabel>
        <ProgressValue>{(_, value) => value}</ProgressValue>
      </Progress>

      <Progress
        value={values.visualMemory}
        min={-3}
        max={3}
        className={cn(
          'w-full gap-2',
          `**:data-[slot='progress-indicator']:${getSkillColorByValue(values.visualMemory)}`
        )}
      >
        <ProgressLabel>Memória visual</ProgressLabel>
        <ProgressValue>{(_, value) => value}</ProgressValue>
      </Progress>

      <Progress
        value={values.rhyme}
        min={-3}
        max={3}
        className={cn(
          'w-full gap-2',
          `**:data-[slot='progress-indicator']:${getSkillColorByValue(values.rhyme)}`
        )}
      >
        <ProgressLabel>Rima</ProgressLabel>
        <ProgressValue>{(_, value) => value}</ProgressValue>
      </Progress>

      <Progress
        value={values.visualMotorCoordination}
        min={-3}
        max={3}
        className={cn(
          'w-full gap-2',
          `**:data-[slot='progress-indicator']:${getSkillColorByValue(values.visualMotorCoordination)}`
        )}
      >
        <ProgressLabel>Coordenação viso-motora</ProgressLabel>
        <ProgressValue>{(_, value) => value}</ProgressValue>
      </Progress>
    </div>
  )
}
