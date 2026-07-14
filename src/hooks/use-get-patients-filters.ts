import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs'
import { useTransition } from 'react'

export const patientsSearchParams = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  name: parseAsString,
  status: parseAsStringEnum(['all', 'active', 'pending', 'alert']).withDefault(
    'all'
  ),
}

export function useGetPatientsFilters() {
  const [isPending, startTransition] = useTransition()
  const [filters, setFilters] = useQueryStates(patientsSearchParams, {
    startTransition,
  })

  function handleSetName(name: string | null) {
    setFilters({
      name,
      status: 'all',
      page: 1,
      perPage: 10,
    })
  }

  return { filters, setFilters, handleSetName, isPending }
}
