import { $monoDo } from '@/data-access'
import { useState } from 'react'

import Button from '../Button/Button'
import Input from '../Input/Input'

export const Login = () => {
  const [email, setEmail] = useState<string>('')

  const signinOrUp = $monoDo('auth/do')

  const handleSignupOrIn = async () => {
    signinOrUp.mutate({ email })
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-500">
      <div className="w-360 h-200 mb-96 rounded-lg flex flex-col justify-between px-20 py-16 bg-l0 shadow-modal">
        <div className="flex flex-col gap-24">
          <div className="text-primary text-large-strong">
            Hello, enter your email to login or signup
          </div>
          <Input value={email} onChange={setEmail} placeholder="example@example.com" />
          {signinOrUp.isSuccess && (
            <div className="text-small-emphasis text-tertiary">
              Check your email for a link to sign in!
            </div>
          )}
          {signinOrUp.isError && (
            <div className="text-small-emphasis text-alert">
              Oops, there was an error with that email. Try again.
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div />
          <Button onClick={handleSignupOrIn} disabled={email === ''} loading={signinOrUp.isLoading}>
            Go
          </Button>
        </div>
      </div>
    </div>
  )
}
