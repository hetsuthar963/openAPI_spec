import { z } from "@hono/zod-openapi"
import { ParamsSchema } from "./inputs"
import { UserSchema } from "./outputs"
import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from "@hono/swagger-ui"
import { DefaultService } from "./generated"

const response = await DefaultService.getUsers("1");

const app = new OpenAPIHono()

const getUserRoute = createRoute({

  method: 'get',
  path: '/user/{id}',

  request: {
    params: ParamsSchema
  },

  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserSchema
        }
      },
      description: 'Retrieve the user',
    }
  }
})
// the inputs from the user on the route


// outputs for the user

app.openapi(getUserRoute, (c) => {
  const { id } = c.req.valid("param");
  return c.json({
    id,
    age: 20,
    name: 'Ultra-man',
  })
})

// The OpenAPI documentation will be available at /doc
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My API',
  },
})

// Use the middleware to serve Swagger UI at /ui
app.get('/ui', swaggerUI({ url: '/doc' }))

export default app
