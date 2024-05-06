import { createContext, PropsWithChildren } from 'react'
import { components as Components } from '../../server/api.gen'
import { useQuery } from '@tanstack/react-query'
import { getMe } from '../api/user'

type User = Components['schemas']['User']

export const UserContext = createContext<User | undefined>(undefined)

export default function UserProvider({ children }: PropsWithChildren) {
  const query = useQuery({ queryKey: ['user#me'], queryFn: getMe })

  return <UserContext.Provider value={query.data}>{children}</UserContext.Provider>
}
