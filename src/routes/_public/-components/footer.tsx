import { Link } from '@tanstack/react-router'
import {
  ListChecksIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCogCornerIcon,
} from 'lucide-react'
import { Logo } from '@/components/logo'

export function Footer() {
  return (
    <footer className="py-4 border-t">
      <div className="max-w-7xl grid grid-cols-3 mx-auto">
        <section className="space-y-3">
          <Logo />
          <p className="text-sm text-muted-foreground font-medium">
            Tecnologia e ciência a serviço da prática clínica. <br /> Dados que
            geram insights que transformam vidas.
          </p>
          <p className="text-sm text-muted-foreground font-medium">
            &copy; {new Date().getFullYear()} CogniDataHub. Todos os direitos
            reservados.
          </p>
        </section>

        <section className="px-12 space-y-3">
          <h4 className="text-lg font-semibold">Fale conosco</h4>

          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-x-2">
              <MailIcon className="size-4 text-primary" />
              <p>coord.computacao.ccea@setor.uepb.edu.br</p>
            </li>
            <li className="flex items-center gap-x-2">
              <PhoneIcon className="size-4 text-primary" />
              <p>(83) 9 8765-4321</p>
            </li>
            <li className="flex items-start gap-x-2">
              <MapPinIcon className="size-6 text-primary" />
              <p>
                R. Alfredo Lustosa Cabral, S/N - Salgadinho, Patos - PB,
                58706-550, Brasil
              </p>
            </li>
          </ul>
        </section>

        <section className="px-12 space-y-3">
          <h4 className="text-lg font-semibold">Institucional</h4>

          <ul className="space-y-3 text-sm text-primary">
            <li>
              <Link to="/terms" className="flex items-center gap-x-2">
                <ShieldCogCornerIcon className="size-4" />
                <span>Termos de uso</span>
              </Link>
            </li>

            <li>
              <Link to="/privacy" className="flex items-center gap-x-2">
                <ListChecksIcon className="size-4" />
                <span>Políticas de privacidade</span>
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  )
}
