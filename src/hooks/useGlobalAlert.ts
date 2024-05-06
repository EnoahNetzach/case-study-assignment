import { useContext } from 'react'
import { GlobalAlertStackContext } from '../contexts/GlobalAlertStack'

export default function useGlobalAlert() {
  const alertController = useContext(GlobalAlertStackContext)

  return alertController.add
}
