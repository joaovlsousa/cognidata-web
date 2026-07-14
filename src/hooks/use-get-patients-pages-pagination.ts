export function useGetPatientsPagesPagination(
  currentPage: number,
  totalPages: number,
  windowSize = 5
) {
  if (totalPages <= 0) return []

  const size = Math.min(windowSize, totalPages)

  let start = currentPage - 2
  start = Math.max(1, start)
  start = Math.min(start, totalPages - size + 1)

  return Array.from({ length: size }, (_, i) => {
    const page = start + i
    return { page, isActive: page === currentPage }
  })
}
