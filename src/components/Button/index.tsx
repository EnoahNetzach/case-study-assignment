import { type PropsWithChildren } from 'react'
import { BackgroundColorToken, TextColorToken } from '../../designTokens/color'
import TypographyToken from '../../designTokens/typography'
import './Button.css'

interface ButtonProps extends PropsWithChildren {
  disabled?: boolean
  onClick?: () => void
}

interface InternalButtonProps extends ButtonProps {
  backgroundColorToken?: BackgroundColorToken
  colorToken?: TextColorToken
  textToken?: TypographyToken
}

export default function Button({
  backgroundColorToken = BackgroundColorToken.colorBackgroundDefault,
  children,
  colorToken = TextColorToken.colorTextDefault,
  disabled,
  onClick,
  textToken = TypographyToken.textStyleTextParagraphsBodyMedium,
}: InternalButtonProps) {
  return (
    <button
      className={`button ${textToken}`}
      disabled={disabled}
      onClick={onClick}
      style={{
        backgroundColor: backgroundColorToken,
        color: colorToken,
      }}
    >
      {children}
    </button>
  )
}

export function ButtonPrimary({ children, ...props }: ButtonProps) {
  return (
    <Button
      backgroundColorToken={BackgroundColorToken.colorBackgroundAccentFloating}
      colorToken={TextColorToken.colorTextInverse}
      {...props}
    >
      {children}
    </Button>
  )
}

export function ButtonSecondary({ children, ...props }: ButtonProps) {
  return (
    <Button
      backgroundColorToken={BackgroundColorToken.colorBackgroundAccent}
      colorToken={TextColorToken.colorTextAccent}
      {...props}
    >
      {children}
    </Button>
  )
}

export function ButtonTertiary({ children, ...props }: ButtonProps) {
  return (
    <Button backgroundColorToken={BackgroundColorToken.colorBackgroundSubtle} {...props}>
      {children}
    </Button>
  )
}
