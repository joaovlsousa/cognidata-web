import {
  CheckCircleIcon,
  ClipboardCheckIcon,
  ClockIcon,
  CpuIcon,
  FileSpreadsheetIcon,
  Gamepad2Icon,
  HeartHandshakeIcon,
  HourglassIcon,
  ListTodoIcon,
  PuzzleIcon,
  TrendingUpIcon,
  UserIcon,
} from 'lucide-react'
import type { SkillsChartValues } from '@/components/skills-chart'

export const stepByStep = [
  {
    id: 1,
    title: 'Cadastro do paciente',
    description: 'Registre os dados e histórico clinico essencial.',
    icon: UserIcon,
  },
  {
    id: 2,
    title: 'Seleção da avaliação ou jogo',
    description: 'Escolha o instrumento mais adequado ao objetiva clínica.',
    icon: ClipboardCheckIcon,
  },
  {
    id: 3,
    title: 'Aplicação clínica',
    description: 'Realize a sessão com o paciente de forma prática e segura.',
    icon: Gamepad2Icon,
  },
  {
    id: 4,
    title: 'Processamento psicométrico',
    description: 'Algoritmos calculam métricas e estimam habilidades.',
    icon: CpuIcon,
  },
  {
    id: 5,
    title: 'Relatório e indicadores',
    description: 'Visualize resultados claros comparáveis ao longo do tempo.',
    icon: FileSpreadsheetIcon,
  },
  {
    id: 6,
    title: 'Intervenção e acompanhamento',
    description:
      'Use os dados para planejar intervenções e monitorar a evolução.',
    icon: HeartHandshakeIcon,
  },
]

export const platformRecords = [
  {
    title: 'Tempo de início e fim',
    description: 'Registra quando a sessão começa e termina.',
    icon: ClockIcon,
  },
  {
    title: 'Duração da sessão',
    description: 'Mede o tempo total de aplicação.',
    icon: HourglassIcon,
  },
  {
    title: 'Acertos e desempenho',
    description: 'Acompanha acertos, erros e padrões de resposta.',
    icon: ListTodoIcon,
  },
  {
    title: 'Theta (habilidade estimada)',
    description: 'Estima a habilidade do paciente em cada domínio avaliado.',
    icon: TrendingUpIcon,
  },
  {
    title: 'Probabilidade de acerto',
    description: 'Indica a chance de acerto cada item respondido.',
    icon: CheckCircleIcon,
  },
  {
    title: 'Dificuldade do item',
    description: 'Mostra o nivel de dificuldade de cada item avaliado.',
    icon: PuzzleIcon,
  },
]

export const hablitiesChartValues: SkillsChartValues = {
  alliteration: 0.47,
  segmentation: -1.12,
  visualMemory: 2.22,
  rhyme: -0.77,
  visualMotorCoordination: 1.3,
}
