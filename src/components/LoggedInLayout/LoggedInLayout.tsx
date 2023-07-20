import { $monoUse } from '@/data-access'
import { supabase } from '@/pages'
import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'

import Button from '../Button/Button'

type Props = {
  children: ReactNode
}

const LoggedInLayout: FC<Props> = ({ children }) => {
  const { data: user } = $monoUse('auth/me')
  const router = useRouter()
  const handleLogout = async () => {
    await supabase.auth.signOut()
    await router.push('/')
    window.location.reload()
  }

  const handleGoToSettings = () => {
    router.push('/settings')
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      {children}
      <div className="self-end w-full h-64 border-t-1 border-t-l1 bg-l1 flex items-center justify-between px-24">
        <div className="flex flex-col gap-4">
          <div className="text-large-strong text-primary">
            {!!user?.user_metadata?.displayName && user?.user_metadata?.displayName !== ''
              ? user?.user_metadata?.displayName
              : user?.email}
          </div>
          <div
            className="text-tertiary text-small-strong hover:text-accent cursor-pointer"
            onClick={handleGoToSettings}
          >
            Edit
          </div>
        </div>

        <Button onClick={handleLogout}>Log out</Button>
      </div>
    </div>
  )
}

export default LoggedInLayout
