import { UserRepository } from "../repositories/userRepository.ts"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwt.ts"

const userRepository = new UserRepository()

export class AuthService {
  async register(
    name: string,
    email: string,
    password: string
  ): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: "USER",
      created_at: new Date(),
      updated_at: new Date(),
    })
    return generateToken(user.id)
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await userRepository.findByEmail(email)
    if (user && (await bcrypt.compare(password, user.password))) {
      return generateToken(user.id)
    }
    throw new Error("Invalid email or password")
  }
}
