import { TokenRepository } from "./token.repository";

export class TokenService {
  private tokenRepository: TokenRepository;

  constructor() {
    this.tokenRepository = new TokenRepository();
  }

  async storeToken(data: any) {
    return this.tokenRepository.store(
      data.token,
      data.userId,
      data.expiresAt
    )
  }
}
