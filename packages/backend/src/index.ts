import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import cors from 'cors'
import log from 'loglevel'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace'
import { ApolloServerPluginCacheControlDisabled } from '@apollo/server/plugin/disabled'
import { expressMiddleware } from '@apollo/server/express4'
import morgan from 'morgan'
import { ApolloServer } from '@apollo/server'

dotenv.config()

import { Context, getContext } from './context'
import models from './models'

log.setLevel('info')

// Defaults to backend, so you don't need env vars, and I don't need to generate them.
const host = process.env.HOST || 'backend'
const port = process.env.PORT || 4000

export async function main() {
  const app = express()
  app.use(morgan('tiny'))

  const httpServer = http.createServer(app)

  const schema = models.toSchema()

  const server = new ApolloServer<Context>({
    // For below see: https://www.apollographql.com/docs/apollo-server/data/errors
    status400ForVariableCoercionErrors: true,
    schema,
    introspection: true,
    plugins: [
      ApolloServerPluginInlineTrace(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginCacheControlDisabled(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  })

  await server.start()

  app.use(
    '/',
    cors<cors.CorsRequest>({
      origin: true,
      // Commented out below because working out the docker compose network is a pain, it could be any of local subnets, potentially more.
      // [
      // `http://{host}:{port}`,
      // 'http://localhost:3000',
      // 'http://localhost:4000',
      // ],
    }),
    express.json({ limit: '1mb' }),
    expressMiddleware(server, {
      context: getContext,
    }),
  )

  await new Promise<void>((resolve) =>
    httpServer.listen({ host, port }, resolve),
  )

  log.info(
    `🚀 Server ready at http://${host}:${port}/ | This is NOT the url you're looking for. This is the GraphQL server.`,
  )
}

await main()
