import { PrismaClient, ShortenedLink } from "@prisma/client"

const prisma = new PrismaClient()

export class ShortenedLinkRepository {
  async findAll(userId: string): Promise<ShortenedLink[]> {
    const shortenedLinks = await prisma.shortenedLink.findMany({
        where: {
            user_id: userId
        }
    })
    return shortenedLinks
  }
  async findByCode(code: string): Promise<ShortenedLink | null> {
    const shortenedLink = await prisma.shortenedLink.findUnique({
      where: {
        shortened_code: code,
      },
    })
    return shortenedLink
  }
  async create(
    shortenedLink: Omit<ShortenedLink, "id">
  ): Promise<ShortenedLink> {
    const shortenedLinkCreated = await prisma.shortenedLink.create({
      data: shortenedLink,
    })
    return shortenedLinkCreated
  }
}
