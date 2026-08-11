import { Link } from '@tanstack/react-router'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { Navbar } from './navbar'

export function Header() {
  const { token } = useAuth()

  return (
    <header className="fixed w-full h-18 z-10 bg-background shadow border-b">
      <div className="h-18 max-w-7xl mx-auto flex items-center justify-between">
        <Logo />

        <Navbar />

        <div className="flex gap-x-4">
          <Link to={token ? '/dashboard' : '/sign-in'}>
            <Button variant="outline" size="lg" className="px-6">
              {token ? 'Ir para o painel' : 'Entrar'}
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button size="lg" className="px-6">
              Solicitar acesso
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
