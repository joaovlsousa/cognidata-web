import { LogOutIcon } from 'lucide-react'
import { Loader } from '@/components/loader'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { useSignOut } from '@/hooks/http/auth/use-sign-out'
import { useGetProfile } from '@/hooks/http/user/use-get-profile'

export function UserButton() {
  const {
    data: { user },
  } = useGetProfile()
  const signOutMutation = useSignOut()

  async function handleSignOut() {
    await signOutMutation.mutateAsync()
  }

  return (
    <Accordion className="w-full min-w-0">
      <AccordionItem className="w-full min-w-0">
        <AccordionTrigger className="w-full min-w-0 flex items-center gap-x-2 rounded-md transition-all hover:no-underline">
          <div className="size-10 grid place-items-center shrink-0 rounded-full ring ring-primary bg-primary/10">
            <span className="text-lg font-bold text-primary">
              {user.name[0].toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0 leading-none text-start">
            <p className="font-medium truncate">{user.name}</p>
            <p className="text-sm text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </AccordionTrigger>

        <AccordionContent className="">
          <div className="pb-4">
            <Button
              onClick={handleSignOut}
              disabled={signOutMutation.isPending}
              variant="destructive"
              className="w-full justify-start"
            >
              {signOutMutation.isPending ? (
                <>
                  <Loader />
                  <span>Saindo...</span>
                </>
              ) : (
                <>
                  <LogOutIcon />
                  <span>Sair do sistema</span>
                </>
              )}
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
