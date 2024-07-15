import { FastifyReply, FastifyRequest } from "fastify"
import { AuthService } from "../services/authServices.ts"

const authService = new AuthService()

export class AuthController {
  async register(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { name, email, password } = request.body as { name: string, email: string, password: string };
    try {
        const token = await authService.register(name,email, password);
        reply.send({ token });
    } catch (error:any) {
        reply.status(400).send({ error: error.message });
    }
  }

  async login(request: FastifyRequest, reply:FastifyReply): Promise<void>{
    const { email, password } = request.body as { email: string , password: string}
    try {
        const token = await authService.login(email,password)
        reply.send({token})
    } catch(error: any){
        reply.status(400).send({error:error.message})
    }
  }
}