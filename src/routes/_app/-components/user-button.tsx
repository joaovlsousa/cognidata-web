import { Link } from '@tanstack/react-router'
import { EllipsisVerticalIcon, LogOutIcon, UserIcon } from 'lucide-react'
import { useState } from 'react'
import { Loader } from '@/components/loader'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSignOut } from '@/hooks/http/auth/use-sign-out'
import { useGetProfile } from '@/hooks/http/user/use-get-profile'

export function UserButton() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const {
    data: { user },
  } = useGetProfile()
  const signOutMutation = useSignOut()

  async function handleSignOut() {
    await signOutMutation.mutateAsync()
  }

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger
        data-open={isDropdownOpen}
        className="w-full min-w-0 flex items-center gap-x-2 rounded-md transition-all hover:bg-primary/10 hover:p-2 data-open:p-2 data-open:bg-primary/10"
      >
        <div className="size-10 grid place-items-center shrink-0 rounded-full ring ring-primary bg-primary/10">
          <span className="text-lg font-bold text-primary">
            {user.name[0].toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0 leading-none text-start">
          <p className="font-medium truncate">{user.name}</p>
          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
        </div>

        <EllipsisVerticalIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" sideOffset={24}>
        <DropdownMenuGroup>
          <Link to="/dashboard">
            <DropdownMenuItem>
              <UserIcon />
              Ver perfil
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            className="transition-colors cursor-pointer"
            onClick={handleSignOut}
          >
            {signOutMutation.isPending ? (
              <>
                <Loader />
                <span>Saindo...</span>
              </>
            ) : (
              <>
                <LogOutIcon />
                <span>Sair</span>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
