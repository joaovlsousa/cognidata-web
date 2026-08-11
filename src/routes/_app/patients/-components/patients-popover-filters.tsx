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
import { orderFilters, statusFilters } from '../-data'

export function PatientsPopoverFilters() {
  const { filters, setFilters } = useGetPatientsFilters()

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" size="lg" className="px-6">
            <FunnelIcon />
            <span>Filtros</span>
          </Button>
        }
      />

      <PopoverContent className="w-104" align="start">
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

        <Field>
          <FieldLabel>Ordenar por</FieldLabel>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {orderFilters.map((order) => (
              <Badge
                key={`${order.orderBy}-${order.order}`}
                onClick={() =>
                  setFilters({
                    order: order.order,
                    orderBy: order.orderBy,
                  })
                }
                variant={
                  order.order === filters.order &&
                  order.orderBy === filters.orderBy
                    ? 'default'
                    : 'outline'
                }
                className="p-3 cursor-pointer"
              >
                {order.label}
              </Badge>
            ))}
          </div>
        </Field>
      </PopoverContent>
    </Popover>
  )
}
