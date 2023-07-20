import Loader from '@/components/Loader/Loader'
import Lobbys from '@/components/Lobbys/Lobbys'
import { Database } from '@/data-access/types'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

import { Login } from '../components/Login/Login'

export const supabase = createClient<Database>(
  'https://yzwabfqwxmjmzxlymvmg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6d2FiZnF3eG1qbXp4bHltdm1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkyMDY4MDMsImV4cCI6MjAwNDc4MjgwM30.LV9AxohK3_GWLh_GeYCaQ4Q7GfoSAYMCD4w1kPaTo5s',
)

const Main = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    if (loading || checked) return
    setLoading(true)
    supabase.auth
      .getSession()
      .then(s => {
        if (s.data.session?.access_token && s.data.session?.expires_in > 0) {
          if (s.data.session.user.user_metadata?.theme) {
            const body = document.getElementById('root')
            body?.setAttribute('data-theme', s.data.session.user.user_metadata?.theme)
          }
          setLoggedIn(true)
          return
        }
      })
      .finally(() => {
        setChecked(true)
        setLoading(false)
      })
  }, [loggedIn, loading, checked])

  if (loading || !checked)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader size="screen" />
      </div>
    )
  if (checked && !loggedIn) return <Login />
  return <Lobbys />
}

export default Main

