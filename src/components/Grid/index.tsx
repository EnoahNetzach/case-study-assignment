import { type AriaAttributes, type AriaRole, type CSSProperties, type PropsWithChildren } from 'react'
import './Grid.css'
import SpaceToken from '../../designTokens/space'

type ExtractFromString<T extends string> = Exclude<
  T extends `${infer P} ${infer R}` ? P | ExtractFromString<R> : T extends `${infer P}` ? P : string,
  ''
>

type ExtractFromArray<T extends string[]> = ExtractFromString<T[number]>

interface GridElementProps<A extends string[]> extends PropsWithChildren {
  area?: ExtractFromArray<A>
  className?: string | undefined
  style?: CSSProperties
}

function GridElement<A extends string[]>({ area, children, className = '', style }: GridElementProps<A>) {
  return (
    <div
      className={`${className} grid_element`}
      style={
        {
          ...style,
          '--grid_area': area,
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}

interface GridProps<A extends string[]> extends AriaAttributes {
  areas?: A
  className?: string
  cols: string
  elements: GridElementProps<A>[]
  gap?: SpaceToken | { col?: SpaceToken; row?: SpaceToken }
  role?: AriaRole | undefined
  rows: string
}

export default function Grid<A extends string[]>({
  areas,
  className = '',
  cols,
  elements,
  gap,
  rows,
  ...props
}: GridProps<A>) {
  return (
    <div
      {...props}
      className={`${className} grid_container`}
      style={
        {
          '--grid_areas': (areas ?? []).map((area) => JSON.stringify(area)).join(' '),
          '--grid_columns': cols,
          '--grid_rows': rows,
          '--grid_gap_col': typeof gap === 'object' ? gap.col : gap,
          '--grid_gap_row': typeof gap === 'object' ? gap.row : gap,
        } as CSSProperties
      }
    >
      {elements.map((props, index) => (
        <GridElement
          area={props.area}
          className={props.className}
          key={`${props.area}_${index}` ?? index}
          style={props.style}
        >
          {props.children}
        </GridElement>
      ))}
    </div>
  )
}
