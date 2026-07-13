import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs'

export const patientsSearchParams = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  name: parseAsString,
  status: parseAsStringEnum(['all', 'active', 'pending', 'alert']).withDefault(
    'all'
  ),
}

export function useGetPatientsFilters() {
  const [filters, setFilters] = useQueryStates(patientsSearchParams)

  function handleSetName(name: string | null) {
    setFilters({
      name,
      status: 'all',
      page: 1,
      perPage: 10,
    })
  }

  return { filters, setFilters, handleSetName }
}
