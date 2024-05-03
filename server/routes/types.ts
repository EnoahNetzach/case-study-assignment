import type { PaginationOpts } from '../services/pagination'
import type { Request, Response } from 'express'

interface RequestBodyPath {
  requestBody: {
    content: {
      'application/json': unknown
    }
  }
}

interface QueryPath {
  parameters: {
    query?: unknown
  }
}

interface ParamsPath {
  parameters: {
    path: unknown
  }
}

interface ResBodyPath {
  responses: {
    '200': {
      content: {
        'application/json': unknown
      }
    }
  }
}

interface PaginationLocals {
  pagination: PaginationOpts
}

export type OpenapiReq<Path> = Request<
  Path extends ParamsPath ? Path['parameters']['path'] : never,
  Path extends ResBodyPath ? Path['responses']['200']['content']['application/json'] : never,
  Path extends RequestBodyPath ? Path['requestBody']['content']['application/json'] : never,
  Path extends QueryPath ? Path['parameters']['query'] : never
>

export type OpenapiRes<Path> = Response<
  Path extends ResBodyPath ? Path['responses']['200']['content']['application/json'] : never,
  Path extends QueryPath
    ? Path['parameters']['query'] extends Partial<PaginationOpts> | undefined
      ? PaginationLocals
      : never
    : never
>

export type OpenapiHandler<Path> = (req: OpenapiReq<Path>, res: OpenapiRes<Path>) => void
