import { FastifyReply, FastifyRequest } from "fastify"
import jwt from 'jsonwebtoken'
import { config } from "../config/config.ts"

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply, done: () => void) {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
        return reply.status(401).send({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, config.jwt_secret);
        (request as any).userId = (decoded as any).id;
    } catch (err) {
        return reply.status(401).send({ message: 'Unauthorized' });
    }

    done();
}

