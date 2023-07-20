import { queryClient } from '@/pages/_app'
import {
  MutationObserverOptions,
  QueryClient,
  QueryObserverOptions,
  QueryOptions,
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'

import { AuthFetch, authFetch } from './auth'
import { GamesFetch, gamesFetch } from './games'
import { PlayersFetch, playersFetch } from './players'

declare global {
  interface Window {
    queryClient: QueryClient
  }
}

export type FetchMap = AuthFetch & PlayersFetch & GamesFetch
export type FetchEndpoint = keyof FetchMap
export type FetchRequestMap<T extends keyof FetchMap> = FetchMap[T][0]
export type FetchResponseMap<T extends keyof FetchMap> = FetchMap[T][1]
export type FetchApiCollection<T extends FetchEndpoint> = Record<
  T,
  (req: FetchRequestMap<T>) => Promise<FetchResponseMap<T>>
>

// not sure what to put in ANY here
export const fetchApis: FetchApiCollection<any> = {
  ...authFetch,
  ...playersFetch,
  ...gamesFetch,
}

type DoEndpoint = 'auth/do' | 'auth/logout' | 'players/create' | 'games/create' | 'games/join'

export type RequestEndpoint = Exclude<FetchEndpoint, DoEndpoint>

export type MutateEndpoint = Extract<FetchEndpoint, DoEndpoint>

export const $monoUse = <T extends RequestEndpoint>(
  key: T,
  body?: FetchRequestMap<T>,
  options?: QueryObserverOptions<
    FetchApiCollection<T>,
    unknown,
    FetchResponseMap<T>,
    FetchEndpoint[]
  >,
): UseQueryResult<FetchResponseMap<T>, unknown> => {
  // eslint-disable-next-line
  return useQuery({
    queryKey: [key, JSON.stringify(body)].filter(Boolean),
    queryFn: async () => {
      const resp = await fetchApis[key](body)
      return resp
    },
    initialData: [],
    ...(options as QueryOptions),
  })
}

export const $monoDo = <T extends MutateEndpoint>(
  key: T,
  body?: FetchRequestMap<T>,
  options?: MutationObserverOptions<FetchResponseMap<T>, unknown, FetchRequestMap<T>, unknown>,
): UseMutationResult<FetchResponseMap<T>, unknown, FetchRequestMap<T>, unknown> => {
  // eslint-disable-next-line
  return useMutation({
    mutationFn: (bodyOverride: Partial<FetchRequestMap<T>>) =>
      fetchApis[key]({ ...body, ...bodyOverride }),
    ...options,
  })
}

export const $monoRefetch = async (queryKeys: FetchEndpoint[], options?: object) => {
  await Promise.all(
    queryKeys.map(async qk => {
      const resp = await queryClient.invalidateQueries({
        queryKey: [qk],
        refetchType: 'all',
      })
      return resp
    }),
  )
}
