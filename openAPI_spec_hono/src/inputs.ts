import { z } from "@hono/zod-openapi"
import { Hono } from 'hono'
import { swaggerUI } from '@hono/swagger-ui'
 

export const ParamsSchema = z.object({
  id: z.string().min(3).max(10).openapi({
    param: {
      name: "id",
      in: "path"
    },
    example: "123"
  })
})
