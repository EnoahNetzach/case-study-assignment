import { type PropsWithChildren } from 'react'
import { TextColorToken } from '../../designTokens/color'
import TypographyToken from '../../designTokens/typography'

interface TypographyProps extends PropsWithChildren {
  className?: string
  colorToken?: TextColorToken
  textToken?: TypographyToken
}

export default function Typography({
  children,
  className = '',
  colorToken = TextColorToken.colorTextDefault,
  textToken = TypographyToken.textStyleTextParagraphsBodyRegular,
}: TypographyProps) {
  return (
    <span
      className={`${textToken} ${className}`}
      style={{
        color: colorToken,
      }}
    >
      {children}
    </span>
  )
}
