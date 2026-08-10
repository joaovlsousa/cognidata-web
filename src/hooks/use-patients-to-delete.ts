import { create } from 'zustand'

interface State {
  patientsIds: Set<string>
  toggle: (patientId: string) => void
  appendAll: (patientsIds: string[]) => void
  clear: () => void
}

export const usePatientsToDelete = create<State>()((set) => ({
  patientsIds: new Set(),
  clear: () => set({ patientsIds: new Set() }),
  appendAll: (patientIds: string[]) =>
    set({
      patientsIds: new Set(patientIds),
    }),
  toggle: (patientId: string) =>
    set((state) => {
      const next = new Set(state.patientsIds)

      next.has(patientId) ? next.delete(patientId) : next.add(patientId)

      return {
        patientsIds: next,
      }
    }),
}))
