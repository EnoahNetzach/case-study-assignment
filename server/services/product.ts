import type { PaginationOpts } from './pagination'
import { components as Components } from '../api.gen'
import { randomUUID } from 'node:crypto'
import { db as unitDb } from './unit'

type Product = Components['schemas']['Product']

const db: Product[] = Array.from({ length: 100 }, (_, i) => ({
  id: randomUUID(),
  name: `Product ${i}`,
  price: Math.trunc(Math.random() * 10000),
  type: Math.random() > 0.5 ? 'product' : 'service',
  vat: Math.trunc(Math.random() * 3000),
  unit: unitDb[0].id!,
}))

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
