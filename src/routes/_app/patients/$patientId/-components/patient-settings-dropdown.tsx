'use client'

import { Link, useParams } from '@tanstack/react-router'
import { EditIcon, SettingsIcon, Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface PatientSettingsDropdownProps {
  onDelete: () => void
}

export function PatientSettingsDropdown({
  onDelete,
}: PatientSettingsDropdownProps) {
  const { patientId } = useParams({ from: '/_app/patients/$patientId/' })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="lg">
            <SettingsIcon />
            <span>Configurações do paciente</span>
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <Link to="/patients/$patientId/edit" params={{ patientId }}>
            <DropdownMenuItem>
              <EditIcon />
              <span>Editar dados</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={onDelete}>
            <Trash2Icon />
            <span>Excluir paciente</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
