/**
 * State machine for the "forgot password" flow.
 *
 * `expiresAt` is born at the /auth/otp-code/generate call (both the initial
 * one and any resend) and is carried forward unchanged into the reset step,
 * because the backend's 5-minute window starts at generation time, not at
 * verification time.
 */
export type ForgotPasswordFlowState =
  | { step: 'email' }
  | { step: 'otp'; email: string; expiresAt: number }
  | { step: 'reset'; email: string; expiresAt: number }
  | { step: 'success' }

export type ForgotPasswordFlowStep = ForgotPasswordFlowState['step']

export const FORGOT_PASSWORD_STEP_ORDER: ForgotPasswordFlowStep[] = [
  'email',
  'otp',
  'reset',
  'success',
]

export const OTP_TTL_MS = 5 * 60 * 1000 // 5 min
export const RESEND_COOLDOWN_MS = 60 * 1000 // 1 min
