import { useContext } from 'react'
import { UserContext } from '../contexts/User'

export function useUser() {
  return useContext(UserContext)
}
