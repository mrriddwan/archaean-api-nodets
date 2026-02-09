import { StatusCodes } from "http-status-codes";
import { AppError, ErrorCode } from "../../shared/error.types";
import { UserService } from "../user";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { User } from "generated/prisma/client";
import { TokenService } from "../token/token.service";
import crypto from "crypto";

interface OAuthCode {
  userId: string;
  expiresAt: Date;
}

export class AuthService {
  private userService: UserService;
  private tokenService: TokenService;
  private oauthCodes: Map<string, OAuthCode> = new Map();

  constructor() {
    this.userService = new UserService();
    this.tokenService = new TokenService();
    // cleanup expired codes every 5 minutes
    setInterval(() => this.cleanupExpiredCodes(), 5 * 60 * 1000);
  }

  async login(body: { email: string; password: string }): Promise<any> {
    const { email, password } = body;

    const user = await this.userService.findByEmailWithPassword(email);

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
      const tokenData = await this.initializeToken(user);
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

  async initializeToken(user: Pick<User, "id">): Promise<any> {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new AppError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        "JWT secret not configured",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    // access token - 1 hour
    const accessToken = jwt.sign(
      {
        userId: user.id,
        role: "user", //TODO: since many to many, need to be pass by FE
        type: "access",
      },
      secret,
      { expiresIn: "1h" }
    );

    const accessTokenExpiresAt = new Date(Date.now() + 1000 * 60 * 60);

    await this.tokenService.storeToken({
      token: accessToken,
      userId: user.id,
      expiresAt: accessTokenExpiresAt,
      type: "access",
    });

    // refresh token - 7 days
    const refreshToken = jwt.sign(
      {
        userId: user.id,
        type: "refresh",
      },
      secret,
      { expiresIn: "7d" }
    );

    const refreshTokenExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    await this.tokenService.storeToken({
      token: refreshToken,
      userId: user.id,
      expiresAt: refreshTokenExpiresAt,
      type: "refresh",
    });

    return {
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
      userId: user.id,
    };
  }

  async generateOAuthCode(userId: string): Promise<string> {
    const code = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    this.oauthCodes.set(code, {
      userId,
      expiresAt,
    });

    return code;
  }

  async exchangeOAuthCode(code: string): Promise<any> {
    const oauthCode = this.oauthCodes.get(code);

    if (!oauthCode) {
      throw new AppError(
        ErrorCode.UNAUTHORIZED,
        "Invalid or expired OAuth code",
        StatusCodes.UNAUTHORIZED
      );
    }

    if (new Date() > oauthCode.expiresAt) {
      this.oauthCodes.delete(code);
      throw new AppError(
        ErrorCode.UNAUTHORIZED,
        "OAuth code has expired",
        StatusCodes.UNAUTHORIZED
      );
    }

    const user = await this.userService.getUserById(oauthCode.userId);

    if (!user) {
      this.oauthCodes.delete(code);
      throw new AppError(
        ErrorCode.NOT_FOUND,
        "User not found",
        StatusCodes.NOT_FOUND
      );
    }

    // invalidate the code
    this.oauthCodes.delete(code);

    // generate tokens
    const tokenData = await this.initializeToken(user);

    return {
      accessToken: tokenData.accessToken,
      refreshToken: tokenData.refreshToken,
      expiresIn: 3600, // 1 hour in seconds
      userId: user.id,
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<any> {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new AppError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        "JWT secret not configured",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    try {
      const decoded = jwt.verify(refreshToken, secret) as any;

      if (decoded.type !== "refresh") {
        throw new AppError(
          ErrorCode.UNAUTHORIZED,
          "Invalid token type",
          StatusCodes.UNAUTHORIZED
        );
      }

      const user = await this.userService.getUserById(decoded.userId);

      if (!user) {
        throw new AppError(
          ErrorCode.NOT_FOUND,
          "User not found",
          StatusCodes.NOT_FOUND
        );
      }

      // verify token exists in database
      const { prisma } = await import("../../lib/prisma");
      const tokenRecord = await prisma.token.findUnique({
        where: { token: refreshToken },
      });

      if (!tokenRecord || tokenRecord.type !== "refresh") {
        throw new AppError(
          ErrorCode.UNAUTHORIZED,
          "Invalid refresh token",
          StatusCodes.UNAUTHORIZED
        );
      }

      if (new Date() > tokenRecord.expiresAt) {
        throw new AppError(
          ErrorCode.UNAUTHORIZED,
          "Refresh token expired",
          StatusCodes.UNAUTHORIZED
        );
      }

      // generate new access token
      const accessToken = jwt.sign(
        {
          userId: user.id,
          role: "user",
          type: "access",
        },
        secret,
        { expiresIn: "1h" }
      );

      const accessTokenExpiresAt = new Date(Date.now() + 1000 * 60 * 60);

      await this.tokenService.storeToken({
        token: accessToken,
        userId: user.id,
        expiresAt: accessTokenExpiresAt,
        type: "access",
      });

      return {
        accessToken,
        expiresIn: 3600,
        userId: user.id,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        ErrorCode.UNAUTHORIZED,
        "Invalid refresh token",
        StatusCodes.UNAUTHORIZED
      );
    }
  }

  private cleanupExpiredCodes(): void {
    const now = new Date();
    for (const [code, data] of this.oauthCodes.entries()) {
      if (now > data.expiresAt) {
        this.oauthCodes.delete(code);
      }
    }
  }
}
