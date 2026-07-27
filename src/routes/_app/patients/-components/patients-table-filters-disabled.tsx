import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CornerDownLeftIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetPatientsFilters } from '@/hooks/use-get-patients-filters'

const perPageOptions = {
  10: '10 pacientes por página',
  15: '15 pacientes por página',
  20: '20 pacientes por página',
  25: '25 pacientes por página',
}

export function PatientsTableFiltersDisabled() {
  const { filters } = useGetPatientsFilters()

  return (
    <div className="p-3 flex items-center justify-between gap-x-10 rounded-t-xl bg-muted">
      <InputGroup>
        <InputGroupInput
          value={filters.name ?? ''}
          placeholder="Busque um paciente pelo nome"
          disabled
        />

        {filters.name && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="default" disabled>
              <CornerDownLeftIcon />
              <span>Buscar</span>
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>

      <div className="flex items-center gap-x-6">
        <div className="flex items-center gap-x-3">
          <Button variant="outline" size="icon-sm" disabled>
            <ChevronLeftIcon />
          </Button>

          {Array.from({ length: 5 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <Suspense only>
            <Skeleton key={`page-skeleton-${i}`} className="size-8" />
          ))}

          <Button variant="outline" size="icon-sm" disabled>
            <ChevronRightIcon />
          </Button>
        </div>

        <Select
          items={perPageOptions}
          defaultValue={filters.perPage.toString()}
          value={filters.perPage.toString()}
          disabled
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {Object.entries(perPageOptions).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
