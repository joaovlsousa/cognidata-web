import { Link } from '@tanstack/react-router'
import { CornerDownLeftIcon, UserPlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { useGetPatientsFilters } from '@/hooks/use-get-patients-filters'

interface StatusFilter {
  tag: 'all' | 'active' | 'alert' | 'pending'
  label: string
}

const statusFilters: StatusFilter[] = [
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

export function PatientsTableFilters() {
  const { filters, setFilters, handleSetName } = useGetPatientsFilters()
  const [name, setName] = useState(filters.name ?? '')

  function handleChange(value: string) {
    setName(value)

    if (!value.length) {
      handleSetName(null)
    }
  }

  useEffect(() => {
    setName(filters.name ?? '')
  }, [filters.name])

  return (
    <div className="p-3 flex items-center justify-between gap-x-10 rounded-t-xl bg-muted">
      <div className="flex items-center gap-x-3 shrink-0">
        {statusFilters.map((status) => (
          <Badge
            key={status.tag}
            onClick={() =>
              setFilters({
                status: status.tag,
                page: 1,
              })
            }
            variant={status.tag === filters.status ? 'default' : 'outline'}
            className="p-3 cursor-pointer"
          >
            {status.label}
          </Badge>
        ))}
      </div>

      <InputGroup>
        <InputGroupInput
          value={name}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSetName(name)
          }}
          placeholder="Busque um paciente pelo nome"
          autoComplete="off"
          spellCheck={false}
        />

        {name && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              variant="default"
              onClick={() => handleSetName(name)}
            >
              <CornerDownLeftIcon />
              <span>Buscar</span>
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>

      <Link to="/patients/new">
        <Button type="button" className="px-6">
          <UserPlusIcon />
          <span>Novo paciente</span>
        </Button>
      </Link>
    </div>
  )
}
