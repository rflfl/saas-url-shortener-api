import fastify from "fastify"
import authRoutes from "../routes/authRoutes.ts"
const server = fastify()

const PORT = 3333

server.register(authRoutes, { prefix: "/auth" })

server.get("/", (require, reply) => {
  reply.send("Bem vindo")
})

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
