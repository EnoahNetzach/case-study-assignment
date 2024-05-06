import './Checkbox.css'
import TypographyToken from '../../designTokens/typography.ts'
import Typography from '../Typography'

interface CheckboxProps {
  checked?: boolean
  label?: string
  onChange: (checked: boolean) => void
}

export default function Checkbox({ checked, label, onChange }: CheckboxProps) {
  return (
    <label className="checkbox">
      <input checked={!!checked} onChange={(event) => onChange(event.target.checked)} type="checkbox" />
      <Typography textToken={TypographyToken.textStyleTextParagraphsBodyMedium}>{label}</Typography>
    </label>
  )
}
