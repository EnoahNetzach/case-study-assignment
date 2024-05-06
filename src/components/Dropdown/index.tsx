import { type ChangeEvent, useCallback, useId, useMemo, useRef, useState } from 'react'
import ColorToken from '../../designTokens/color'
import TypographyToken from '../../designTokens/typography'
import Typography from '../Typography'
import './Dropdown.css'

type CanAddNew =
  | { addNewLabel?: never; canAddNew?: false; onAddNew?: never }
  | {
      addNewLabel: string
      canAddNew: true
      onAddNew: (value: string, added: () => void) => void
    }

interface SelectProps<V extends string | number> {
  choices: { id: V; label: string }[]
  label?: string
  onSelected: (value: V) => void
  value: V | undefined
}

function NormalSelect<V extends string | number>({ choices, onSelected, value }: SelectProps<V>) {
  return (
    <select className="dropdown_input" onChange={(event) => onSelected(event.target.value as V)} value={value}>
      {choices.map((choice) => (
        <option key={choice.id} value={choice.id}>
          {choice.label}
        </option>
      ))}
    </select>
  )
}

const createNewValueRegex = /^Create "(.*)"$/

function InputSelect<V extends string | number>({ choices, onAddNew, onSelected, value }: SelectProps<V> & CanAddNew) {
  const datalistId = useId()
  const datalistRef = useRef<HTMLDataListElement>(null)
  const [creatingNewValue, setCreatingNewValue] = useState(false)
  const [newValue, setNewValue] = useState<string | null>(null)

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const choice = choices.find((choice) => choice.label === event.target.value)

      if (choice) {
        setNewValue(null)
        onSelected(choice.id)
        return
      }

      if (createNewValueRegex.test(event.target.value) && newValue) {
        setCreatingNewValue(true)
        setNewValue(`Creating new value "${newValue}"...`)

        onAddNew?.(newValue, () => {
          setNewValue(null)
          setCreatingNewValue(false)
        })
        return
      }

      setNewValue(event.target.value)
    },
    [choices, newValue, onAddNew, onSelected],
  )

  const selectedChoice = useMemo(() => choices.find((choice) => choice.id === value), [choices, value])

  return (
    <>
      <input
        className="dropdown_input"
        disabled={creatingNewValue}
        list={datalistId}
        onChange={onChange}
        value={newValue ?? selectedChoice?.label ?? ''}
      />

      <datalist id={datalistId} ref={datalistRef}>
        {choices.map((choice) => (
          <option key={choice.id} value={choice.label}>
            {choice.label}
          </option>
        ))}

        {!creatingNewValue && newValue && choices.filter((choice) => choice.id === newValue).length === 0 ? (
          <option value={createNewValueRegex.test(newValue) ? newValue : `Create "${newValue}"`}>
            {createNewValueRegex.test(newValue) ? newValue : `Create "${newValue}"`}
          </option>
        ) : null}
      </datalist>
    </>
  )
}

interface DropdownProps<C extends string[] | number[]> {
  choices: C | { id: C[number]; label: string }[]
  label?: string
  onSelected: (value: C[number]) => void
  value: C[number] | undefined
}

export default function Dropdown<C extends string[] | number[]>({
  addNewLabel,
  canAddNew,
  choices: rawChoices,
  label,
  onAddNew,
  onSelected,
  value,
}: DropdownProps<C> & CanAddNew) {
  const choices = useMemo(
    () =>
      rawChoices.map((choice) =>
        typeof choice === 'string' || typeof choice === 'number'
          ? ({ id: choice, label: choice } as { id: C[number]; label: string })
          : choice,
      ),
    [rawChoices],
  )

  return (
    <label className="form-field dropdown">
      <Typography colorToken={ColorToken.colorTextDefault} textToken={TypographyToken.textStyleTextLabelsDefaultBold}>
        {label}
      </Typography>

      {canAddNew ? (
        <InputSelect
          addNewLabel={addNewLabel}
          canAddNew
          choices={choices}
          onAddNew={onAddNew}
          onSelected={onSelected}
          value={value}
        />
      ) : (
        <NormalSelect choices={choices} onSelected={onSelected} value={value} />
      )}
    </label>
  )
}
