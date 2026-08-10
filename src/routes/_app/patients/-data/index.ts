interface StatusFilter {
  tag: 'all' | 'active' | 'alert' | 'pending'
  label: string
}

export const statusFilters: StatusFilter[] = [
  {
    tag: 'all',
    label: 'Todos',
  },
  {
    tag: 'active',
    label: 'Ativos',
  },
  {
    tag: 'alert',
    label: 'Com alerta',
  },
  {
    tag: 'pending',
    label: 'Aguardando',
  },
]

interface OrderFilter {
  orderBy: 'createdAt' | 'name'
  order: 'asc' | 'desc'
  label: string
}

export const orderFilters: OrderFilter[] = [
  {
    orderBy: 'name',
    order: 'asc',
    label: 'Ordem alfabética (A-Z)',
  },
  {
    orderBy: 'createdAt',
    order: 'desc',
    label: 'Data de criação: mais recentes',
  },
  {
    orderBy: 'name',
    order: 'desc',
    label: 'Ordem alfabética (Z-A)',
  },
  {
    orderBy: 'createdAt',
    order: 'asc',
    label: 'Data de criação: mais antigos',
  },
]
