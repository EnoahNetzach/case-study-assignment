import './Alert.css'
import { useEffect, useRef, useState } from 'react'
import { TextColorToken } from '../../designTokens/color.ts'
import TypographyToken from '../../designTokens/typography.ts'
import Typography from '../Typography'

export interface AlertProps {
  durationInSeconds?: number
  message: string
  onClose: () => void
}

export default function Alert({ durationInSeconds = 3, message, onClose }: AlertProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function close() {
      if (!open) {
        onClose?.()
      }
    }

    const dialog = ref.current
    dialog?.addEventListener('transitionend', close)

    return () => {
      dialog?.removeEventListener('transitionend', close)
    }
  }, [onClose, open])

  useEffect(() => {
    setOpen(true)
  }, [])

  useEffect(() => {
    if (durationInSeconds > 0) {
      setTimeout(() => {
        setOpen(false)
      }, durationInSeconds * 1000)
    }
  }, [durationInSeconds])

  return (
    <div className={`alert ${open ? 'open' : ''}`} ref={ref} title={message}>
      <Typography
        colorToken={TextColorToken.colorTextInverse}
        textToken={TypographyToken.textStyleTextParagraphsBodyRegular}
      >
        {message}
      </Typography>

      <button className="alert_close" onClick={() => setOpen(false)}>
        &times;
      </button>
    </div>
  )
}
