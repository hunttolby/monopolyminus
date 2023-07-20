import { supabase } from '@/pages'
import { User } from '@supabase/supabase-js'

import { FetchRequestMap } from './mono-fetch'

export type UserId = string

export interface AuthFetch {
  'auth/do': [{email: string}, never]
  'auth/me': [void, User]
  'auth/logout': [void, void]
}

export const authFetch = {
  'auth/do': async (req: FetchRequestMap<'auth/do'>) => {
    await supabase.auth.signInWithOtp({email: req.email})
  },
  'auth/me': async () => {
    const resp = await supabase.auth.getUser()
    return resp.data.user
  },
  'auth/logout': async () => supabase.auth.signOut()
}
