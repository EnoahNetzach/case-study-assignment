import { createContext, PropsWithChildren, useCallback, useMemo, useState } from 'react'
import Alert, { type AlertProps } from '../../components/Alert'
import { createPortal } from 'react-dom'
import './GlobalAlertStack.css'

interface Controller {
  add: (alert: string | Omit<AlertProps, 'onClose'>) => void
  stack: Map<number, AlertProps>
}

export const GlobalAlertStackContext = createContext<Controller>({
  add: () => {},
  stack: new Map(),
})

export default function GlobalAlertStackProvider({ children }: PropsWithChildren) {
  const [stack, setStack] = useState<Map<number, AlertProps>>(new Map())

  const pop = useCallback((id: number) => {
    setStack((prev) => {
      const next = new Map(prev)
      next.delete(id)
      return next
    })
  }, [])

  const controller = useMemo<Controller>(
    () => ({
      add: (alert) => {
        setStack((prev) => {
          const id = Date.now()
          return new Map(prev).set(id, {
            ...(typeof alert === 'string' ? { message: alert } : alert),
            onClose: () => pop(id),
          })
        })
      },
      stack,
    }),
    [pop, stack],
  )

  return (
    <GlobalAlertStackContext.Provider value={controller}>
      {children}

      {createPortal(
        <div className="global-alert-stack_container">
          {[...stack.entries()].map(([id, alert]) => (
            <Alert
              durationInSeconds={alert.durationInSeconds}
              key={id}
              message={alert.message}
              onClose={alert.onClose}
            />
          ))}
        </div>,
        document.body,
      )}
    </GlobalAlertStackContext.Provider>
  )
}
