import { ShortenedLink } from "@prisma/client"
import { ShortenedLinkRepository } from "../repositories/shortenedLinkRepository.ts"
import { nanoid } from "nanoid"
const shortenedLinkRepository = new ShortenedLinkRepository()

export class ShortenedLinkService {
  async create(originalUrl: string, userId: string): Promise<string> {
    const shortenedCode = nanoid(6)
    const shortenedLink = await shortenedLinkRepository.create({
        original_url: originalUrl,
        shortened_code: shortenedCode,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: userId,
    })
    return shortenedLink.shortened_code
  }
  async getOriginalUrl(shortenedCode: string): Promise<string | null> {
    const shortenedLink = await shortenedLinkRepository.findByCode(shortenedCode)
    return shortenedLink?.original_url || null
  }
  async getAllLinks(userId: string): Promise<ShortenedLink[]> {
    return shortenedLinkRepository.findAll(userId)
  }
}