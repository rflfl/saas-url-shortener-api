
import { PrismaClient, User } from "@prisma/client"
const prisma = new PrismaClient()
export class UserRepository {
    async findByEmail (email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        return user
    }

    async create (user: Omit<User, 'id'>): Promise<User> {
        const userCreated = await prisma.user.create({
            data: user
        })
        return userCreated
    }
}
