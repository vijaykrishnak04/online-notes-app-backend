// src/use_cases/Login.ts

import { generateToken } from "../../utils/tokenUtils";
import { IUserRepository } from "../../repositories/UserRepository";
import { IUser } from "src/entities/User";

export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<{ username: string; email: string; userId: string; token: string; }> {
    const user = await this.userRepository.findByEmail(email);
    if (
      !user ||
      !this.userRepository.isValidPassword(password, user.password)
    ) {
      throw new Error("Invalid username or password.");
    }

    const token: string = generateToken(user);

    // Destructure the necessary fields from the user object and return them with the token
    const { username, email: userEmail, _id: userId } = user;
    return { username, email: userEmail, userId: userId.toString(), token };
  }
}
