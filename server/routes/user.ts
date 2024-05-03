import type { paths as Paths } from '../api.gen'
import type { OpenapiHandler } from './types'
import { getMe } from '../services/user'

export default {
  'user#me': (async (_req, res) => {
    res.json(await getMe())
  }) satisfies OpenapiHandler<Paths['/user/me']['get']>,
}
