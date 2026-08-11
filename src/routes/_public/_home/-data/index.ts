import {
  ChartNoAxesCombinedIcon,
  ClipboardCheckIcon,
  DatabaseIcon,
  FlaskConicalIcon,
  Gamepad2Icon,
  ShieldCheckIcon,
  UsersIcon,
} from 'lucide-react'

export const resources = [
  {
    icon: UsersIcon,
    title: 'Gestão de pacientes',
    description:
      'Cadastre, organize e acompanhe seus pacientes de forma prática e segura.',
    items: [
      'Cadastro de pacientes',
      'Histórico de anammese',
      'Observações clínicas',
    ],
  },
  {
    icon: ClipboardCheckIcon,
    title: 'Avaliações psicométricas',
    description:
      'Aplique avaliações validadas e obtenha dados precisos e confiáveis.',
    items: [
      'Avaliações individuais',
      'Testes validados',
      'Registro de sessões',
    ],
  },
  {
    icon: Gamepad2Icon,
    title: 'Jogos educativos',
    description:
      'Utilize jogos baseados em habilidades cognitivas para avaliação e intervenção.',
    items: [
      'Cálculo de theta',
      'Probabilidade de acerto',
      'Acurácia e consistência',
    ],
  },
  {
    icon: ChartNoAxesCombinedIcon,
    title: 'Relatórios e indicadores',
    description:
      'Gere relatórios completos e análise de indicadores para subsidiar decisões clínicas.',
    items: [
      'Relatório individual',
      'Evolução por habilidade',
      'Comparativos e históricos',
    ],
  },
]

export const benefits = [
  {
    icon: DatabaseIcon,
    title: 'Centralização',
    description:
      'Todos os dados dos pacientes em um só lugar, com histórico completo e organizado.',
  },
  {
    icon: FlaskConicalIcon,
    title: 'Base científica',
    description:
      'Instrumentos e métricas validados para decisões clínicas mais seguras.',
  },
  {
    icon: ChartNoAxesCombinedIcon,
    title: 'Acompanhamento contínuo',
    description:
      'Monitore a evolução ao longo do tempo e ajuste intervenções com base em evidências.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Segurança e LGPD',
    description:
      'Dados protegidos com criptografia, acesso controlado e total conformidade com a LGPD.',
  },
]
