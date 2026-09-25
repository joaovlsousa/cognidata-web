import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { AppHeader } from '../-components/app-header'
import { ProfileDetails } from './-components/profile-details'
import { ProfileDetailsSkeleton } from './-components/profile-details-skeleton'

export const Route = createFileRoute('/_app/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-10">
      <AppHeader
        title="Seu perfil"
        description="Gerencie seu perfil por aqui."
      />

      <section>
        <Card className="shadow-md">
          <CardContent>
            <Suspense fallback={<ProfileDetailsSkeleton />}>
              <ProfileDetails />
            </Suspense>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
