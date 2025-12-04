import { StatusCodes } from "http-status-codes";
import { AppError, ErrorCode } from "../../shared/error.types";
import { UserService } from "../user";
import argon2 from "argon2";

export class AuthService {

  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async login(body: { email: string; password: string }) {
    const { email, password } = body;

    const user = await this.userService.findByEmail(email);

    if (user && (await argon2.verify(user.password as string, password))) {
      return user;
    }

    throw new AppError(
      ErrorCode.NOT_FOUND,
      "Invalid credentials",
      StatusCodes.NOT_FOUND
    );
  }

  async register(body: { email: string; password: string; name: string }) {
    const { email, password, name } = body;

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new AppError(
        ErrorCode.CONFLICT,
        "User already exists",
        StatusCodes.CONFLICT
      );
    }

    const hashedPassword = await argon2.hash(password);
    
    await this.userService.createUser({
      email,
      password: hashedPassword,
      name,
    });
  }
}
