import { FastifyInstance } from "fastify"
import { AuthController } from "../controllers/authControllers.ts"

const authController = new AuthController()

export default async function authRoutes(fastify: FastifyInstance): Promise<void> {
    fastify.post('/register', authController.register)
    fastify.post('/login', authController.login)
}