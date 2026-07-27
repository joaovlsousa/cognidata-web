import { FunnelIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
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

export function PatientsPopoverFilters() {
  const { filters, setFilters } = useGetPatientsFilters()

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="secondary" size="lg" className="px-6">
            <FunnelIcon />
            <span>Filtros</span>
          </Button>
        }
      />
      <PopoverContent className="w-fit" align="start">
        <Field>
          <FieldLabel>Status</FieldLabel>

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
        </Field>
      </PopoverContent>
    </Popover>
  )
}
