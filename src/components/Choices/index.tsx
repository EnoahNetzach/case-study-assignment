import { Fragment, useMemo } from 'react'
import Checkbox from '../Checkbox'
import './Choices.css'

interface ChoicesProps<C extends string[]> {
  choices: C | { id: C[number]; label: string }[]
  onSelected: (id: C[number], selected: boolean) => void
  selectedChoices: C
}

export default function Choices<C extends string[]>({
  choices: rawChoices,
  onSelected,
  selectedChoices,
}: ChoicesProps<C>) {
  const choices = useMemo(
    () => rawChoices.map((choice) => (typeof choice === 'string' ? { id: choice, label: choice } : choice)),
    [rawChoices],
  )

  return (
    <div className="form-field choices">
      {choices.map((choice) => (
        <Fragment key={choice.id}>
          <Checkbox
            checked={selectedChoices.includes(choice.id)}
            label={choice.label}
            onChange={(selected) => onSelected(choice.id, selected)}
          />
        </Fragment>
      ))}
    </div>
  )
}
