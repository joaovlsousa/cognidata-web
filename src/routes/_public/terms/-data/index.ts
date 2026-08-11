import {
  BanIcon,
  CircleCheckIcon,
  CloudIcon,
  CopyrightIcon,
  FileCheckIcon,
  LockIcon,
  type LucideIcon,
  MessageCircleIcon,
  ShieldCheckIcon,
  UserCheckIcon,
  UserIcon,
} from 'lucide-react'

interface TermsOfUse {
  title: string
  description: string
  icon: LucideIcon
}

export const termsOfUse: TermsOfUse[] = [
  {
    title: 'Aceitação dos termos',
    description:
      'Ao acessar ou utilizar o CognitDataHub, você declara ter lido, compreendido e concordado com estes Termos de Uso, bem como com nossa Política de Privacidade.',
    icon: FileCheckIcon,
  },
  {
    title: 'Quem pode utilizar a plataforma',
    description:
      'A plataforma é destinada exclusivamente a psicólogos regularmente registrados no Conselho Regional de Psicologia (CRP) e a clínicas ou instituições autorizadas.',
    icon: UserIcon,
  },
  {
    title: 'Cadastro e credenciais',
    description:
      'Para utilizar o CognitDataHub, é necessário realizar um cadastro com informações verdadeiras e completas. O usuário é responsável por manter suas credenciais de acesso seguras e confidenciais.',
    icon: LockIcon,
  },
  {
    title: 'Uso permitido',
    description:
      'A plataforma deve ser utilizada apenas para fins profissionais, relacionados à avaliação psicológica, acompanhamento clínico, gestão de dados e intervenções permitidas pela legislação e pelo Código de Ética Profissional do Psicólogo.',
    icon: CircleCheckIcon,
  },
  {
    title: 'Responsabilidades do usuário',
    description:
      'O usuário é responsável pelo uso adequado da plataforma e pelo conteúdo inserido, garantindo a precisão das informações e respeitando os direitos de pacientes e terceiros.',
    icon: UserCheckIcon,
  },
  {
    title: 'Propriedade intelectual',
    description:
      'Todo o conteúdo, funcionalidades, marcas, textos, gráficos, logotipos e demais elementos do CognitDataHub são de propriedade exclusiva da plataforma ou de seus licenciantes.',
    icon: CopyrightIcon,
  },
  {
    title: 'Disponibilidade e atualizações',
    description:
      'O CognitDataHub busca manter a plataforma disponível 24/7, podendo realizar manutenções programadas e atualizações para melhorias de performance, segurança e novos recursos.',
    icon: CloudIcon,
  },
  {
    title: 'Suspensão ou encerramento de acesso',
    description:
      'Reservamo-nos o direito de suspender ou encerrar o acesso do usuário, de forma unilateral, em caso de violação destes termos ou de uso inadequado da plataforma.',
    icon: BanIcon,
  },
  {
    title: 'Privacidade e proteção de dados',
    description:
      'O tratamento de dados pessoais realizado na plataforma segue a nossa Política de Privacidade e a Lei Geral de Proteção de Dados (LGPD).',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Fale conosco',
    description:
      'Em caso de dúvidas sobre estes Termos de Uso ou sobre a plataforma, entre em contato com nossa equipe pelos canais indicados ao lado.',
    icon: MessageCircleIcon,
  },
]
