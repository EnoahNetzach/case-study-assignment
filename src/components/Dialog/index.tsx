import { isValidElement, type ReactNode, useCallback, useEffect, useRef } from 'react'
import './Dialog.css'
import { createPortal } from 'react-dom'

export interface DialogProps {
  children: ReactNode | ((close: () => void) => ReactNode)
  footer?: ReactNode | ((close: () => void) => ReactNode)
  onClose?: () => void
  title?: ReactNode | ((close: () => void) => ReactNode)
}

export default function Dialog({ children, footer, onClose, title }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    ref.current?.showModal()
  }, [])

  const closeModal = useCallback(() => {
    ref.current?.close()
  }, [])

  useEffect(() => {
    function handleEscClose(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        ref.current?.close()
      }
    }

    window.addEventListener('keydown', handleEscClose)

    return () => {
      window.removeEventListener('keydown', handleEscClose)
    }
  }, [])

  useEffect(() => {
    function close() {
      if (!ref.current?.open) {
        onClose?.()
      }
    }

    const dialog = ref.current
    dialog?.addEventListener('transitionend', close)

    return () => {
      dialog?.removeEventListener('transitionend', close)
    }
  }, [onClose])

  return createPortal(
    <dialog className="dialog" ref={ref}>
      <div className="dialog_backdrop" />

      <div className="dialog_content">
        <div className="dialog_header">
          <div className="dialog_title">
            {typeof title === 'function' && !isValidElement(title) ? title(closeModal) : title}
          </div>

          <button className="dialog_close" onClick={closeModal}>
            &times;
          </button>
        </div>

        <div className="dialog_body">
          {typeof children === 'function' && !isValidElement(children) ? children(closeModal) : children}
        </div>

        {footer && (
          <div className="dialog_footer">
            {typeof footer === 'function' && !isValidElement(footer) ? footer(closeModal) : footer}
          </div>
        )}
      </div>
    </dialog>,
    document.body,
  )
}
