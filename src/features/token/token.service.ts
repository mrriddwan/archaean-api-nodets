import { TokenRepository } from "./token.repository";

export class TokenService {
  private tokenRepository: TokenRepository;

  constructor() {
    this.tokenRepository = new TokenRepository();
  }

  async storeToken(data: {
    token: string;
    userId: string;
    expiresAt: Date;
    type?: "access" | "refresh";
  }) {
    return this.tokenRepository.store(
      data.token,
      data.userId,
      data.expiresAt,
      data.type || "access"
    );
  }

  async deleteToken(userId: string) {
    return this.tokenRepository.delete(userId);
  }
}
