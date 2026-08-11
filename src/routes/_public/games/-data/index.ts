import {
  CaseSensitiveIcon,
  ChartNoAxesCombinedIcon,
  ClipboardCheckIcon,
  CpuIcon,
  FileCheckIcon,
  Gamepad2Icon,
  PercentIcon,
  TargetIcon,
  TrendingUpIcon,
} from 'lucide-react'

export const habilities = [
  {
    icon: CaseSensitiveIcon,
    title: 'Aliteração',
    description: 'Identificação de sons iniciais iguais.',
  },
  {
    icon: ClipboardCheckIcon,
    title: 'Segmentação',
    description: 'Divisão de palavras em silabas e sons.',
  },
  {
    icon: Gamepad2Icon,
    title: 'Memória visual',
    description: 'Reconhecimento e retenção de padrões.',
  },
  {
    icon: ChartNoAxesCombinedIcon,
    title: 'Rima',
    description: 'Identificação de palavras que rimam.',
  },
  {
    icon: ChartNoAxesCombinedIcon,
    title: 'Coordenação viso-motora',
    description: 'Precisão e agilidade em ações motoras.',
  },
]

export const steps = [
  {
    icon: Gamepad2Icon,
    title: 'Interação no jogo',
    description:
      'A criança realiza desafios alinhados a habilidades especificas.',
  },
  {
    icon: ClipboardCheckIcon,
    title: 'Registro da resposta',
    description:
      'As respostas e o tempo de reação são registrados automaticamente.',
  },
  {
    icon: CpuIcon,
    title: 'Processamento psicométrico',
    description:
      'Algoritmos analisam os dados com base em modelos psicométricos validados.',
  },
  {
    icon: ChartNoAxesCombinedIcon,
    title: 'Indicadores e relatório',
    description:
      'Resultados são transformados em indicadores clinicos e relatórios completos.',
  },
]

export const reportFeatures = [
  {
    icon: TargetIcon,
    title: 'Acurácia e desempenho',
    description:
      'Métricas detalhadas sobre acertos, erros e tempo de resposta por habilidade.',
  },
  {
    icon: TrendingUpIcon,
    title: 'Theta e evolução',
    description:
      'Estimativa da habilidade (Theta) e sua evolução ao longo das sessões.',
  },
  {
    icon: PercentIcon,
    title: 'Probabilidade de acerto',
    description:
      'Probabilidade de acerto calculada para cada item e por habilidade avaliada.',
  },
  {
    icon: FileCheckIcon,
    title: 'Resumo da sessão',
    description:
      'Visão consolidada da sessão com recomendações e próximos passos clínicos.',
  },
]
