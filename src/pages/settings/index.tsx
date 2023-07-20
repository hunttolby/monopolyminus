import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import LoggedInLayout from '@/components/LoggedInLayout/LoggedInLayout'
import SlideSelector, { SlideSelectorOption } from '@/components/SlideSelector/SlideSelector'
import { useDebounce } from '@/utils/use-debounce'
import { useMutation, useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { supabase } from '..'
import { queryClient } from '../_app'

type Theme = 'purple' | 'red' | 'green' | 'blue'

type UserData = {
  theme: Theme
  displayName: string
}

const Settings = () => {
  const router = useRouter()
  const { data } = useQuery({
    queryFn: () => supabase.auth.getUser(),
    onSuccess: data => {
      const body = document.getElementById('root')
      body?.setAttribute('data-theme', data.data.user?.user_metadata?.theme)
    },
    queryKey: 'user',
  })
  const user = data?.data.user
  const [name, setName] = useState<string>(user?.user_metadata?.displayName)
  useEffect(() => {
    setName(user?.user_metadata?.displayName)
  }, [user])
  const updateUser = useMutation({
    mutationFn: (newData: Partial<UserData>) => supabase.auth.updateUser({ data: newData }),
    onSuccess: () => {
      queryClient.invalidateQueries('user')
    },
  })
  const themeOptions = [
    {
      label: 'Purple',
      value: 'purple',
    },
    {
      label: 'Red',
      value: 'red',
    },
    {
      label: 'Green',
      value: 'green',
    },
    {
      label: 'Blue',
      value: 'blue',
    },
  ]

  const themeColorHexMap: Record<string, string> = {
    purple: 'bg-[#7679f4]',
    red: 'bg-[#d64541]',
    green: 'bg-[#1e824c]',
    blue: 'bg-[#2d55ff]',
  }

  const handleThemeChange = (theme: Theme) => {
    const body = document.getElementById('root')
    body?.setAttribute('data-theme', theme)
    updateUser.mutate({ theme })
  }

  const renderThemeItem = (option: SlideSelectorOption) => (
    <div className="text-large-emphasis text-primary flex items-center justify-between w-80">
      {option?.label}
      <div className={clsx(themeColorHexMap[option?.value], 'h-16 w-16 rounded-full')} />
    </div>
  )

  const handleUpdateName = useDebounce((v: string) => {
    updateUser.mutate({ displayName: v })
  }, 600)

  return (
    <LoggedInLayout>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-364 h-400 bg-l0 shadow-modal rounded-xl flex flex-col gap-24 px-16 py-12">
          <div className="flex items-end justify-between">
            <div className="text-heading text-primary">Settings</div>
            <Button variant="secondary" size="large" onClick={() => router.back()}>
              Go back
            </Button>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="text-large-emphasis text-primary">Display name</div>
            <Input placeholder="Example name" value={name} onChange={handleUpdateName} />
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="text-large-emphasis text-primary">Theme</div>
            <SlideSelector
              options={themeOptions}
              onChange={v => handleThemeChange(v as Theme)}
              value={user?.user_metadata?.theme}
              renderItem={renderThemeItem}
            />
          </div>
        </div>
      </div>
    </LoggedInLayout>
  )
}

export default Settings
