import Grid from '../Grid'
import { type ReactNode, useCallback, useMemo } from 'react'
import TypographyToken from '../../designTokens/typography'
import ColorToken from '../../designTokens/color'
import SpaceToken from '../../designTokens/space'
import './Table.css'
import Checkbox from '../Checkbox'

const noOp = () => {}

interface SelectableItem {
  onSelect?: (selected: boolean) => void
  selected?: boolean
}

interface TableProps<H extends string, I extends Record<H, string | number>> {
  headers: { id: H; label: string }[]
  items: (I & SelectableItem)[]
  selectable?: boolean
}

export default function Table<H extends string, I extends Record<H, string | number>>({
  headers,
  items,
  selectable,
}: TableProps<H, I>) {
  const selectAll = useCallback((selected: boolean) => items.forEach((item) => item.onSelect?.(selected)), [items])

  const [areas, elements] = useMemo(() => {
    const tableElements = items.map((item, index) => [
      ...(selectable
        ? [
            {
              area: `select_${index}`,
              children: <Checkbox checked={item.selected} onChange={item.onSelect ?? noOp} />,
            },
          ]
        : []),
      ...headers.map((header) => ({
        area: `item_${header.id}_${index}`,
        className: TypographyToken.textStyleTextParagraphsBodyMedium,
        children: item[header.id] as ReactNode,
      })),
    ])

    const areas = [
      [...(selectable ? [`select_header`] : []), ...headers.map((header) => header.id)].join(' '),
      ...tableElements.map((item) => item.map((element) => element.area).join(' ')),
    ]

    const elements = [
      ...(selectable
        ? [
            {
              area: 'select_header',
              children: <Checkbox checked={items.every((item) => item.selected)} onChange={selectAll} />,
            },
          ]
        : []),
      ...headers.map((header) => ({
        area: header.id,
        className: TypographyToken.textStyleTextLabelsDefaultBold,
        children: header.label,
        style: { color: ColorToken.colorTextNeutral },
      })),
      ...tableElements.flat(),
    ]

    return [areas, elements]
  }, [headers, items, selectAll, selectable])

  return (
    <Grid
      aria-rowcount={items.length}
      areas={areas as string[]}
      className="table"
      cols={selectable ? `${SpaceToken.space150} repeat(${headers.length - 1}, 1fr)` : `repeat(${headers.length}, 1fr)`}
      elements={elements}
      gap={{ row: SpaceToken.space150 }}
      role="table"
      rows={`repeat(${items.length}, 1fr)`}
    />
  )
}
