import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CornerDownLeftIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
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
import { useGetPatients } from '@/hooks/http/patient/use-get-patients'
import { useGetPatientsFilters } from '@/hooks/use-get-patients-filters'
import { useGetPatientsPagesPagination } from '@/hooks/use-get-patients-pages-pagination'

const perPageOptions = {
  10: '10 pacientes por página',
  15: '15 pacientes por página',
  20: '20 pacientes por página',
  25: '25 pacientes por página',
}

export function PatientsTableFilters() {
  const { filters, setFilters, handleSetName } = useGetPatientsFilters()
  const [name, setName] = useState(filters.name ?? '')

  const {
    data: { meta },
  } = useGetPatients()

  const pages = useGetPatientsPagesPagination(meta.page, meta.totalPages)

  function handleNextPage() {
    if (meta.page >= meta.totalPages) {
      return
    }

    setFilters({
      page: meta.page + 1,
    })
  }

  function handlePreviousPage() {
    if (meta.page <= 1) {
      return
    }

    setFilters({
      page: meta.page - 1,
    })
  }

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
    <div className="p-3 flex items-center justify-between gap-x-6 rounded-t-xl bg-muted">
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

      <div className="flex items-center gap-x-6">
        <Select
          items={perPageOptions}
          defaultValue={filters.perPage.toString()}
          value={filters.perPage.toString()}
          onValueChange={(value) =>
            setFilters({
              perPage: Number(value),
              page: 1,
            })
          }
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

        <div className="flex items-center gap-x-3">
          <Button
            variant="outline"
            size="icon-sm"
            disabled={meta.page <= 1}
            onClick={handlePreviousPage}
          >
            <ChevronLeftIcon />
          </Button>

          {pages.map(({ page, isActive }) => (
            <Button
              key={page}
              size="icon-sm"
              variant={isActive ? 'default' : 'ghost'}
              onClick={() =>
                setFilters({
                  page: page,
                })
              }
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon-sm"
            disabled={meta.page >= meta.totalPages}
            onClick={handleNextPage}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
