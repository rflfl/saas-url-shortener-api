import { FastifyInstance } from "fastify"
import authRoutes from "../routes/authRoutes.ts"
import shortenedLinkRoutes from "../routes/shortenedLinkRoutes.ts"

export default async function (fastify: FastifyInstance) {
  fastify.register(authRoutes, { prefix: "/auth" })
  fastify.register(shortenedLinkRoutes, { prefix: "/links" })
}