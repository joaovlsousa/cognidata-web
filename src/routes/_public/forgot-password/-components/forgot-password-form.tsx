import { useState } from 'react'
import type { ForgotPasswordFlowState } from '../-types'
import { ForgotPasswordStepEmail } from './forgot-password-step-email'
import { ForgotPasswordStepOtp } from './forgot-password-step-otp'
import { ForgotPasswordStepReset } from './forgot-password-step-reset'
import { ForgotPasswordStepSuccess } from './forgot-password-step-success'
import { ForgotPasswordStepper } from './forgot-password-stepper'

const INITIAL_STATE: ForgotPasswordFlowState = { step: 'email' }

export function ForgotPasswordForm() {
  const [flow, setFlow] = useState<ForgotPasswordFlowState>(INITIAL_STATE)
  const [lastEmail, setLastEmail] = useState<string>('')

  return (
    <div className="space-y-6">
      {flow.step !== 'success' && (
        <ForgotPasswordStepper currentStep={flow.step} />
      )}

      {flow.step === 'email' && (
        <ForgotPasswordStepEmail
          defaultEmail={lastEmail}
          onSuccess={(email, expiresAt) =>
            setFlow({ step: 'otp', email, expiresAt })
          }
        />
      )}

      {flow.step === 'otp' && (
        <ForgotPasswordStepOtp
          email={flow.email}
          expiresAt={flow.expiresAt}
          onSuccess={() =>
            setFlow({
              step: 'reset',
              email: flow.email,
              expiresAt: flow.expiresAt,
            })
          }
          onBack={() => setFlow({ step: 'email' })}
          onRestart={() => {
            setLastEmail(flow.email)
            setFlow({ step: 'email' })
          }}
        />
      )}

      {flow.step === 'reset' && (
        <ForgotPasswordStepReset
          email={flow.email}
          expiresAt={flow.expiresAt}
          onSuccess={() => setFlow({ step: 'success' })}
          onRestart={() => {
            setLastEmail(flow.email)
            setFlow({ step: 'email' })
          }}
        />
      )}

      {flow.step === 'success' && <ForgotPasswordStepSuccess />}
    </div>
  )
}
