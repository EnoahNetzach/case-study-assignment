import type { paths as Paths } from '../api.gen'
import { addUnit, getList, getListLength } from '../services/unit'
import type { OpenapiHandler } from './types'

export default {
  'unit#list': (async (_req, res) => {
    const [totalRecords, records] = await Promise.all([getListLength(), getList(res.locals.pagination)])

    res.json({
      totalRecords,
      displayRecords: records.length,
      records,
    })
  }) satisfies OpenapiHandler<Paths['/unit']['get']>,
  'unit#add': (async (req, res) => {
    res.json(await addUnit(req.body))
  }) satisfies OpenapiHandler<Paths['/unit']['post']>,
}
