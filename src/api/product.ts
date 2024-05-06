import createClient from 'openapi-fetch'
import type { paths as Paths } from '../api.gen'

const client = createClient<Paths>({
  baseUrl: `${import.meta.env.VITE_SERVER_BASE_URL}/v1/`,
})

export async function getList() {
  const { data, error } = await client.GET('/product')

  if (error) {
    throw new Error(error)
  }

  return data
}
