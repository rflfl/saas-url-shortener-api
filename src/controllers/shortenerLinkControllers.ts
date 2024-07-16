import { FastifyReply, FastifyRequest } from "fastify"
import { ShortenedLinkService } from "../services/shortenedLinkService.ts"

const shortenedLinkService = new ShortenedLinkService()

export class ShortenedLinkController {
  async createShortenedLink(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const { originalUrl, userId } = request.body as {
      originalUrl: string
      userId: string
    }
    const shortenedCode = await shortenedLinkService.create(originalUrl, userId)
    reply.send({ shortenedCode })
  }

  async getOriginalUrl(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const { shortenedCode } = request.params as { shortenedCode: string }
    const originalUrl = await shortenedLinkService.getOriginalUrl(shortenedCode)
    if (originalUrl) {
      reply.redirect(originalUrl)
    } else {
      reply.status(404).send({ error: "Shortened link not found" })
    }
  }

  async getAllLinks(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.params as { userId: string }
    const links = await shortenedLinkService.getAllLinks(userId.userId)
    if (!links) {
      throw new Error("Links not found")
    }
    reply.send({ links })
  }
}
