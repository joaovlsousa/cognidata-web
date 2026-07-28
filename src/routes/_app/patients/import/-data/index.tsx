interface ColumnSpec {
  header: string
  example: string
  required: boolean
  hint?: string
}

export const columnSpecs: ColumnSpec[] = [
  {
    header: 'Nome',
    example: 'Maria Eduarda Silva',
    required: true,
  },
  {
    header: 'Data de Nascimento',
    example: '12/03/2016',
    required: true,
    hint: 'Formato aceito: DD/MM/AAAA',
  },
  {
    header: 'Gênero',
    example: 'Feminino',
    required: true,
    hint: 'Masculino ou Feminino',
  },
  {
    header: 'Nome do Responsável',
    example: 'Ana Silva',
    required: true,
  },
  {
    header: 'Email do Responsável',
    example: 'ana.silva@example.com',
    required: true,
  },
  {
    header: 'Parentesco do Responsável',
    example: 'Pai/Mãe',
    required: true,
    hint: 'Pai/Mãe, Avô/Avó ou Tio/Tia',
  },
  {
    header: 'Telefone do Responsável',
    example: '11987654321',
    required: true,
    hint: '11 dígitos, apenas números',
  },
  {
    header: 'Nome da Escola',
    example: 'Colégio Santa Rita',
    required: true,
  },
  {
    header: 'Ano Escolar',
    example: '3',
    required: true,
    hint: 'Número de 1 a 6',
  },
  {
    header: 'Turno Escolar',
    example: 'Manhã',
    required: true,
    hint: 'Manhã, Tarde ou Integral',
  },
  {
    header: 'Queixa Principal',
    example: 'Dificuldade para ler e se concentrar',
    required: true,
  },
  {
    header: 'Observações',
    example:
      'Paciente aprensenta dificuldades de concentração após 5 minutos de leitura',
    required: false,
  },
]
