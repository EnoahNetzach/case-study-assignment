import type { PaginationOpts } from './pagination'
import { components as Components } from '../api.gen'
import { randomUUID } from 'node:crypto'

type Unit = Components['schemas']['Unit']

export const db: Unit[] = [
  {
    id: randomUUID(),
    name: 'Unit 1',
  },
]

export async function getListLength() {
  return db.length
}

export async function getList({ pageLength, startIndex }: PaginationOpts) {
  return db.slice(startIndex, startIndex + pageLength)
}

export async function addUnit(rawUnit: Unit): Promise<Unit> {
  const unit = {
    ...rawUnit,
    id: randomUUID(),
  }

  db.push(unit)

  return unit
}
