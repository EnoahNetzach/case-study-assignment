import Typography from '../Typography'
import { TextColorToken } from '../../designTokens/color'
import TypographyToken from '../../designTokens/typography'

interface NavigationProps {
  elements: { current?: boolean; expandable?: boolean; icon: string; label: string }[]
}

export default function Navigation({ elements }: NavigationProps) {
  return (
    <nav>
      <ul>
        {elements.map((child, index) => (
          <li key={`${child.label}_${index}`}>
            <a aria-current={child.current ? 'page' : undefined} href="#">
              <Typography
                colorToken={child.current ? TextColorToken.colorTextAccent : TextColorToken.colorTextSubtle}
                textToken={TypographyToken.textStyleTextLabelsTallBold}
              >
                {child.label}
              </Typography>
            </a>

            {child.expandable && (
              <Typography
                colorToken={TextColorToken.colorTextSubtle}
                textToken={TypographyToken.textStyleTextLabelsTallBold}
              >
                ›
              </Typography>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
