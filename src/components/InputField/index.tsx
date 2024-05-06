import './Field.css'
import ColorToken from '../../designTokens/color'
import TypographyToken from '../../designTokens/typography'
import Typography from '../Typography'

interface FieldProps<V extends string | number> {
  label?: string
  onChange: (value: V) => void
  symbol?: string
  type: V extends string ? 'string' : 'number'
  value: V | undefined
}

export default function InputField<V extends string | number>({ label, onChange, symbol, type, value }: FieldProps<V>) {
  return (
    <label className="form-field input-field">
      <Typography colorToken={ColorToken.colorTextDefault} textToken={TypographyToken.textStyleTextLabelsDefaultBold}>
        {label}
      </Typography>

      <div className="input-field_area">
        {symbol ? <span>{symbol}</span> : null}
        <input onChange={(event) => onChange(event.target.value as V)} type={type} value={value} />
      </div>
    </label>
  )
}

export function TextField(props: Omit<FieldProps<string>, 'type'>) {
  return <InputField {...props} type="string" />
}

export function NumberField(props: Omit<FieldProps<number>, 'type'>) {
  return <InputField {...props} type="number" />
}
