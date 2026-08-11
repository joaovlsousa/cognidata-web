import {
  ClipboardCheckIcon,
  Clock3Icon,
  CookieIcon,
  FileTextIcon,
  type LucideIcon,
  Share2Icon,
  ShieldCheckIcon,
  UserIcon,
  UsersIcon,
} from 'lucide-react'

interface PrivacyPolicies {
  title: string
  description: string
  icon: LucideIcon
}

export const privacyPolicies: PrivacyPolicies[] = [
  {
    title: 'Resumo',
    description:
      'Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos os dados pessoais e clínicos de profissionais de psicologia, pacientes e demais usuários da plataforma CognitDataHub, em conformidade com a LGPD.',
    icon: FileTextIcon,
  },
  {
    title: 'Quais dados coletamos',
    description:
      'Coletamos dados de identificação, contato, dados profissionais e informações clínicas necessárias para a prestação dos serviços, além de dados de uso da plataforma e cookies para melhorar sua experiência.',
    icon: ClipboardCheckIcon,
  },
  {
    title: 'Como usamos os dados',
    description:
      'Utilizamos os dados para fornecer e melhorar nossos serviços, gerar resultados de avaliações, personalizar experiências, comunicar informações importantes, garantir a segurança da plataforma e cumprir obrigações legais.',
    icon: UsersIcon,
  },
  {
    title: 'Compartilhamento de informações',
    description:
      'Não vendemos dados pessoais. As informações podem ser compartilhadas apenas com prestadores de serviços essenciais para o funcionamento da plataforma ou por obrigação legal, sempre com garantia de confidencialidade.',
    icon: Share2Icon,
  },
  {
    title: 'Segurança e conformidade com a LGPD',
    description:
      'Adotamos medidas técnicas e organizacionais para proteger os dados contra acessos não autorizados, vazamentos, perda ou destruição. Nossa plataforma segue os princípios da LGPD, incluindo finalidade, necessidade, transparência e responsabilização.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Tempo de retenção',
    description:
      'Mantemos os dados apenas pelo tempo necessário para cumprir as finalidades informadas ou conforme exigido por lei. Dados clínicos podem ser mantidos por prazos específicos conforme normas éticas e legais aplicáveis.',
    icon: Clock3Icon,
  },
  {
    title: 'Direitos do titular',
    description:
      'Você pode, a qualquer momento, solicitar acesso, correção, exclusão, anonimização, portabilidade dos dados, revogação de consentimento e outras solicitações previstas na LGPD, através dos nossos canais de atendimento.',
    icon: UserIcon,
  },
  {
    title: 'Cookies e tecnologias semelhantes',
    description:
      'Utilizamos cookies e tecnologias similares para entender o uso da plataforma, lembrar preferências e melhorar funcionalidades. Você pode gerenciar suas preferências de cookies nas configurações do seu navegador.',
    icon: CookieIcon,
  },
]
