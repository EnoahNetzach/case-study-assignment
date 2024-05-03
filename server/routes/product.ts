import type { paths as Paths } from '../api.gen'
import { addProduct, getList, getListLength } from '../services/product'
import type { OpenapiHandler } from './types'

export default {
  'product#list': (async (_req, res) => {
    const [totalRecords, records] = await Promise.all([getListLength(), getList(res.locals.pagination)])

    res.json({
      totalRecords,
      displayRecords: records.length,
      records,
    })
  }) satisfies OpenapiHandler<Paths['/product']['get']>,
  'product#add': (async (req, res) => {
    res.json(await addProduct(req.body))
  }) satisfies OpenapiHandler<Paths['/product']['post']>,
  'product#findById': ((req, res) => {
    console.log(req.params.productId)
    res.json({
      id: '1',
      name: 'Product 1',
      price: 1000,
      type: 'product',
      vat: 1900,
      unit: 'USD',
    })
  }) satisfies OpenapiHandler<Paths['/product/{productId}']['get']>,
  'product#update': ((req, res) => {
    console.log(req.body)
    res.json(req.body)
  }) satisfies OpenapiHandler<Paths['/product/{productId}']['put']>,
  'product#delete': ((req, res) => {
    console.log(req.body)
    res.end()
  }) satisfies OpenapiHandler<Paths['/product/{productId}']['delete']>,
}
