import { StatusCodes } from "http-status-codes";
import { AppError, ErrorCode } from "../../shared/error.types";
import { UserService } from "../user";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { User } from "generated/prisma/client";
import { TokenService } from "../token/token.service";

export class AuthService {
  private userService: UserService;
  private tokenService: TokenService;

  constructor() {
    this.userService = new UserService();
    this.tokenService = new TokenService();
  }

  async login(body: { email: string; password: string }): Promise<any> {
    const { email, password } = body;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new AppError(
        ErrorCode.NOT_FOUND,
        "User not found",
        StatusCodes.NOT_FOUND
      );
    }

    const passwordIsValid = await argon2.verify(
      user.password as string,
      password
    );

    if (user && passwordIsValid) {
      //create access token for user
      const tokenData = this.initializeToken(user);
      return tokenData;
    }

    throw new AppError(
      ErrorCode.NOT_FOUND,
      "Invalid credentials",
      StatusCodes.UNAUTHORIZED
    );
  }

  async register(body: {
    email: string;
    password: string;
    name: string;
  }): Promise<void> {
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

  async initializeToken(user: User): Promise<any> {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new AppError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        "JWT secret not configured",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: "user", //TODO: since many to many, need to be pass by FE
      },
      secret,
      { expiresIn: "1h" }
    );

    await this.tokenService.storeToken({
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
    });

    return {
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
      userId: user.id
    };
  }
}
