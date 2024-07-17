import fastify from "fastify"
import apiRoutes from "../routes/apiRoutes.ts"

const server = fastify()

const PORT = 3333

server.register(apiRoutes, { prefix: "/api" })


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
