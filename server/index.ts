import express, { type NextFunction, type Request, type Response } from 'express'
import * as OpenApiValidator from 'express-openapi-validator'
import type { HttpError } from 'express-openapi-validator/dist/framework/types'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import getPort from 'get-port'
import { paginationMiddleware } from './services/pagination'
import cors from 'cors'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.text())
app.use(express.json())

app.use(paginationMiddleware)

app.use(
  OpenApiValidator.middleware({
    apiSpec: path.resolve(__dirname, 'api.yml'),
    formats: {
      'uuid.v4': {
        type: 'string',
        validate: (_value: string) => true,
      },
    },
    operationHandlers: path.resolve(__dirname, '.'),
    validateRequests: true,
    validateResponses: true,
  }),
)

app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  res
    .status(err.status || 500)
    .json({
      message: err.message,
      errors: err.errors,
    })
    .end()
})

const port = process.env.PORT || (await getPort({ port: 3000 }))

app.listen(port).on('listening', () => {
  console.log(`Server started on port ${port}`)
})
