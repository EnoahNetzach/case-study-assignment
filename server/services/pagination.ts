import type { NextFunction, Request, Response } from 'express'

const DEFAULT_PAGE_LENGTH = 10
const MAX_PAGE_LENGTH = 100

export interface PaginationOpts {
  pageLength: number
  startIndex: number
}

export interface PaginationLocals {
  pagination: PaginationOpts
}

export function paginationMiddleware(
  req: Request<never, never, never, Partial<PaginationOpts>>,
  res: Response<never, PaginationLocals>,
  next: NextFunction,
) {
  const { pageLength, startIndex } = req.query

  res.locals.pagination = {
    pageLength: Math.min(Math.max(1, pageLength ?? DEFAULT_PAGE_LENGTH), MAX_PAGE_LENGTH),
    startIndex: Math.max(0, startIndex ?? 0),
  }

  next()
}
