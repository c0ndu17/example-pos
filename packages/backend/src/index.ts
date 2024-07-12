import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import cors from 'cors'
import log from 'loglevel'
import { WebSocketServer } from 'ws'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace'
import { ApolloServerPluginCacheControlDisabled } from '@apollo/server/plugin/disabled'
import { expressMiddleware } from '@apollo/server/express4'
import { useServer } from 'graphql-ws/lib/use/ws'
import morgan from 'morgan'
import { ApolloServer } from '@apollo/server'

dotenv.config()

import { getContext } from './context'
import schema from './schema'

log.setLevel('info')

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 4000

export interface ApolloContext {
  token?: string
  tracing?: boolean
}

export async function setupServer() {
  // Required logic for integrating with Express
  const app = express()
  app.use(morgan('tiny'))

  const httpServer = http.createServer(app)
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  })

  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer<ApolloContext>({
    // For below see: https://www.apollographql.com/docs/apollo-server/data/errors
    status400ForVariableCoercionErrors: true,
    schema,
    introspection: true,
    plugins: [
      ApolloServerPluginInlineTrace(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginCacheControlDisabled(),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors<cors.CorsRequest>({
      origin: ['http://localhost:3000', 'http://localhost:4000'],
      credentials: true,
    }),
    express.json({ limit: '1mb' }),
    expressMiddleware(server, {
      context: getContext,
    }),
  )

  await new Promise<void>((resolve) =>
    httpServer.listen({ host, port }, resolve),
  )

  log.info(`🚀 Server ready at http://${host}:${port}/`)
}
