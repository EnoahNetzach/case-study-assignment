import type { PaginationOpts } from './pagination'
import { components as Components } from '../api.gen'
import { randomUUID } from 'node:crypto'
import { db as unitDb } from './unit'

type Product = Components['schemas']['Product']

const db: Product[] = [
  {
    id: randomUUID(),
    name: 'Product 1',
    price: 1000,
    type: 'product',
    vat: 1900,
    unit: unitDb[0].id,
  },
]

export async function getListLength() {
  return db.length
}

export async function getList({ pageLength, startIndex }: PaginationOpts) {
  return db.slice(startIndex, startIndex + pageLength)
}

export async function addProduct(rawProduct: Product): Promise<Product> {
  const product = {
    ...rawProduct,
    id: randomUUID(),
  }

  db.push(product)

  return product
}
