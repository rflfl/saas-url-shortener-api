import { FastifyInstance } from "fastify"
import { ShortenedLinkController } from "../controllers/shortenerLinkControllers.ts"
import { authMiddleware } from "../middlewares/authMiddleware.ts"

const shortenedLinkController = new ShortenedLinkController()

export default async function shortenedLinkRoutes(fastify: FastifyInstance): Promise<void> {

    fastify.addHook('preValidation',authMiddleware)

    fastify.get('/', shortenedLinkController.getAllLinks)
    fastify.post('/shorten', shortenedLinkController.createShortenedLink)
    fastify.get('/:shortenedCode', shortenedLinkController.getOriginalUrl)
}