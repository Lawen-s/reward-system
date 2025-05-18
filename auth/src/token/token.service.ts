import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwsConfig, JwtConfig } from "common/config";
import * as jose from "jose";

@Injectable()
export class TokenService {
  private readonly issuer: string;
  private readonly audience: string;
  private readonly jws: JwsConfig;
  constructor(private readonly configService: ConfigService) {
    const { issuer, audience, jws } = this.configService.get<JwtConfig>("jwt");
    this.issuer = issuer;
    this.audience = audience;
    this.jws = jws;
  }

  async createAccessToken(id: string, role: string): Promise<string> {
    const key = Buffer.from(this.jws.key, "base64");
    return await new jose.SignJWT({ sub: id, role })
      .setProtectedHeader({ alg: this.jws.algorithm })
      .setIssuedAt()
      .setExpirationTime(this.jws.expiresIn)
      .setIssuer(this.issuer)
      .setAudience(this.audience)
      .sign(key);
  }
}
